import { describe, expect, it, vi } from 'vitest'
import { collections } from '../../src/services/databaseService.js';
import { ChangeImage } from '../../src/controlers/userController.js';

describe('Testa o controller ChangeImage', () => {
     it('testa alterar a imagem de um usuário com sucesso', async () => { 
        const req = {
            body: {
                image: 'new_image'
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

        await ChangeImage(req, res)

        expect(res.status).toHaveBeenCalledWith(200)
     })
})