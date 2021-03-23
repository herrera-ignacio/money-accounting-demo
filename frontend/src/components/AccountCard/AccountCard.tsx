import React, { FC } from 'react';
import styled, { css } from 'styled-components';
import { IconContainer, ContainerHorizontalStyleBase } from '../../theme/styles';
import { Account } from '../../store/types/account';
import { UserOutlined } from '../../theme/icons';

interface AccountCardProps {
  account?: Account;
}

const ContainerHorizontal = styled.div`
  ${ContainerHorizontalStyleBase}
  flex: 1;
`;

const ContainerAccountData = styled.div`
  ${ContainerHorizontalStyleBase}
  flex: 0.2;
  justify-content: space-between;
  margin-left: 15px;
`;

export const AccountCard: FC<AccountCardProps> = ({ account }: AccountCardProps) => {
  return (
    <ContainerHorizontal>
      <IconContainer>
        <UserOutlined />
      </IconContainer>
      {account && (
        <ContainerAccountData>
          <span>
            <b>Name</b>: {account.owner}{' '}
          </span>
          <span>
            <b>Balance</b>: ${account.balance}
          </span>
        </ContainerAccountData>
      )}
    </ContainerHorizontal>
  );
};
