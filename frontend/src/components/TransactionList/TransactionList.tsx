import React, { FC } from 'react';
import { Collapse as CollapseAntd, CollapseProps, Empty } from 'antd';
import { geekblue, volcano } from '@ant-design/colors';
import styled from 'styled-components';
import { Transaction, TransactionType } from '../../store/types';

interface TransactionListProps {
  transactions: Transaction[];
}

interface PanelProps extends CollapseProps {
  transactionType: TransactionType;
}

const Collapse = styled(CollapseAntd)`
  background-color: transparent;
  border-color: transparent;

  .ant-collapse-item {
    border-color: transparent;
  }
`;

const { Panel: PanelAntd } = Collapse;

const Panel = styled(PanelAntd)<PanelProps>`
  background-color: ${({ transactionType }) => {
    switch (transactionType) {
      case TransactionType.CREDIT:
        return geekblue[3];
      case TransactionType.DEBIT:
        return volcano[4];
      default:
        return geekblue[5];
    }
  }};
  border-radius: 10px;
  margin: 10px;

  && .ant-collapse-header {
    color: white;
    font-weight: bold;
  }

  && .ant-collapse-content {
    background-color: ${({ transactionType }) => {
      switch (transactionType) {
        case TransactionType.CREDIT:
          return geekblue[0];
        case TransactionType.DEBIT:
          return volcano[0];
        default:
          return 'transparent';
      }
    }};
  }

  p {
    color: ${({ transactionType }) => {
      switch (transactionType) {
        case TransactionType.CREDIT:
          return geekblue[4];
        case TransactionType.DEBIT:
          return volcano[4];
        default:
          return 'black';
      }
    }};
  }
`;

export const TransactionList: FC<TransactionListProps> = ({ transactions }: TransactionListProps) => {
  return transactions && transactions.length > 0 ? (
    <Collapse accordion>
      {transactions.map((t, idx) => {
        const header = `${t.type.toUpperCase()} $${t.amount}`;

        return (
          <Panel header={header} key={idx} transactionType={t.type}>
            <p>
              <b>Id: </b>
              {t.uuid}
            </p>
            <p>
              <b>Type: </b>
              {t.type}
            </p>
            <p>
              <b>Amount: </b>
              {t.amount}
            </p>
            <p>
              <b>Date: </b>
              {t.createdAt}
            </p>
          </Panel>
        );
      })}
    </Collapse>
  ) : (
    <Empty description="No transactions, start operating and refresh!" />
  );
};
