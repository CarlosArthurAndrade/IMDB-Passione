import { describe, expect, it, vi } from 'vitest'
import { collections } from '../../src/services/databaseService.js';
import { ChangeUsername } from '../../src/controlers/userController.js';

describe('Testa o controller ChangeUsername', () => {
     it('testa alterar o username de um usuário com sucesso', async () => { 
        const req = {
            body: {
                username: 'new_username'
            },
            user: '507f1f77bcf86cd799439011'
        } as any;
        
        const res = {
        status: vi.fn().mockReturnThis(),
        send: vi.fn()
        } as any;

        collections.users = {
            updateOne: vi.fn()
        } as any

        await ChangeUsername(req, res)

        expect(res.status).toHaveBeenCalledWith(200)
     })
})