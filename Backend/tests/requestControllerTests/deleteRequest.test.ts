import { describe, expect, it, vi } from 'vitest'
import { collections } from '../../src/services/databaseService.js';
import { DeleteRequest } from '../../src/controlers/request.Controller.js';

vi.mock('nodemailer', () => ({
    default: {
        createTransport: vi.fn().mockReturnValue({
            sendMail: vi.fn()
        }),
    }
}))


vi.mock('../../src/utils/sendEmail', () => ({
    DeleteRequesttEmail: vi.fn()
}))

describe('Testa o controller DeleteRequest', () => {
    it('Testa deletar um request com sucesso', async () => {
        const req = {
            body: {
                id: '507f1f77bcf86cd799439011'
            },
        } as any;
        
        const res = {
        status: vi.fn().mockReturnThis(),
        send: vi.fn()
        } as any;

        collections.requests = {
            findOne: vi.fn().mockResolvedValue({ userId: '507f1f77bcf86cd799439011' }),
            deleteOne: vi.fn().mockResolvedValue({})
        } as any

        collections.users = {
            findOne: vi.fn().mockResolvedValue({ email: 'Email@email.com' })
        } as any

        await DeleteRequest(req, res)

        expect(res.status).toHaveBeenCalledWith(200)
    })
})