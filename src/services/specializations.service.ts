import { ajax } from '../lib/ajax.lib';
import { ICoreHttpResponse } from '../shared/interfaces/http-response.interface';
import {
  IBulkDeleteSpecializationsByIdPayload,
  ICreateSpecializationPayload,
  ISpecialization,
  IUpdateSpecializationPayload,
} from '../shared/interfaces/specializations.interface';

const API_SPECIALIZATIONS_BASE_URL =
  'http://localhost:8000/api/specializations';

export const indexSpecializations = async (): Promise<
  ICoreHttpResponse<ISpecialization[]>
> => {
  return await ajax.get(`${API_SPECIALIZATIONS_BASE_URL}`);
};

export const createSpecialization = async (
  payload: ICreateSpecializationPayload
): Promise<ICoreHttpResponse<ISpecialization>> => {
  return await ajax.post(`${API_SPECIALIZATIONS_BASE_URL}/create`, payload);
};

export const updateSpecializationById = async (
  id: string,
  payload: IUpdateSpecializationPayload
) => {
  return await ajax.put(
    `${API_SPECIALIZATIONS_BASE_URL}/update/${id}`,
    payload
  );
};

export const bulkDeleteSpecializationsById = async (
  payload: IBulkDeleteSpecializationsByIdPayload
): Promise<ICoreHttpResponse<null>> => {
  return await ajax.post(
    `${API_SPECIALIZATIONS_BASE_URL}/bulk/delete`,
    payload
  );
};
