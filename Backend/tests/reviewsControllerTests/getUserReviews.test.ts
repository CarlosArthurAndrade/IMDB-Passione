import { describe, expect, it, vi } from 'vitest'
import { collections } from '../../src/services/databaseService';
import { GetUserReviews } from '../../src/controlers/reviewController';

describe('Testa o controller GetUserReviews filmes', () => {
     it('testa pegar as reviews de um usuário', async () => { 
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
            user: 1
        } as any;
        
        const res = {
        status: vi.fn().mockReturnThis(),
        send: vi.fn()
        } as any;

        collections.reviews = {
            find: findMock
        } as any

        await GetUserReviews(req, res)

        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.send).toHaveBeenCalledWith(mockData);
     })
})