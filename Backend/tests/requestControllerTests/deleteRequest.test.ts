import { describe, expect, it, vi } from 'vitest'
import { collections } from '../../src/services/databaseService';
import { DeleteRequest } from '../../src/controlers/request.Controller';

describe('Testa o controller DeleteRequest', () => {
    it('Testa deletar um request com sucesso', async () => {
        const req = {
            body: {
                id: 1
            },
        } as any;
        
        const res = {
        status: vi.fn().mockReturnThis(),
        send: vi.fn()
        } as any;

        collections.requests = {
            deleteOne: vi.fn().mockResolvedValue({})
        } as any

        await DeleteRequest(req, res)

        expect(res.status).toHaveBeenCalledWith(200)
    })
})