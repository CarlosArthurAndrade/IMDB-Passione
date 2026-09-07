import { describe, expect, it, vi } from 'vitest'
import { DeleteReview } from '../../src/controlers/reviewController.js';
import { collections } from '../../src/services/databaseService.js';

describe('Testa o controller DeleteReview', () => {
     it('testa pegar todas remover uma review', async () => { 
        const req = {
            body: {
                reviewId: '507f1f77bcf86cd799439011',
            }
        } as any;
        
        const res = {
        status: vi.fn().mockReturnThis(),
        send: vi.fn()
        } as any;

        collections.reviews = {
            deleteOne: vi.fn()
        } as any

        await DeleteReview(req, res)

        expect(res.status).toHaveBeenCalledWith(200)
     })
})