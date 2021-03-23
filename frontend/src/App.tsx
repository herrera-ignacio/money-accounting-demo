import React, { FC } from 'react';
import { PageLayout } from './components/PageLayout';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { TransactionListingPage } from './screens';
import './App.scss';

const App: FC = () => {
  return (
    <PageLayout>
      <Router>
        <Switch>
          <Route path="/">
            <TransactionListingPage />
          </Route>
        </Switch>
      </Router>
    </PageLayout>
  );
};

export default App;
