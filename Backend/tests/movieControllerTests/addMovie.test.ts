import { describe, expect, it, vi } from 'vitest'
import { AddMovie } from '../../src/controlers/movieController.js';
import { collections } from '../../src/services/databaseService.js';
import { getMovieDataById } from '../../../Frontend/imdb-passione/utils/tmdbRequests.js';

vi.mock('../../src/utils/tmdbRequests', () => ({
  getMovieId: vi.fn(),
  getMovieDataById: vi.fn(),
}));

describe('testes da função de add filme', () => {
    it('Testa em caso de sucesso ao adicionar filme', async () => {
        const mockMovieData = {
            genres: [{ name: '' }],
            overview: 'string',
            poster_path: 'string',
            release_date: '07/06/2002',
            title: 'string'
        }

        const req = {
            body: {
                title: 'Batman',
                poster: 'poster.jpg',
                year: 2020
            }
        } as any

        const res = {
            status: vi.fn().mockReturnThis(),
            send: vi.fn()
        } as any

        const insertOneMock = vi.fn().mockReturnValue({})

        collections.series = {
            insertOne: insertOneMock
        } as any
    })

    it('Retorna erro 500 caso ocorra um erro ao adicionar um filme', async () => {
        const errorMock = new Error('Erro no banco')
    
        const req = {
            body: {
                title: 'Batman',
                poster: 'poster.jpg',
                year: 2020
            }
        } as any

        const res = {
            status: vi.fn().mockReturnThis(),
            send: vi.fn()
        } as any
    
        const insertOneMock = vi.fn().mockRejectedValue(errorMock)

        collections.series = {
            insertOne: insertOneMock
        } as any

        await AddMovie(req, res)

        expect(res.status).toHaveBeenCalledWith(500)
    })
})