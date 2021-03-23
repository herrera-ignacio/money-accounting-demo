import { Account } from '../../entities/accounts/account.entity';

export const mockAccount = (balance: number): Account => new Account({
  owner: 'Test User',
  balance,
});
