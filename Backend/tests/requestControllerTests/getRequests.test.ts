import { describe, expect, it, vi } from 'vitest'
import { collections } from '../../src/services/databaseService.js';
import { GetRequests } from '../../src/controlers/request.Controller.js';

describe('Testa o controller GetRequests', () => {
    it('Testa pegar todos os requests com sucesso', async () => {
        const mockData = {
            userId: '507f1f77bcf86cd799439011',
            title: 'Carros',
            description: 'Irado',
            releaseYear: 2006
        }

        const toArrayMock = vi.fn().mockResolvedValue(mockData);

        const findMock = vi.fn().mockReturnValue({
            toArray: toArrayMock
        });

        const req = {} as any;
        
        const res = {
        status: vi.fn().mockReturnThis(),
        send: vi.fn()
        } as any;

        collections.requests = {
            find: findMock
        } as any

        await GetRequests(req, res)

        expect(res.status).toHaveBeenCalledWith(200)
    })
})