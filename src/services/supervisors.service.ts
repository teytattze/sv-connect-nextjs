import { ajax } from '../lib/ajax.lib';
import { ICoreHttpResponse } from '../shared/interfaces/http-response.interface';
import {
  ISupervisor,
  IUpdateSupervisorPayload,
} from '../shared/interfaces/supervisors.interface';

const API_SUPERVISORS_BASE_URL = 'http://localhost:8000/api/supervisors';

export const getSupervisorByAccountId = async (
  accountId: string
): Promise<ICoreHttpResponse<ISupervisor>> => {
  return await ajax.get(`${API_SUPERVISORS_BASE_URL}/accounts/${accountId}`);
};

export const updateSupervisorById = async (
  id: string,
  payload: IUpdateSupervisorPayload
): Promise<ICoreHttpResponse<ISupervisor>> => {
  return await ajax.put(`${API_SUPERVISORS_BASE_URL}/update/${id}`, payload);
};
