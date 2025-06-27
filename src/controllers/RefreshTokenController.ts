import type { Request, Response } from 'express';
import { z } from 'zod';

export class RefreshTokenController {
  static schema = z.object({
    refreshToken: z.string().cuid(),
  });

  static handle = async (request: Request, response: Response): Promise<void> => {
    response.status(200).json({
      message: 'Não implementado',
    });
  };
}
