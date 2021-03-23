import { Response, Request, NextFunction } from 'express';
import { HttpException } from '../exceptions';

export function httpErrorMiddleware(
  error: HttpException,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
): void {
  const status: number = error.status || 500;
  const message: string = error.message || 'Something went wrong';

  // eslint-disable-next-line no-console
  console.error('[ERROR]', status, message);

  res.status(status).json({ message });
}
