import { plainToClass } from 'class-transformer';
import { BaseEntity } from './base.entity';
import { Repository } from '../common/libs/repository';
import { EntityDto } from './entity.dto';
import { RepositoryQuery } from '../common/interfaces';

export class EntityRepository<
T extends BaseEntity,
K extends EntityDto>
  extends Repository<T> {
  protected data: Record<string, T> = {};

  get(options: RepositoryQuery = {}): K[] {
    return this.transformMany(this.find(options));
  }

  getById(id: string): K {
    const entity = this.findById(id);

    return entity ? this.transform(entity) : undefined;
  }

  saveEntity(input: T): K {
    const entity = this.create(input);

    return this.transform(entity);
  }

  updateEntity(input: { uuid: string } & Partial<T>): K | undefined {
    const entity = this.update(input);

    return entity ? this.transform(entity) : undefined;
  }

  transform(model: T, transformOptions = {}): K {
    return plainToClass(
      EntityDto,
      model,
      transformOptions,
    ) as K;
  }

  transformMany(models: T[], transformOptions = {}): K[] {
    return models.map(
      (model) => this.transform(model, transformOptions),
    );
  }
}
