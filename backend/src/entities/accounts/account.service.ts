import { EntityService } from '../entity.service';
import { AccountsRepository } from './account.repository';
import { Account } from './account.entity';
import { AccountDto } from './dtos';
import { AccountRepositoryQuery } from './interfaces';

export class AccountsService extends EntityService<
Account,
AccountDto,
AccountRepositoryQuery,
AccountsRepository
> {
  constructor(repository = AccountsRepository.getInstance()) {
    super(repository, Account);
  }
}
