import { HttpClient } from './HttpClient';
import { Transaction, Account } from '../types';

class ServiceApi extends HttpClient {
  public constructor() {
    super(process.env.REACT_APP_API_URL as string);
  }

  public getTransactions = async (): Promise<Transaction[]> => {
    const res = await this.instance.get('/transactions');

    return res.data;
  };

  public getAccounts = async (): Promise<Account[]> => {
    const res = await this.instance.get('/accounts');

    return res.data;
  };
}

export const serviceApi = new ServiceApi();
