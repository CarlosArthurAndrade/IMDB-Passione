import { describe, expect, it, vi } from 'vitest'
import { DeleteMovie } from '../../src/controlers/movieController.js';
import { collections } from '../../src/services/databaseService.js';
import { DeleteUser } from '../../src/controlers/userController.js';

describe('Testes do controller DeleteUser', () => {
    it('testa remoção de um suário feita com sucesso', async () => {
        const req = {
            body: {
               userId: '507f1f77bcf86cd799439011'
            }
        } as any

        const res = {
            status: vi.fn().mockReturnThis(),
            send: vi.fn()
        } as any

        const deleteOneMock = vi.fn().mockReturnValue({})

        collections.users = {
            deleteOne: deleteOneMock
        } as any

        await DeleteUser(req, res)

        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.send).toHaveBeenCalledWith({ message: 'usuário deletado com sucesso' })
    })
})