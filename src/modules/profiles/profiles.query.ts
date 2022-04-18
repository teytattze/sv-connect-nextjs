import { AxiosError } from 'axios';
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from 'react-query';
import {
  getProfileByAccountId,
  updateProfileById,
} from '../../services/profiles.service';
import { ICoreHttpResponse } from '../../shared/interfaces/http-response.interface';
import {
  IProfile,
  IUpdateProfilePayload,
} from '../../shared/interfaces/profiles.interface';

export const GET_PROFILE_BY_ACCOUNT_ID_QUERY_KEY = 'getProfileByAccountId';

export function useGetProfileByAccountId(
  accountId: string,
  options?: Omit<
    UseQueryOptions<
      ICoreHttpResponse<IProfile>,
      AxiosError<ICoreHttpResponse<null>>,
      ICoreHttpResponse<IProfile>,
      string[]
    >,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery(
    [GET_PROFILE_BY_ACCOUNT_ID_QUERY_KEY, accountId],
    () => getProfileByAccountId(accountId),
    options
  );
}

export function useUpdateProfileById(
  id: string,
  options?: Omit<
    UseMutationOptions<
      ICoreHttpResponse<IProfile>,
      AxiosError<ICoreHttpResponse<null>>,
      IUpdateProfilePayload,
      unknown
    >,
    'mutationFn'
  >
) {
  return useMutation<
    ICoreHttpResponse<IProfile>,
    AxiosError<ICoreHttpResponse<null>>,
    IUpdateProfilePayload
  >((payload) => updateProfileById(id, payload), options);
}
