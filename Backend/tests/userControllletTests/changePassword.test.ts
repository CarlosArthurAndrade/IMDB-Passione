import { describe, expect, it, vi } from 'vitest'
import { collections } from '../../src/services/databaseService.js';
import { ChangePassword } from '../../src/controlers/userController.js';

vi.mock('bcrypt', () => ({
  default: {
    hash: vi.fn().mockResolvedValue('mocked_hashed_password'),
  },
}));

describe('Testa o controller ChangePassword', () => {
     it('testa alterar a senha de um usuário com sucesso', async () => { 
        const req = {
            body: {
                password: 'new_password'
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

        await ChangePassword(req, res)

        expect(res.status).toHaveBeenCalledWith(200)
     })
})