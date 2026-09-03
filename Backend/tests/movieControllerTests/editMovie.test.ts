import { describe, expect, it, vi } from 'vitest'
import { EditMovie } from '../../src/controlers/movieController';
import { collections } from '../../src/services/databaseService';

describe('Testes do controller de editar filmes', () => {
    it('testa edição de filme feita com sucesso', async () => {
        const req = {
            body: {
                title: 'teste',
                overview: 'teste',
                posterHorizontal: 'teste',
                posterVertical: 'teste',
                genres: [{ name: 'teste' }],
                releaseDate: 'teste',
                rating: 0
            }
        } as any

        const res = {
            status: vi.fn().mockReturnThis(),
            send: vi.fn()
        } as any

        const editOneMock = vi.fn().mockReturnValue({})

        collections.movies = {
            updateOne: editOneMock
        } as any

        await EditMovie(req, res)

        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.send).toHaveBeenCalledWith({ message: 'Filme modificado' })
    })
})