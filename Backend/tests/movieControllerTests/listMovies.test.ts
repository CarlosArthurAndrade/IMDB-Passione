import { describe, expect, it, vi } from 'vitest'
import { ListMovies } from '../../src/controlers/movieController';
import { collections } from '../../src/services/databaseService';

describe('Testa o controller ListMovies filmes', () => {
    it('testa listar todos os filmes', async () => {
        const mockData = [
            {
                title: 'string',
                posterHorizontal: 'string',
                posterVertical: 'string',
                overview: 'string',
                releseDate: 'string',
                tags: [{ name: 'tag' }]
            }
        ]

        const toArrayMock = vi.fn().mockResolvedValue(mockData);

        const findMock = vi.fn().mockReturnValue({
            toArray: toArrayMock
        });

        const req = {} as any;
        
        const res = {
        status: vi.fn().mockReturnThis(),
        send: vi.fn()
        } as any;

        collections.movies = {
            find: findMock
        } as any

        await ListMovies(req, res)

        expect(findMock).toHaveBeenCalled();
        expect(toArrayMock).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(mockData);
    })

    it('testa retorno de sucesso mesmo com lista de filmes vazia', async () => {
        const mockData: any = []

        const toArrayMock = vi.fn().mockResolvedValue(mockData);

        const findMock = vi.fn().mockReturnValue({
            toArray: toArrayMock
        });

        const req = {} as any; // Add headers/params here if your controller reads them
        
        const res = {
        status: vi.fn().mockReturnThis(), // Allows chaining: res.status().json()
        send: vi.fn()
        } as any;

        collections.movies = {
            find: findMock
        } as any

        await ListMovies(req, res)

        expect(findMock).toHaveBeenCalled();
        expect(toArrayMock).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(mockData);
    })

    it('Retorna erro 500 caso ocorra um erro ao buscar os filmes', async () => {
        const errorMock = new Error('Erro no banco')

        const req = {} as any

        const res = {
            status: vi.fn().mockReturnThis(),
            send: vi.fn()
        } as any

        const toArrayMock = vi.fn().mockRejectedValue(errorMock)

        const findMock = vi.fn().mockReturnValue({
            toArray: toArrayMock
        })

        collections.movies = {
            find: findMock
        } as any

        await ListMovies(req, res)

        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.send).toHaveBeenCalledWith(errorMock)
    })
})