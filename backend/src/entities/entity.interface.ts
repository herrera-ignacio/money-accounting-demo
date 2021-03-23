export interface IEntity {
  uuid: string;

  createdAt: Date;

  [key: string]: any;
}
