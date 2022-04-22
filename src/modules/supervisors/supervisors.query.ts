import { AxiosError } from 'axios';
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from 'react-query';
import {
  getSupervisorByAccountId,
  getSupervisorById,
  indexSupervisors,
  updateSupervisorById,
} from 'src/services/supervisors.service';
import { ICoreHttpResponse } from 'src/shared/interfaces/http-response.interface';
import {
  IIndexSupervisorsFilter,
  ISupervisor,
  IUpdateSupervisorPayload,
} from 'src/shared/interfaces/supervisors.interface';

export const INDEX_SUPERVISORS_QUERY_KEY = 'indexSupervisors';
export const GET_SUPERVISOR_BY_ID_QUERY_KEY = 'getSupervisorById';
export const GET_SUPERVISOR_BY_ACCOUNT_ID_QUERY_KEY =
  'getSupervisorByAccountId';

export function useIndexSupervisors(
  filter?: IIndexSupervisorsFilter,
  options?: Omit<
    UseQueryOptions<
      ICoreHttpResponse<ISupervisor[]>,
      AxiosError<ICoreHttpResponse<null>>,
      ICoreHttpResponse<ISupervisor[]>
    >,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery(
    [GET_SUPERVISOR_BY_ID_QUERY_KEY, filter],
    () => indexSupervisors(filter),
    options
  );
}

export function useGetSupervisorById(
  id: string,
  options?: Omit<
    UseQueryOptions<
      ICoreHttpResponse<ISupervisor>,
      AxiosError<ICoreHttpResponse<null>>,
      ICoreHttpResponse<ISupervisor>,
      string[]
    >,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery(
    [GET_SUPERVISOR_BY_ID_QUERY_KEY, id],
    () => getSupervisorById(id),
    options
  );
}

export function useGetSupervisorByAccountId(
  accountId: string,
  options?: Omit<
    UseQueryOptions<
      ICoreHttpResponse<ISupervisor>,
      AxiosError<ICoreHttpResponse<null>>,
      ICoreHttpResponse<ISupervisor>,
      string[]
    >,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery(
    [GET_SUPERVISOR_BY_ACCOUNT_ID_QUERY_KEY, accountId],
    () => getSupervisorByAccountId(accountId),
    options
  );
}

export function useUpdateSupervisorById(
  id: string,
  options?: Omit<
    UseMutationOptions<
      ICoreHttpResponse<ISupervisor>,
      AxiosError<ICoreHttpResponse<null>>,
      IUpdateSupervisorPayload,
      unknown
    >,
    'mutationFn'
  >
) {
  return useMutation((payload) => updateSupervisorById(id, payload), options);
}
