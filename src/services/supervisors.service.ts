import { ajax, filterParamsEmptyString } from '../lib/ajax.lib';
import { ICoreHttpResponse } from '../shared/interfaces/http-response.interface';
import {
  IIndexSupervisorsFilter,
  ISupervisor,
  IUpdateSupervisorPayload,
} from '../shared/interfaces/supervisors.interface';

const API_SUPERVISORS_BASE_URL = 'http://localhost:8000/api/supervisors';

export const indexSupervisors = async (
  filter: IIndexSupervisorsFilter = {}
): Promise<ICoreHttpResponse<ISupervisor[]>> => {
  return await ajax.get(`${API_SUPERVISORS_BASE_URL}`, {
    params: filterParamsEmptyString(filter),
  });
};

export const getSupervisorById = async (
  id: string
): Promise<ICoreHttpResponse<ISupervisor>> => {
  return await ajax.get(`${API_SUPERVISORS_BASE_URL}/${id}`);
};

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
