import { RootState, Account, Loader } from '../types';

export const getAccount = (state: RootState): Account => state.account.account;

export const getAccountLoader = (state: RootState): Loader => state.account.loader;
