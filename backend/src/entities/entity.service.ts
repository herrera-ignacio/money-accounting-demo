import { BaseEntity } from './base.entity';
import { EntityDto } from './entity.dto';
import { EntityRepository } from './entity.repository';
import { RepositoryQuery, Service } from '../common/interfaces';
import { NotFoundException } from '../common/exceptions';

export class EntityService<
  T extends BaseEntity,
  K extends EntityDto,
  QueryOptions extends RepositoryQuery,
  Repository extends EntityRepository<T, K>,
> implements Service<T, K, QueryOptions, Repository> {
  private readonly repository;

  public readonly EntityConstructor;

  public constructor(
    repository: Repository,
    entityConstructor: new (input: Partial<T>, ...args: any[]) => T,
  ) {
    this.repository = repository;
    this.EntityConstructor = entityConstructor;
  }

  public getRepository(): Repository {
    return this.repository;
  }

  public get(queryOptions?: QueryOptions): K[] {
    return this.getRepository().get(queryOptions);
  }

  public getById(id: string): K {
    const entity = this.getRepository().getById(id);

    if (!entity) throw new NotFoundException(`${this.EntityConstructor.name} not found`);

    return entity;
  }

  public create(input: Partial<T>, ...args: any[]): K {
    return this.getRepository().saveEntity(new this.EntityConstructor(input, ...args));
  }

  public update(input: { uuid: string } & Partial<T>): K {
    const updatedEntity = this.getRepository().updateEntity(input);

    if (!updatedEntity) throw new NotFoundException();

    return updatedEntity;
  }

  public delete(id: string): void {
    const { success } = this.getRepository().delete(id);

    if (!success) throw new NotFoundException();
  }
}
