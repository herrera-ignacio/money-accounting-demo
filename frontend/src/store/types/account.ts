import { Loader } from './loader';

export interface Account {
  uuid: string;
  owner: string;
  balance: number;
}

export interface AccountState {
  account: Account;
  loader: Loader;
}

export const ACCOUNTS_READ_REQUEST = 'ACCOUNTS_READ_REQUEST';
export const ACCOUNTS_READ_SUCCESS = 'ACCOUNTS_READ_SUCCESS';
export const ACCOUNTS_READ_ERROR = 'ACCOUNTS_READ_ERROR';

export interface AccountsReadRequestAction {
  type: typeof ACCOUNTS_READ_REQUEST;
}

export interface AccountsReadSuccessAction {
  type: typeof ACCOUNTS_READ_SUCCESS;
  accounts: Account[];
}

export interface AccountsReadErrorAction {
  type: typeof ACCOUNTS_READ_ERROR;
  error: string;
}

export type AccountListingActionTypes = AccountsReadRequestAction | AccountsReadErrorAction | AccountsReadSuccessAction;
