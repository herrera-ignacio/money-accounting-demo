import { NextFunction, Response, Request } from 'express';
import pkg from '../../../package.json';

export class IndexController {
  public index = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      res.status(200).json({
        name: pkg.name,
        author: pkg.author,
        description: pkg.description,
        version: pkg.version,
      });
    } catch (error) {
      next(error);
    }
  };
}
