import { AxiosError } from 'axios';
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from 'react-query';
import {
  getSupervisorByAccountId,
  updateSupervisorById,
} from '../../services/supervisors.service';
import { ICoreHttpResponse } from '../../shared/interfaces/http-response.interface';
import {
  ISupervisor,
  IUpdateSupervisorPayload,
} from '../../shared/interfaces/supervisors.interface';

export const GET_SUPERVISOR_BY_ACCUONT_ID_QUERY_KEY =
  'getSupervisorByAccountId';

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
    [GET_SUPERVISOR_BY_ACCUONT_ID_QUERY_KEY, accountId],
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
  return useMutation<
    ICoreHttpResponse<ISupervisor>,
    AxiosError<ICoreHttpResponse<null>>,
    IUpdateSupervisorPayload
  >((payload) => updateSupervisorById(id, payload), options);
}
