import { EntityController } from '../entity.controller';
import { Account } from './account.entity';
import { AccountDto } from './dtos';
import { AccountsService } from './account.service';

export class AccountsController extends EntityController<Account, AccountDto, AccountsService> {
  constructor(modelService = new AccountsService()) {
    super(modelService, 'accountId');
  }
}
