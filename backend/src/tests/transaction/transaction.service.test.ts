/* eslint-disable @typescript-eslint/no-unused-vars */
import * as sinon from 'sinon';
import { TransactionsRepository } from '../../entities/transactions/transaction.repository';
import { TransactionsService } from '../../entities/transactions/transaction.service';
import { AccountsRepository } from '../../entities/accounts/account.repository';
import { AccountsService } from '../../entities/accounts/account.service';
import { TransactionForbiddenException } from '../../entities/transactions/transaction.exception';
import { mockAccount, mockDebitTransactionInput, mockCreditTransactionInput } from '../fixtures';

describe('Transaction / Service', () => {
  describe('Single user created', () => {
    const sandbox = sinon.createSandbox();

    const transactionsRepository = TransactionsRepository.getInstance();

    const getRepositorySpy = sinon.spy(() => transactionsRepository);

    const transactionService = new TransactionsService(transactionsRepository);

    const accountsRepository = AccountsRepository.getInstance();

    const accountsService = new AccountsService(accountsRepository);

    const testAccount = accountsService.create(mockAccount(0));

    beforeEach(() => {
      getRepositorySpy.resetHistory();

      sandbox.replace(TransactionsService.prototype, 'getRepository' as any, getRepositorySpy);
    });

    afterEach(() => {
      sandbox.restore();
    });

    describe('Transactions / Service / Create', () => {
      it('Create credit transaction', () => {
        const getAccountById = sinon.spy((_id: string) => testAccount);

        sandbox.replace(AccountsService.prototype, 'getById', getAccountById);

        const updateAccount = sinon.spy(
          (input: { uuid: string } & Partial<Account>) => ({ ...testAccount, ...input }),
        );

        sandbox.replace(AccountsService.prototype, 'update', updateAccount);

        const input = mockCreditTransactionInput({ amount: 1000, accountId: testAccount.uuid });

        const transaction = transactionService.create(input);

        expect(transaction).toMatchObject(input);
        expect(getAccountById.calledOnce).toBe(true);
        expect(getAccountById.getCall(0).args[0]).toEqual(testAccount.uuid);
        expect(updateAccount.calledOnce).toBe(true);
        expect(updateAccount.getCall(0).args[0]).toMatchObject({
          balance: testAccount.balance + transaction.amount,
        });
      });

      it('Create valid debit transaction', () => {
        const getAccountById = sinon.spy((_id: string) => testAccount);

        sandbox.replace(AccountsService.prototype, 'getById', getAccountById);

        const updateAccount = sinon.spy(
          (input: { uuid: string } & Partial<Account>) => ({ ...testAccount, ...input }),
        );

        sandbox.replace(AccountsService.prototype, 'update', updateAccount);

        const input = mockDebitTransactionInput({
          amount: testAccount.balance / 2,
          accountId: testAccount.uuid,
        });

        const transaction = transactionService.create(input);

        expect(transaction).toMatchObject(input);
        expect(getAccountById.calledOnce).toBe(true);
        expect(getAccountById.getCall(0).args[0]).toEqual(testAccount.uuid);
        expect(updateAccount.calledOnce).toBe(true);
        expect(updateAccount.getCall(0).args[0]).toMatchObject({
          balance: testAccount.balance - transaction.amount,
        });
      });

      it('Create invalid debit transaction', () => {
        const getAccountById = sinon.spy((_id: string) => testAccount);

        sandbox.replace(AccountsService.prototype, 'getById', getAccountById);

        const updateAccount = sinon.spy(
          (input: { uuid: string } & Partial<Account>) => ({ ...testAccount, ...input }),
        );

        sandbox.replace(AccountsService.prototype, 'update', updateAccount);

        const input = mockDebitTransactionInput({
          amount: testAccount.balance + 1,
          accountId: testAccount.uuid,
        });

        expect(() => transactionService.create(input)).toThrow(TransactionForbiddenException);

        expect(getAccountById.calledOnce).toBe(true);
        expect(getAccountById.getCall(0).args[0]).toEqual(testAccount.uuid);
        expect(updateAccount.called).toBe(false);
      });
    });
  });
});
