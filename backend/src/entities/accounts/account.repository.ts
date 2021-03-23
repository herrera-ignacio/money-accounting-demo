import { classToPlain, plainToClass } from 'class-transformer';
import { Account } from './account.entity';
import { AccountDto } from './dtos';
import { EntityRepository } from '../entity.repository';

export class AccountsRepository extends EntityRepository<Account, AccountDto> {
  private static instance: AccountsRepository;

  public static getInstance(): AccountsRepository {
    if (!AccountsRepository.instance) {
      AccountsRepository.instance = new AccountsRepository();
    }

    return AccountsRepository.instance;
  }

  private constructor() {
    super();
  }

  transform = (model: Account, transformOptions = {}): AccountDto => plainToClass(
    AccountDto,
    classToPlain(model, transformOptions),
    transformOptions,
  );

  transformMany = (models: Account[]): AccountDto[] => models.map(
    (model) => this.transform(model),
  );
}
