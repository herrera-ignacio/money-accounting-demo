import { combineReducers } from 'redux';
import {
  Loader,
  Transaction,
  TransactionListingState,
  TransactionActionTypes,
  TRANSACTIONS_READ_REQUEST,
  TRANSACTIONS_READ_ERROR,
  TRANSACTIONS_READ_SUCCESS,
} from '../types';
import { loaderInitialState } from './loader';

const transactionListingInitialState: Transaction[] = [];

const loaderReducer = (state = loaderInitialState, action: TransactionActionTypes): Loader => {
  switch (action.type) {
    case TRANSACTIONS_READ_REQUEST:
      return { ...loaderInitialState, loading: true };
    case TRANSACTIONS_READ_ERROR:
      return { ...loaderInitialState, completed: true, error: action.error };
    case TRANSACTIONS_READ_SUCCESS:
      return { ...loaderInitialState, completed: true, success: true };
    default:
      return state;
  }
};

const transactionListingReducer = (
  state = transactionListingInitialState,
  action: TransactionActionTypes
): Transaction[] => {
  switch (action.type) {
    case TRANSACTIONS_READ_SUCCESS:
      return action.transactions;
    default:
      return state;
  }
};

export const combinedTransactionListingReducer = combineReducers<TransactionListingState>({
  transactions: transactionListingReducer,
  loader: loaderReducer,
});
