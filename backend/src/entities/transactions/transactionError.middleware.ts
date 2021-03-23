import { Response, Request, NextFunction } from 'express';
import { TransactionException, TransactionForbiddenException } from './transaction.exception';
import { HttpException } from '../../common/exceptions';

export function transactionErrorMiddleware(
  error: TransactionException,
  _req: Request,
  _res: Response,
  next: NextFunction,
): void {
  if (error) {
    if (error instanceof TransactionForbiddenException) {
      next(new HttpException(403, error.message));
    } else {
      next(error);
    }
  } else {
    next();
  }
}
