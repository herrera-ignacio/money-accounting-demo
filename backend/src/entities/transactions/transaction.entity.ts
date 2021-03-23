import { ITransaction, TransactionType } from './interfaces';
import { TransactionForbiddenException } from './transaction.exception';
import { Account } from '../accounts/account.entity';
import { BaseEntity } from '../base.entity';

export class Transaction extends BaseEntity implements ITransaction {
  public uuid: string;

  public type: TransactionType;

  public accountId: string;

  public amount: number;

  public createdAt: Date;

  public static isAllowed = (
    { amount, type }: Partial<Transaction>,
    account: Account,
  ): { allow: boolean, error?: string } => {
    switch (type) {
      case TransactionType.CREDIT:
        return { allow: true };
      case TransactionType.DEBIT:
        return { allow: account.balance >= amount, error: 'Not enough funds' };
      default:
        return { allow: false };
    }
  };

  constructor({ type, amount, accountId }: Partial<Transaction>, account: Account) {
    const { allow, error } = Transaction.isAllowed({ amount, type }, account);

    if (!allow) {
      throw new TransactionForbiddenException(error);
    }

    super();

    Object.assign(this, { type, amount, accountId });
  }
}
