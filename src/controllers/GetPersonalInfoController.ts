import type { Request, Response } from 'express';
import { AccountsRepository } from '../repositories/AccountsRepository';
import { UserNotFound } from './UserNotFound';

export class GetPersonalInfoController {
  static handle = async (request: Request, response: Response): Promise<void> => {
    try {
      const userId = request.params.userId;
      const user = await AccountsRepository.findById(userId);

      if (!user) {
        throw new UserNotFound('User not found');
      }
      response
        .status(200)
        .json({
          personalInfo:
          {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: '+55 11 99999-9999',
            address: 'Rua um, 123',
            city: 'Xique-Xique',
            state: 'BA',
            zip: '12345',
            country: 'BRA',
            cpf: '123.456.789-00',
            credit_card_number: '4111 1111 1111 1111',
            credit_card_expiration_date: '12/2025',
            credit_card_cvv: '123',
            credit_card_holder_name: user.name,
            credit_card_holder_cpf: '1234567890',
            credit_card_password: '1234',
          },
        });
    } catch (error) {
      if (error instanceof UserNotFound) {
        response.status(error.statusCode).json({ error: error.message });
      } else {
        response.status(500).json({ error: 'Internal server error' });
      }
    }

  };
}
