import { describe, expect, it, vi } from 'vitest'
import { collections } from '../../src/services/databaseService.js';
import { GetAllUsers } from '../../src/controlers/userController.js';

describe('Testa o controller GetAllUsers', () => {
     it('testa pegar todos os usuários', async () => { 
        const req = {} as any;
        
        const res = {
        status: vi.fn().mockReturnThis(),
        send: vi.fn()
        } as any;

        const toArrayMock = vi.fn().mockResolvedValue([]);

        const findMock = vi.fn().mockReturnValue({
            toArray: toArrayMock
        });

        collections.users = {
            find: findMock
        } as any

        await GetAllUsers(req, res)

        expect(res.status).toHaveBeenCalledWith(200)
     })
})