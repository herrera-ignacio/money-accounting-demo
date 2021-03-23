export enum TransactionType {
  CREDIT = 'credit',
  DEBIT = 'debit',
}

export interface ITransaction {
  uuid: string;

  accountId: string;

  type: TransactionType;

  amount: number;

  createdAt: Date;
}
