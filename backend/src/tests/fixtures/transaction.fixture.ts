import { TransactionType, TransactionInput } from '../../entities/transactions/interfaces';

export const mockDebitTransactionInput = ({
  amount,
  accountId,
} : {
  amount: number,
  accountId: string,
}): TransactionInput => ({
  amount,
  accountId,
  type: TransactionType.DEBIT,
});

export const mockCreditTransactionInput = ({
  amount,
  accountId,
} : {
  amount: number,
  accountId: string,
}): TransactionInput => ({
  amount,
  accountId,
  type: TransactionType.CREDIT,
});
