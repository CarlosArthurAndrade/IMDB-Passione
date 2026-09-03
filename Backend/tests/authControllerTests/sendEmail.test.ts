import { beforeEach, describe, expect, it, vi } from "vitest";
import { SendResetEmail } from "../../src/controlers/authController";
import { collections } from "../../src/services/databaseService";

vi.mock("crypto", () => ({
    default: {
    randomBytes: vi.fn((size: number) => {
      return Buffer.from(Array.from({ length: size }, (_, i) => i));
    }),

    createHash: vi.fn(() => {
      return {
        update: vi.fn().mockReturnThis(),
        digest: vi.fn(() => "d41d8cd98f00b204e9800998ecf8427e"),
      };
    }),
  }
}));


vi.mock('nodemailer', () => ({
    default: {
        createTransport: vi.fn().mockReturnValue({
            sendMail: vi.fn()
        }),
    }
}))

describe('Teste do envio do link de reset de senha', () => {
    beforeEach(() => {
        vi.stubEnv('process.env.EMAIL', 'email');
        vi.stubEnv('process.env.EMAIL_PASSWORD', 'senha')
    });

    it('testa envio com sucesso', async () => {
        const req = {
            body: {
                email: 'email@email.com'
            }
        } as any

        const res = {
            status: vi.fn().mockReturnThis(),
            send: vi.fn()
        } as any

        const findOneMock = vi.fn().mockReturnValue({
            _id: 1
        })

        const insertOneMock = vi.fn().mockReturnValue({})

        collections.users = {
            findOne: findOneMock
        } as any

        collections.tokens = {
            insertOne: insertOneMock
        } as any

        await SendResetEmail(req, res)

        expect(res.status).toHaveBeenCalledWith(200)
    })
})