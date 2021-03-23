import {
  Account,
  ACCOUNTS_READ_REQUEST,
  ACCOUNTS_READ_ERROR,
  ACCOUNTS_READ_SUCCESS,
  AccountsReadRequestAction,
  AccountsReadErrorAction,
  AccountsReadSuccessAction,
} from '../types';

export const accountsReadRequest = (): AccountsReadRequestAction => ({
  type: ACCOUNTS_READ_REQUEST,
});

export const accountsReadError = (error: string): AccountsReadErrorAction => ({
  type: ACCOUNTS_READ_ERROR,
  error,
});

export const accountsReadSuccess = (accounts: Account[]): AccountsReadSuccessAction => ({
  type: ACCOUNTS_READ_SUCCESS,
  accounts,
});
