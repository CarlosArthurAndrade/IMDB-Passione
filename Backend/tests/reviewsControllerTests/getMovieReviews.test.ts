import { describe, expect, it, vi } from 'vitest'
import { collections } from '../../src/services/databaseService.js';
import { GetMovieReviews } from '../../src/controlers/reviewController.js';

describe('Testa o controller GetMovieReviews', () => {
     it('testa pegar todas as reviews de um filme', async () => { 
        const mockData = [
            {
                movieId: '507f1f77bcf86cd799439011',
                userId: '507f1f77bcf86cd799439011',
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
                movieId: '507f1f77bcf86cd799439011'
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