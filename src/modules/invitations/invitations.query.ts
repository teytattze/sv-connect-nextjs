import { AxiosError } from 'axios';
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from 'react-query';
import {
  acceptInvitationById,
  bulkRejectInvitationsById,
  createInvitation,
  indexInvitations,
} from '../../services/invitations.service';
import { ICoreHttpResponse } from '../../shared/interfaces/http-response.interface';
import {
  IBulkRejectInvitationsByIdPayload,
  ICreateInvitationPayload,
  IIndexInvitationsFilter,
  IInvitation,
} from '../../shared/interfaces/invitations.interface';

export const INDEX_INVITATIONS_QUERY_KEY = 'indexInvitations';

export function useIndexInvitations(
  filter?: IIndexInvitationsFilter,
  options?: Omit<
    UseQueryOptions<
      ICoreHttpResponse<IInvitation[]>,
      AxiosError<ICoreHttpResponse<null>>,
      ICoreHttpResponse<IInvitation[]>
    >,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery(
    [INDEX_INVITATIONS_QUERY_KEY, filter],
    () => indexInvitations(filter),
    options
  );
}

export function useCreateInvitation(
  options?: Omit<
    UseMutationOptions<
      ICoreHttpResponse<IInvitation>,
      AxiosError<ICoreHttpResponse<null>>,
      ICreateInvitationPayload
    >,
    'mutationFn'
  >
) {
  return useMutation<
    ICoreHttpResponse<IInvitation>,
    AxiosError<ICoreHttpResponse<null>>,
    ICreateInvitationPayload
  >((payload) => createInvitation(payload), options);
}

export function useBulkRejectInvitationsById(
  options?: Omit<
    UseMutationOptions<
      ICoreHttpResponse<IInvitation[]>,
      AxiosError<ICoreHttpResponse<null>>,
      IBulkRejectInvitationsByIdPayload
    >,
    'mutationFn'
  >
) {
  return useMutation<
    ICoreHttpResponse<IInvitation[]>,
    AxiosError<ICoreHttpResponse<null>>,
    IBulkRejectInvitationsByIdPayload
  >((payload) => bulkRejectInvitationsById(payload), options);
}

export function useAcceptInvitationById(
  options?: Omit<
    UseMutationOptions<
      ICoreHttpResponse<IInvitation>,
      AxiosError<ICoreHttpResponse<null>>,
      string
    >,
    'mutationFn'
  >
) {
  return useMutation<
    ICoreHttpResponse<IInvitation>,
    AxiosError<ICoreHttpResponse<null>>,
    string
  >((id) => acceptInvitationById(id), options);
}
