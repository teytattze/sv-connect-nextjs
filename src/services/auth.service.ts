import { ajax } from '../lib/ajax.lib';
import { IAccount } from '../shared/interfaces/accounts.interface';
import {
  ILoginPayload,
  IRegisterPayload,
} from '../shared/interfaces/auth.interface';
import { ICoreHttpResponse } from '../shared/interfaces/http-response.interface';

const API_AUTH_BASE_URL = 'http://localhost:8100/api/auth';

export const register = async (
  payload: IRegisterPayload
): Promise<ICoreHttpResponse<IAccount>> => {
  return await ajax.post<ICoreHttpResponse<IAccount>>(
    `${API_AUTH_BASE_URL}/register`,
    payload,
    { withCredentials: true }
  );
};

export const login = async (
  payload: ILoginPayload
): Promise<ICoreHttpResponse<IAccount>> => {
  return await ajax.post<ICoreHttpResponse<IAccount>>(
    `${API_AUTH_BASE_URL}/login`,
    payload,
    { withCredentials: true }
  );
};

export const logout = async (): Promise<ICoreHttpResponse<null>> => {
  return await ajax.post<ICoreHttpResponse<null>>(
    `${API_AUTH_BASE_URL}/logout`,
    null,
    { withCredentials: true }
  );
};

export const validateJwt = async (): Promise<ICoreHttpResponse<IAccount>> => {
  return await ajax.post<ICoreHttpResponse<IAccount>>(
    `${API_AUTH_BASE_URL}/validate/jwt`,
    null,
    { withCredentials: true }
  );
};
