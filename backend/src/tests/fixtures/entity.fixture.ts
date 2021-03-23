import { plainToClass } from 'class-transformer';
import { BaseEntity } from '../../entities/base.entity';

export const mockBaseEntity = (input: Partial<BaseEntity> = {}): BaseEntity => {
  const entity = new BaseEntity();

  return plainToClass(
    BaseEntity,
    { ...entity, ...input },
  );
};
