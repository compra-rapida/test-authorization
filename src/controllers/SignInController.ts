import { compare } from 'bcryptjs';
import { z } from 'zod';
import { AccountsRepository } from '../repositories/AccountsRepository';
import type { Request, Response } from 'express';
import { InvalidCredentials } from '../errors/InvalidCredentials';
import { sign } from 'jsonwebtoken';
import { env } from '../config/env';
import { expireInToken } from '../utils/token';

export class SignInController {
  static schema = z.object({
    email: z.string().email().min(1),
    password: z.string().min(8),
  });

  static handle = async (request: Request, response: Response): Promise<void> => {
    try {
      const result = this.schema.parse(request.body);

      const { email, password } = result;

      const account = await AccountsRepository.findByEmail(email);

      if (!account) {
        throw new InvalidCredentials();
      }

      const isPasswordValid = await compare(password, account.password);

      if (!isPasswordValid) {
        throw new InvalidCredentials();
      }

      const accessToken = sign({ sub: account.id }, env.JWT_SECRET, { expiresIn: expireInToken });

      response
        .status(200)
        .json({
          accessToken,
          refreshToken: null,
        });

    } catch (error) {
      if (error instanceof z.ZodError) {
        response.status(400).json({ errors: error.issues });
      } else if (error instanceof InvalidCredentials) {
        response.status(error.statusCode).json({ errors: error.message });
      } else {
        response.status(500).json({ errors: 'Internal server error.' });
      }
    }
  };
}
