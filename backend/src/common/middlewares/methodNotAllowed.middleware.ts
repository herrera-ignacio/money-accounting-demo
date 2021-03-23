import { Response, Request, NextFunction } from 'express';
import { MethodNotAllowedException } from '../exceptions';

export const methodNotAllowedMiddleware = (
  _req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  next(new MethodNotAllowedException());
};
