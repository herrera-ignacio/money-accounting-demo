import {
  Transaction,
  TRANSACTIONS_READ_REQUEST,
  TRANSACTIONS_READ_ERROR,
  TRANSACTIONS_READ_SUCCESS,
  TransactionsReadRequestAction,
  TransactionsReadErrorAction,
  TransactionsReadSuccessAction,
} from '../types';

export const transactionsReadRequest = (): TransactionsReadRequestAction => ({
  type: TRANSACTIONS_READ_REQUEST,
});

export const transactionsReadError = (error: string): TransactionsReadErrorAction => ({
  type: TRANSACTIONS_READ_ERROR,
  error,
});

export const transactionsReadSuccess = (transactions: Transaction[]): TransactionsReadSuccessAction => ({
  type: TRANSACTIONS_READ_SUCCESS,
  transactions,
});
