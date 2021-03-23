import * as accountActions from './account';
import * as transactionActions from './transaction';

export default {
  ...accountActions,
  ...transactionActions,
};
