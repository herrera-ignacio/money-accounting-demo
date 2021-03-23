import { Request, Response, NextFunction } from 'express';
import { RequestWithIdParam, RequestWithRepositoryQuery } from './requests.interface';

export interface CRUDController {
  identifier: string;

  get: (req: RequestWithRepositoryQuery, res: Response, next: NextFunction) => void

  getById: (req: RequestWithIdParam, res: Response, next: NextFunction) => void

  create: (req: Request, res: Response, next: NextFunction) => void

  update: (req: RequestWithIdParam, res: Response, next: NextFunction) => void

  delete: (req: Request, res: Response, next: NextFunction) => void
}
