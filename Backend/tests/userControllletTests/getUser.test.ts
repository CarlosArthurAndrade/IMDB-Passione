import { describe, expect, it, vi } from 'vitest'
import { collections } from '../../src/services/databaseService.js';
import { GetUser } from '../../src/controlers/userController.js';

describe('Testa o controller GetUser', () => {
     it('testa pegar um usuário com sucesso', async () => { 
        const req = {
            user: '507f1f77bcf86cd799439011'
        } as any;
        
        const res = {
        status: vi.fn().mockReturnThis(),
        send: vi.fn()
        } as any;

        collections.users = {
            findOne: vi.fn()
        } as any

        await GetUser(req, res)

        expect(res.status).toHaveBeenCalledWith(200)
     })
})