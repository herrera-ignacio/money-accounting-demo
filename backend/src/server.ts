import 'dotenv/config';
import { App } from './app';
import { IndexRoute } from './common/routes';
import { AccountsRoute } from './entities/accounts/account.route';
import { TransactionsRoute } from './entities/transactions/transaction.route';

const app = new App([
  new IndexRoute(),
  new AccountsRoute(),
  new TransactionsRoute(),
]);

app.listen();
