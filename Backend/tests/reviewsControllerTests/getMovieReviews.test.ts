import { describe, expect, it, vi } from 'vitest'
import { collections } from '../../src/services/databaseService';
import { GetMovieReviews } from '../../src/controlers/reviewController';

describe('Testa o controller GetMovieReviews filmes', () => {
     it('testa pegar todas as reviews de um filme', async () => { 
        const mockData = [
            {
                movieId: 1,
                userId: 1,
                title: 'titulo',
                text: 'texto',
                rating: 4.5,
                likes: 2
            }
        ]

        const toArrayMock = vi.fn().mockResolvedValue(mockData);

        const findMock = vi.fn().mockReturnValue({
            toArray: toArrayMock
        });

        const req = {
            body: {
                movieId: 1
            }
        } as any;
        
        const res = {
        status: vi.fn().mockReturnThis(),
        send: vi.fn()
        } as any;

        collections.reviews = {
            find: findMock
        } as any

        await GetMovieReviews(req, res)

        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.send).toHaveBeenCalledWith(mockData);
     })
})