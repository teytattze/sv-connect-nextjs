import { AxiosError } from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';
import { getAccountById, indexAccounts } from 'src/services/accounts.service';
import {
  IAccount,
  IIndexAccountsFilter,
} from 'src/shared/interfaces/accounts.interface';
import { ICoreHttpResponse } from 'src/shared/interfaces/http-response.interface';

const INDEX_ACCOUNT_QUERY_KEY = 'indexAccounts';
const GET_ACCOUNT_BY_ID_QUERY_KEY = 'getAccountById';

export function useIndexAccounts(
  filter?: IIndexAccountsFilter,
  options?: Omit<
    UseQueryOptions<
      ICoreHttpResponse<IAccount[]>,
      AxiosError<ICoreHttpResponse<null>>,
      ICoreHttpResponse<IAccount[]>
    >,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery(
    [INDEX_ACCOUNT_QUERY_KEY, filter],
    () => indexAccounts(filter),
    options
  );
}

export function useGetAccountById(
  id: string,
  options?: Omit<
    UseQueryOptions<
      ICoreHttpResponse<IAccount>,
      AxiosError<ICoreHttpResponse<null>>,
      ICoreHttpResponse<IAccount>
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
