import { ajax } from '../lib/ajax.lib';
import { IAccount } from '../shared/interfaces/accounts.interface';
import { ICoreHttpResponse } from '../shared/interfaces/http-response.interface';

const API_ACCOUNTS_BASE_URL = 'http://localhost:8000/api/accounts';

export const indexAccounts = async (): Promise<
  ICoreHttpResponse<IAccount[]>
> => {
  return await ajax.get(`${API_ACCOUNTS_BASE_URL}`);
};

export const getAccountById = async (
  id: string
): Promise<ICoreHttpResponse<IAccount>> => {
  return await ajax.get(`${API_ACCOUNTS_BASE_URL}/${id}`);
};
