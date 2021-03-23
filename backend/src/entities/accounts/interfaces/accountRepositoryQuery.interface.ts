import { RepositoryQuery } from '../../../common/interfaces';

export interface AccountRepositoryQuery extends RepositoryQuery {
  where?: {
    owner: string;
  }
}
