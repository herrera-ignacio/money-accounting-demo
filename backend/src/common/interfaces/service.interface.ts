import { IEntity } from '../../entities/entity.interface';
import { RepositoryQuery } from './repositoryQuery.interface';
import { IRepository } from './repository.interface';

export interface Service<
T,
K extends IEntity,
QueryOptions extends RepositoryQuery,
Repo extends IRepository<T>> {
  getRepository: () => Repo;

  get: (options: QueryOptions) => K[];

  getById: (id: string) => K;

  create: (input: Partial<T>) => K;

  update: (input: { uuid: string } & Partial<T>) => K;

  delete: (id: string) => void;
}
