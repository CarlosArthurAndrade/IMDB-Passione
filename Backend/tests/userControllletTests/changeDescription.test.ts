import { describe, expect, it, vi } from 'vitest'
import { collections } from '../../src/services/databaseService.js';
import { ChangeDescription } from '../../src/controlers/userController.js';

describe('Testa o controller ChangeDescription', () => {
     it('testa alterar a descrição de um usuário com sucesso', async () => { 
        const req = {
            body: {
                description: 'new_description'
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

        await ChangeDescription(req, res)

        expect(res.status).toHaveBeenCalledWith(200)
     })
})