import { ajax, filterParamsEmptyString } from '../lib/ajax.lib';
import { ICoreHttpResponse } from '../shared/interfaces/http-response.interface';
import {
  IBulkRejectInvitationsByIdPayload,
  ICreateInvitationPayload,
  IIndexInvitationsFilter,
  IInvitation,
} from '../shared/interfaces/invitations.interface';

const API_INVITATIONS_BASE_URL = 'http://localhost:8000/api/invitations';

export const indexInvitations = async (
  filter: IIndexInvitationsFilter = {}
): Promise<ICoreHttpResponse<IInvitation[]>> => {
  return await ajax.get(`${API_INVITATIONS_BASE_URL}`, {
    params: filterParamsEmptyString(filter),
  });
};

export const createInvitation = async (
  payload: ICreateInvitationPayload
): Promise<ICoreHttpResponse<IInvitation>> => {
  return await ajax.post(`${API_INVITATIONS_BASE_URL}/create`, payload);
};

export const bulkRejectInvitationsById = async (
  payload: IBulkRejectInvitationsByIdPayload
): Promise<ICoreHttpResponse<IInvitation[]>> => {
  return await ajax.put(`${API_INVITATIONS_BASE_URL}/bulk/reject`, payload);
};

export const acceptInvitationById = async (
  id: string
): Promise<ICoreHttpResponse<IInvitation>> => {
  return await ajax.put(`${API_INVITATIONS_BASE_URL}/accept/${id}`);
};
