import { v4 as uuidv4 } from 'uuid';
import { IEntity } from './entity.interface';

export class BaseEntity implements IEntity {
  public uuid: string;
  public createdAt: Date;

  constructor() {
    this.uuid = uuidv4();
    this.createdAt = new Date();
  }
}
