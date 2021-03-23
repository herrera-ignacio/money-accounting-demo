export class TransactionForbiddenException extends Error {
  public message: string;

  constructor(message = 'Transaction Forbidden') {
    super(message);
  }
}

export type TransactionException = TransactionForbiddenException;
