import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Layout as LayoutAntd } from 'antd';
import { geekblue } from '@ant-design/colors';
import styled from 'styled-components';
import { IconContainer } from '../../theme/styles';
import { AccountCard } from '../AccountCard';
import { transactionsReadRequest } from '../../store/actions/transaction';
import { getAccount, getTransactionListingLoader } from '../../store/selectors';
import { ReloadOutlined } from '../../theme/icons';

interface PageLayoutProps {
  children: React.ReactNode;
}

const { Content: ContentAntD, Header: HeaderAntd } = LayoutAntd;

const Layout = styled(LayoutAntd)`
  background-color: white;
  height: 100vh;
`;

const Header = styled(HeaderAntd)`
  background-color: white;
  box-shadow: ${() => `0px 1px 3px ${geekblue[1]}`};
  border-radius: 0px 0px 10px 10px;
  color: ${() => geekblue[4]};
  display: flex;
  flex-direction: row;
`;

const Content = styled(ContentAntD)`
  padding: 30px;
  height: 80vh;

  .site-content {
    padding: 20px;
    border-radius: 10px;
    height: 100%;
    overflow-y: scroll;
  }
`;

export const PageLayout: FC<PageLayoutProps> = ({ children }: PageLayoutProps) => {
  const dispatch = useDispatch();

  const account = useSelector(getAccount);

  const transactionListingLoader = useSelector(getTransactionListingLoader);

  const onRefreshClick = () => {
    dispatch(transactionsReadRequest());
  };

  return (
    <Layout>
      <Header>
        <AccountCard account={account} />
        <IconContainer>
          <ReloadOutlined onClick={onRefreshClick} spin={transactionListingLoader.loading} />
        </IconContainer>
      </Header>
      <Content>
        <div className="site-content">{children}</div>
      </Content>
    </Layout>
  );
};
