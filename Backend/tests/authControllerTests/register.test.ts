import { describe, expect, it, vi } from 'vitest';
import { Register } from '../../src/controlers/authController.js';
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

describe('Testes da função register', () => {
    it('testa registro com sucesso', async () => {
        const req = {
            body: {
                username: 'MrPruu',
                email: 'Teste@email.com',
                password: 'New_Password'
            }
        } as any

        const res = {
            status: vi.fn().mockReturnThis(),
            send: vi.fn()
        } as any

        const findUserMock = vi.fn().mockReturnValue(null)
        const insertOneMock = vi.fn().mockResolvedValue({})

        collections.users = {
            findOne: findUserMock,
            insertOne: insertOneMock
        } as any

        await Register(req, res)

        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.send).toHaveBeenCalledWith({ message: "Usuário cadastrado com sucesso!" })
    })

    it('testa registro com email já cadastrado', async () => {
        const req = {
            body: {
                username: 'MrPruu',
                email: 'Teste@email.com',
                password: 'New_Password'
            }
        } as any

        const res = {
            status: vi.fn().mockReturnThis(),
            send: vi.fn()
        } as any

        const findUserMock = vi.fn().mockReturnValue({
            email: 'Teste@email.com'
        })

        collections.users = {
            findOne: findUserMock,
        } as any

        await Register(req, res)

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.send).toHaveBeenCalledWith({ message: 'Email já cadastrado'})
    })

    it('testa registro com username já cadastrado', async () => {
        const req = {
            body: {
                username: 'MrPruu',
                email: 'Teste@email.com',
                password: 'New_Password'
            }
        } as any

        const res = {
            status: vi.fn().mockReturnThis(),
            send: vi.fn()
        } as any

        const findUserMock = vi.fn().mockReturnValue({
            username: 'MrPruu'
        })

        collections.users = {
            findOne: findUserMock,
        } as any

        await Register(req, res)

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.send).toHaveBeenCalledWith({ message: 'Username já cadastrado'})
    })
    
    it('testa caso ocorra um erro no código', async () => {
        const error = new Error('Deu ruim')

        const req = {
            body: {
                username: 'MrPruu',
                email: 'Teste@email.com',
                password: 'New_Password'
            }
        } as any

        const res = {
            status: vi.fn().mockReturnThis(),
            send: vi.fn()
        } as any

        collections.users = {
            findOne: error,
        } as any

        await Register(req, res)

        expect(res.status).toHaveBeenCalledWith(500)
    })
})