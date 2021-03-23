import { Loader } from './loader';

export enum TransactionType {
  CREDIT = 'credit',
  DEBIT = 'debit',
}

export interface Transaction {
  uuid: string;
  accountId: string;
  type: TransactionType;
  amount: number;
  createdAt: Date;
}

export interface TransactionMap {
  [key: string]: Transaction;
}

export interface TransactionListingState {
  transactions: Transaction[];
  loader: Loader;
}

export const TRANSACTIONS_READ_REQUEST = 'TRANSACTIONS_READ_REQUEST';
export const TRANSACTIONS_READ_SUCCESS = 'TRANSACTIONS_READ_SUCCESS';
export const TRANSACTIONS_READ_ERROR = 'TRANSACTIONS_READ_ERROR';

export interface TransactionsReadRequestAction {
  type: typeof TRANSACTIONS_READ_REQUEST;
}

export interface TransactionsReadSuccessAction {
  type: typeof TRANSACTIONS_READ_SUCCESS;
  transactions: Transaction[];
}

export interface TransactionsReadErrorAction {
  type: typeof TRANSACTIONS_READ_ERROR;
  error: string;
}

export type TransactionActionTypes =
  | TransactionsReadRequestAction
  | TransactionsReadSuccessAction
  | TransactionsReadErrorAction;
