import { AxiosError } from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';
import { getAccountById, indexAccounts } from '../../services/accounts.service';
import { IAccount } from '../../shared/interfaces/accounts.interface';
import { ICoreHttpResponse } from '../../shared/interfaces/http-response.interface';

const INDEX_ACCOUNT_QUERY_KEY = 'indexAccounts';
const GET_ACCOUNT_BY_ID_QUERY_KEY = 'getAccountById';

export function useIndexAccounts(
  options?: Omit<
    UseQueryOptions<
      ICoreHttpResponse<IAccount[]>,
      AxiosError<ICoreHttpResponse<null>>,
      ICoreHttpResponse<IAccount[]>,
      'indexAccounts'
    >,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery(INDEX_ACCOUNT_QUERY_KEY, indexAccounts, options);
}

export function useGetAccountById(
  id: string,
  options?: Omit<
    UseQueryOptions<
      ICoreHttpResponse<IAccount>,
      AxiosError<ICoreHttpResponse<null>>,
      ICoreHttpResponse<IAccount>,
      string[]
    >,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery(
    [GET_ACCOUNT_BY_ID_QUERY_KEY, id],
    () => getAccountById(id),
    options
  );
}
