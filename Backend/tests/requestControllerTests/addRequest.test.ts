import { describe, expect, it, vi } from 'vitest'
import { collections } from '../../src/services/databaseService.js';
import { AddRequest } from '../../src/controlers/request.Controller.js';

vi.mock('nodemailer', () => ({
    default: {
        createTransport: vi.fn().mockReturnValue({
            sendMail: vi.fn()
        }),
    }
}))

describe('Testa o controller AddRequest', () => {
    it('Testa adicionar um request com sucesso', async () => {
        const req = {
            body: {
                title: 'Carros',
                description: 'irado',
                releaseYear: 2006
            },
            user: '507f1f77bcf86cd799439011',
        } as any;
        
        const res = {
        status: vi.fn().mockReturnThis(),
        send: vi.fn()
        } as any;

        collections.requests = {
            insertOne: vi.fn().mockResolvedValue({})
        } as any

        collections.users = {
            findOne: vi.fn().mockResolvedValue({ email: 'Email@email.com' })
        } as any

        await AddRequest(req, res)

        expect(res.status).toHaveBeenCalledWith(200)
    })
})