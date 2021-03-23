import { EntityWriteLockService } from '../entityWriteLock.service';
import { TransactionsRepository } from './transaction.repository';
import { Transaction } from './transaction.entity';
import { TransactionDto } from './dtos';
import { TransactionRepositoryQuery, TransactionType } from './interfaces';
import { AccountsService } from '../accounts/account.service';

export class TransactionsService extends EntityWriteLockService<
Transaction,
TransactionDto,
TransactionRepositoryQuery,
TransactionsRepository
> {
  private accountsService = new AccountsService();

  constructor(repository = TransactionsRepository.getInstance()) {
    super(repository, Transaction);
  }

  public create(input: Omit<Transaction, 'uuid' | 'createdAt'>): TransactionDto {
    const account = this.accountsService.getById(input.accountId);

    const transaction = super.create(input, account);

    let newAccountBalance = account.balance;

    if (transaction.type === TransactionType.CREDIT) {
      newAccountBalance += transaction.amount;
    }

    if (transaction.type === TransactionType.DEBIT) {
      newAccountBalance -= transaction.amount;
    }

    this.accountsService.update({ ...account, balance: newAccountBalance });

    return transaction;
  }
}

Object.assign(TransactionsService, EntityWriteLockService);
