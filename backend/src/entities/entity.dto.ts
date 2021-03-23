import { IEntity } from './entity.interface';

export class EntityDto implements IEntity {
  uuid: string;

  createdAt: Date;

  [key: string]: any;
}
