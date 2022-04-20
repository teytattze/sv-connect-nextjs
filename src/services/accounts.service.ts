import { ajax, filterParamsEmptyString } from '../lib/ajax.lib';
import {
  IAccount,
  IIndexAccountsFilter,
} from '../shared/interfaces/accounts.interface';
import { ICoreHttpResponse } from '../shared/interfaces/http-response.interface';

const API_ACCOUNTS_BASE_URL = 'http://localhost:8000/api/accounts';

export const indexAccounts = async (
  filter: IIndexAccountsFilter = {}
): Promise<ICoreHttpResponse<IAccount[]>> => {
  return await ajax.get(`${API_ACCOUNTS_BASE_URL}`, {
    params: filterParamsEmptyString(filter),
  });
};

export const getAccountById = async (
  id: string
): Promise<ICoreHttpResponse<IAccount>> => {
  return await ajax.get(`${API_ACCOUNTS_BASE_URL}/${id}`);
};
