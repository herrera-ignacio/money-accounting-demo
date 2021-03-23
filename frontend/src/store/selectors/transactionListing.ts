import { RootState, Transaction, Loader } from '../types';

export const getTransactions = (state: RootState): Transaction[] => state.transactionListing.transactions;

export const getTransactionListingLoader = (state: RootState): Loader => state.transactionListing.loader;
