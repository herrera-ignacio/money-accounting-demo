import { call, takeEvery, put } from 'redux-saga/effects';
import { Account, AccountsReadRequestAction, ACCOUNTS_READ_REQUEST } from '../types';
import actions from '../actions';
import { serviceApi } from '../services/ServiceApi';

export const readAccounts = function* async({}: AccountsReadRequestAction): Generator {
  try {
    const accounts = yield call(serviceApi.getAccounts);
    yield put(actions.accountsReadSuccess(accounts as Account[]));
  } catch (err) {
    const error = err instanceof Error ? err.message : 'Something went wrong';
    yield put(actions.accountsReadError(error));
  }
};

export default function* (): Generator {
  return [yield takeEvery(ACCOUNTS_READ_REQUEST, readAccounts)];
}
