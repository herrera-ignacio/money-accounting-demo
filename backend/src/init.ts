import { Account } from './entities/accounts/account.entity';
import { AccountsRepository } from './entities/accounts/account.repository';

export const testAccount = new Account({
  owner: 'Test user',
  balance: 0,
});

export const initializeDatabase = (): void => {
  const accountsRepository = AccountsRepository.getInstance();

  accountsRepository.create(testAccount);
};
