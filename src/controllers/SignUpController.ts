import { hash } from 'bcryptjs';
import { z } from 'zod';
import { AccountsRepository } from '../repositories/AccountsRepository';
import type { Request, Response } from 'express';
import { EmailAlreadyInUse } from '../errors/EmailAlreadyInUse';

export class SignUpController {
  static schema = z.object({
    email: z.string().email().min(1),
    password: z.string().min(8),
    name: z.string().min(1),
  });

  static handle = async (request: Request, response: Response): Promise<void> => {
    try {
      const result = this.schema.parse(request.body);

      const { email, name, password } = result;

      const accountAlreadyExists = await AccountsRepository.findByEmail(email);

      if (accountAlreadyExists) {
        throw new EmailAlreadyInUse();
      }

      const hashedPassword = await hash(password, 12);

      const account = await AccountsRepository.create({
        email,
        name,
        password: hashedPassword,
      });

      response
        .json({
          account: {
            id: account.id,
            name: account.name,
            email: account.email,
          },
        });

    } catch (error) {
      if (error instanceof z.ZodError) {
        response.status(400).json({ errors: error.issues });
      } else if (error instanceof EmailAlreadyInUse) {
        response.status(error.statusCode).json({ errors: error.message });
      } else {
        response.status(500).json({ errors: 'Internal server error.' });
      }
    }
  };
}
