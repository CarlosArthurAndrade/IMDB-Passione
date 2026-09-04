import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Login } from '../../src/controlers/authController.js';
import { collections } from '../../src/services/databaseService.js';
import jwt from 'jsonwebtoken';

vi.mock('bcrypt', () => ({
  default: {
    hash: vi.fn().mockResolvedValue('mocked_hashed_password'),
    compare: vi.fn().mockImplementation((password, hashedPassword) => {
      if (password === 'correct_password' && hashedPassword === 'mocked_hashed_password') {
        return Promise.resolve(true);
      }
      return Promise.resolve(false);
    }),
  },
}));

vi.mock('jsonwebtoken', () => ({
  default: {
    sign: vi.fn().mockReturnValue('mocked_jwt_token'),
    verify: vi.fn().mockImplementation((token) => {
      if (token === 'mocked_jwt_token') {
        return { userId: '123', email: 'test@example.com' };
      }
      throw new Error('jwt expired');
    }),
  },
}));

const jwtSignMock = vi.mocked(jwt.sign);

describe('Testes da função de login', () => {
    beforeEach(() => {
        vi.stubEnv('CHAVE_SECRETA_JWT', 'Chave secreta');
    });

    afterEach(() => {
        vi.unstubAllEnvs();
    });
    it('testa login efetuado corretamente', async () => {
        const req = {
            body: {
                email: 'email',
                password: 'correct_password'
            }
        } as any

        const res = {
            status: vi.fn().mockReturnThis(),
            send: vi.fn()
        } as any

        const findOneMock = vi.fn().mockReturnValue({
            _id: 9954,
            password: 'mocked_hashed_password'
        })

        collections.users = {
            findOne: findOneMock
        } as any

        await Login(req, res)

        expect(res.status).toHaveBeenCalledWith(200)
        expect(jwtSignMock).toHaveBeenCalledWith(
            { id: 9954 },
            process.env.CHAVE_SECRETA_JWT || 'Chave Secreta',
            { expiresIn: '3h' }
        );
    })

    it('testa login mal efetuado', async () => {
        const req = {
            body: {
                email: 'email',
                password: 'wrong_password'
            }
        } as any

        const res = {
            status: vi.fn().mockReturnThis(),
            send: vi.fn()
        } as any

        const findOneMock = vi.fn().mockReturnValue({
            _id: 9954,
            password: 'mocked_hashed_password'
        })

        collections.users = {
            findOne: findOneMock
        } as any

        await Login(req, res)

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.send).toHaveBeenCalledWith({ message: 'Email ou senha incorretos' })
    })

    it('testa caso dê erro em algum lugar do código', async () => {
        const error = new Error('Falha critica')

        const req = {
            body: {
                email: 'email',
                password: 'wrong_password'
            }
        } as any

        const res = {
            status: vi.fn().mockReturnThis(),
            send: vi.fn()
        } as any

        collections.users = {
            findOne: error
        } as any

        await Login(req, res)

        expect(res.status).toHaveBeenCalledWith(500)
    })
})