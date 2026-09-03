import { describe, expect, it, vi } from "vitest";
import { ResetUserPassword } from "../../src/controlers/authController";
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

describe('Testa o controller ResetUserPassword', () => {
    it('testa um reset bem sucedido', async () => {
        const req = {
            body: {
                password: 'new_password',
                token: 'token'
            }
        } as any

        const res = {
            status: vi.fn().mockReturnThis(),
            send: vi.fn()
        } as any

        collections.users = {
            updateOne: vi.fn().mockResolvedValue({})
        } as any

        collections.tokens = {
            findOne: vi.fn().mockResolvedValue({}),
            deleteOne: vi.fn().mockResolvedValue({})
        } as any

        await ResetUserPassword(req, res)

        expect(res.status).toHaveBeenCalledWith(200)
    })
})