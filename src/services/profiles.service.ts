import { ajax } from '../lib/ajax.lib';
import { ICoreHttpResponse } from '../shared/interfaces/http-response.interface';
import {
  IProfile,
  IUpdateProfilePayload,
} from '../shared/interfaces/profiles.interface';

export const API_PROFILES_BASE_URL = 'http://localhost:8000/api/profiles';

export const getProfileByAccountId = async (
  accountId: string
): Promise<ICoreHttpResponse<IProfile>> => {
  return await ajax.get(`${API_PROFILES_BASE_URL}/accounts/${accountId}`);
};

export const updateProfileById = async (
  id: string,
  payload: IUpdateProfilePayload
) => {
  return await ajax.put(`${API_PROFILES_BASE_URL}/update/${id}`, payload);
};
