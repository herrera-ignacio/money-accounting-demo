import { combineReducers } from 'redux';
import {
  Loader,
  Account,
  AccountState,
  AccountListingActionTypes,
  ACCOUNTS_READ_REQUEST,
  ACCOUNTS_READ_ERROR,
  ACCOUNTS_READ_SUCCESS,
} from '../types';
import { loaderInitialState } from './loader';

const AccountInitialState: Account = {
  uuid: '',
  owner: '',
  balance: 0,
};

const loaderReducer = (state = loaderInitialState, action: AccountListingActionTypes): Loader => {
  switch (action.type) {
    case ACCOUNTS_READ_REQUEST:
      return { ...loaderInitialState, loading: true };
    case ACCOUNTS_READ_ERROR:
      return { ...loaderInitialState, completed: true, error: action.error };
    case ACCOUNTS_READ_SUCCESS:
      return { ...loaderInitialState, completed: true, success: true };
    default:
      return state;
  }
};

const AccountReducer = (state = AccountInitialState, action: AccountListingActionTypes): Account => {
  switch (action.type) {
    case ACCOUNTS_READ_SUCCESS:
      // This only applies in the scenario of a single user
      return action.accounts[0];
    default:
      return state;
  }
};

export const combinedAccountReducer = combineReducers<AccountState>({
  account: AccountReducer,
  loader: loaderReducer,
});
