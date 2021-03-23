import { LockedException } from '../common/exceptions';
import { RepositoryQuery } from '../common/interfaces';
import { BaseEntity } from './base.entity';
import { EntityDto } from './entity.dto';
import { EntityRepository } from './entity.repository';
import { EntityService } from './entity.service';

export class EntityWriteLockService<
  T extends BaseEntity,
  K extends EntityDto,
  QueryOptions extends RepositoryQuery,
  Repository extends EntityRepository<T, K>,
> extends EntityService<T, K, QueryOptions, Repository> {
  public readonly EntityConstructor: new (input: Partial<T>, ...args: any[]) => T;

  private static isLocked = false;

  public static lock(): void {
    EntityWriteLockService.isLocked = true;
  }

  public static releaseLock(): void {
    EntityWriteLockService.isLocked = false;
  }

  public validateLock(): void {
    if (EntityWriteLockService.isLocked) {
      throw new LockedException(
        `${this.EntityConstructor.name} is locked due to another ${this.EntityConstructor.name.toLowerCase()} being processed`,
      );
    }
  }

  public get(queryOptions?: QueryOptions): K[] {
    this.validateLock();

    return super.get(queryOptions);
  }

  public getById(id: string): K {
    this.validateLock();

    return super.getById(id);
  }

  public create(input: Partial<T>, ...args: any[]): K {
    this.validateLock();

    EntityWriteLockService.lock();

    const res = super.create(input, ...args);

    EntityWriteLockService.releaseLock();

    return res;
  }
}
