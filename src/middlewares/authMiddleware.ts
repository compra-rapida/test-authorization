import type { Request, Response, NextFunction } from 'express';

export async function authMiddleware(request: Request, response: Response, next: NextFunction) {
  next();
}
