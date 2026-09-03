import { describe, expect, it, vi } from 'vitest'
import { DeleteMovie } from '../../src/controlers/movieController';
import { collections } from '../../src/services/databaseService';

describe('Testes do controller de deletar filmes', () => {
    it('testa remoção de filme feita com sucesso', async () => {
        const req = {
            body: {
               movieId: 1
            }
        } as any

        const res = {
            status: vi.fn().mockReturnThis(),
            send: vi.fn()
        } as any

        const deleteOneMock = vi.fn().mockReturnValue({})

        collections.movies = {
            deleteOne: deleteOneMock
        } as any

        await DeleteMovie(req, res)

        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.send).toHaveBeenCalledWith({ message: 'Filme deletado' })
    })
})