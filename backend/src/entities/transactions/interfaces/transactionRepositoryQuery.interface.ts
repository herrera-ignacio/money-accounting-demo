import { RepositoryQuery } from '../../../common/interfaces';

export interface TransactionRepositoryQuery extends RepositoryQuery {
  where?: {
    accountId: string;
  }
}
