import { TransactionType } from './transaction.interface';

export interface TransactionInput {
  type: TransactionType;
  amount: number;
  accountId: string;
}
