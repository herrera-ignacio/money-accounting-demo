import * as core from 'express-serve-static-core';
import { Request, Response, NextFunction } from 'express';
import { Link } from '../interfaces';

export const HATEOASLinks = (links: Record<string, Link>) => (
  _req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const resJson = res.json;

  res.json = function json(
    obj: core.Send<any, Response<any, Record<string, any>>>,
  ) {
    return resJson.call(this, { ...obj, links });
  };

  next();
};
