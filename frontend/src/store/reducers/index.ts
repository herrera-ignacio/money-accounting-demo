import { combineReducers } from 'redux';
import { combinedAccountReducer } from './account';
import { combinedTransactionListingReducer } from './transactionListing';

export const rootReducer = combineReducers({
  account: combinedAccountReducer,
  transactionListing: combinedTransactionListingReducer,
});
