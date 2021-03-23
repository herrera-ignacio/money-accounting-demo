import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spin } from 'antd';
import { TransactionList } from '../../components/TransactionList';
import { accountsReadRequest } from '../../store/actions/account';
import { transactionsReadRequest } from '../../store/actions/transaction';
import { getTransactionListingLoader, getTransactions } from '../../store/selectors/transactionListing';

export const TransactionListingPage: FC = () => {
  const dispatch = useDispatch();

  const loader = useSelector(getTransactionListingLoader);

  const transactions = useSelector(getTransactions);

  useEffect(() => {
    dispatch(accountsReadRequest());

    dispatch(transactionsReadRequest());
  }, []);

  return loader.loading ? <Spin /> : <TransactionList transactions={transactions} />;
};
