import { Response, NextFunction } from 'express';
import { RequestWithRepositoryQuery } from '../interfaces';

export const queryParserMiddleware = (
  { where } : { where?: string[] },
) => (
  req: RequestWithRepositoryQuery,
  _res: Response,
  next: NextFunction,
): void => {
  req.query.where = {};

  if (where) {
    req.query.where = where.reduce(
      (whereParams: Record<string, any>, key: string) => (req.query[key] ? {
        ...whereParams,
        [key]: req.query[key],
      } : whereParams),
      {},
    );
  }

  next();
};
