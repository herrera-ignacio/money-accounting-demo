import { IRepository, RepositoryQuery } from '../interfaces';

export class Repository<T extends Record<string, any>> implements IRepository<T> {
  protected data: Record<string, T> = {};

  public find(options?: RepositoryQuery): T[] {
    if (options?.where) {
      return Object.values(this.data).filter((v) => Object.keys(options.where).reduce(
        (valid, k) => valid && v[k] === options.where[k],
        true,
      ));
    }

    return Object.values(this.data);
  }

  public findById(uuid: string): T | undefined {
    return this.data[uuid];
  }

  public create(entity: T): T {
    this.data[entity.uuid] = entity as T;

    return entity;
  }

  public update(entity: { uuid: string } & Partial<T>): T | undefined {
    if (this.data[entity.uuid]) {
      const updatedEntity = Object.assign(this.data[entity.uuid], entity);

      this.data[entity.uuid] = updatedEntity;

      return updatedEntity;
    }

    return undefined;
  }

  public delete(uuid: string): { success: boolean } {
    if (this.data[uuid]) {
      delete this.data[uuid];

      return { success: true };
    }

    return { success: false };
  }
}
