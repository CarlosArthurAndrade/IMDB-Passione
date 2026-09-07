import { describe, expect, it, vi } from 'vitest'
import { collections } from '../../src/services/databaseService.js';
import { AddReview } from '../../src/controlers/reviewController.js';

describe('Testa o controller AddReview', () => {
     it('testa pegar todas adicionar uma review', async () => { 
        const req = {
            body: {
                userId: '507f1f77bcf86cd799439011',
                title: 'titulo',
                text: 'texto',
                rating: 4.5,
                likes: 2
            }
        } as any;
        
        const res = {
        status: vi.fn().mockReturnThis(),
        send: vi.fn()
        } as any;

        collections.reviews = {
            insertOne: vi.fn()
        } as any

        await AddReview(req, res)

        expect(res.status).toHaveBeenCalledWith(200)
     })
})