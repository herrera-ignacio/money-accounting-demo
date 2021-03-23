import { NextFunction, Response, Request } from 'express';
import {
  RepositoryQuery,
  CRUDController,
  RequestWithIdParam,
  RequestWithRepositoryQuery,
  RequestWithUpdateBody,
  RequestWithCreateBody,
} from '../common/interfaces';
import { EntityRepository } from './entity.repository';
import { EntityDto } from './entity.dto';
import { EntityService } from './entity.service';
import { BaseEntity } from './base.entity';

export class EntityController<
  T extends BaseEntity,
  K extends EntityDto,
  Service extends EntityService<T, K, RepositoryQuery, EntityRepository<T, K>>,
> implements CRUDController {
  protected readonly modelService: Service;

  public identifier: string;

  constructor(modelService: Service, identifier = 'uuid') {
    this.modelService = modelService;
    this.identifier = identifier;
  }

  public get = (
    req: RequestWithRepositoryQuery,
    res: Response,
    next: NextFunction,
  ): void => {
    try {
      const entities = this.modelService.get(req.query as any);
      res.status(200).json({ data: entities });
    } catch (error) {
      next(error);
    }
  };

  public getById = (
    req: RequestWithIdParam,
    res: Response,
    next: NextFunction,
  ): void => {
    try {
      const entity = this.modelService.getById(req.params[this.identifier]);
      res.status(200).json({ data: entity });
    } catch (error) {
      next(error);
    }
  };

  public create = (
    req: RequestWithCreateBody<T>,
    res: Response,
    next: NextFunction,
  ): void => {
    try {
      const entity = this.modelService.create(req.body);
      res.status(201).json({ data: entity });
    } catch (error) {
      next(error);
    }
  };

  public update = (
    req: RequestWithUpdateBody<T>,
    res: Response,
    next: NextFunction,
  ): void => {
    try {
      const entity = this.modelService.update({ ...req.body });
      res.status(200).json({ data: entity });
    } catch (error) {
      next(error);
    }
  };

  public delete = (req: Request, res: Response, next: NextFunction): void => {
    try {
      this.modelService.delete(req.params[this.identifier]);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
