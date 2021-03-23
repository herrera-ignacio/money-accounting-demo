import { call, takeEvery, put } from 'redux-saga/effects';
import { TRANSACTIONS_READ_REQUEST, Transaction, TransactionsReadRequestAction } from '../types';
import actions from '../actions';
import { serviceApi } from '../services/ServiceApi';

export const readTransactions = function* async({}: TransactionsReadRequestAction): Generator {
  try {
    const transactions = yield call(serviceApi.getTransactions);
    yield put(actions.transactionsReadSuccess(transactions as Transaction[]));
  } catch (err) {
    const error = err instanceof Error ? err.message : 'Something went wrong';
    yield put(actions.transactionsReadError(error));
  }
};

export default function* (): Generator {
  return [yield takeEvery(TRANSACTIONS_READ_REQUEST, readTransactions)];
}
