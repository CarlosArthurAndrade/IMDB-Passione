import { describe, expect, it, vi } from 'vitest'
import { collections } from '../../src/services/databaseService';
import { EditRequest } from '../../src/controlers/request.Controller';

describe('Testa o controller EditRequest', () => {
    it('Testa editar um request com sucesso', async () => {
        const req = {
            body: {
                title: 'Carros',
                description: 'irado',
                releaseYear: 2006
            },
            user: 1,
        } as any;
        
        const res = {
        status: vi.fn().mockReturnThis(),
        send: vi.fn()
        } as any;

        collections.requests = {
            updateOne: vi.fn().mockResolvedValue({})
        } as any

        await EditRequest(req, res)

        expect(res.status).toHaveBeenCalledWith(200)
    })
})