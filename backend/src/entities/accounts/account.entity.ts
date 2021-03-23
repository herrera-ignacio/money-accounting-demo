import { IAccount } from './interfaces';
import { BaseEntity } from '../base.entity';

export class Account extends BaseEntity implements IAccount {
  public uuid: string;

  public balance: number;

  public owner: string;

  public createdAt: Date;

  constructor({ owner, balance }: Partial<Account>) {
    super();

    Object.assign(this, { owner, balance: balance ?? 0 });
  }
}
