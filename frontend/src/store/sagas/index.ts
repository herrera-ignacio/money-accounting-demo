import { all, fork } from 'redux-saga/effects';
import transactionListingSaga from './transactionListing';
import accountListingSaga from './accountListing';

export const rootSaga = function* root(): Generator {
  yield all([fork(transactionListingSaga), fork(accountListingSaga)]);
};
