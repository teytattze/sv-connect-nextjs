import { AxiosError } from 'axios';
import { useMutation, UseMutationOptions } from 'react-query';
import {
  login,
  logout,
  register,
  validateJwt,
} from '../../services/auth.service';
import { IAccount } from '../../shared/interfaces/accounts.interface';
import {
  ILoginPayload,
  IRegisterPayload,
} from '../../shared/interfaces/auth.interface';
import { ICoreHttpResponse } from '../../shared/interfaces/http-response.interface';

export const useRegister = (
  options?: Omit<
    UseMutationOptions<
      ICoreHttpResponse<IAccount>,
      AxiosError<ICoreHttpResponse<null>>,
      IRegisterPayload
    >,
    'mutationKey' | 'mutationFn'
  >
) => {
  return useMutation<
    ICoreHttpResponse<IAccount>,
    AxiosError<ICoreHttpResponse<null>>,
    IRegisterPayload
  >((payload) => register(payload), options);
};

export const useLogin = (
  options?: Omit<
    UseMutationOptions<
      ICoreHttpResponse<IAccount>,
      AxiosError<ICoreHttpResponse<null>>,
      ILoginPayload
    >,
    'mutationKey' | 'mutationFn'
  >
) => {
  return useMutation<
    ICoreHttpResponse<IAccount>,
    AxiosError<ICoreHttpResponse<null>>,
    ILoginPayload
  >((payload) => login(payload), options);
};

export const useLogout = (
  options?: Omit<
    UseMutationOptions<
      ICoreHttpResponse<null>,
      AxiosError<ICoreHttpResponse<null>>
    >,
    'mutationKey' | 'mutationFn'
  >
) => {
  return useMutation<
    ICoreHttpResponse<null>,
    AxiosError<ICoreHttpResponse<null>>
  >(logout, options);
};

export const useValidateJwt = (
  options?: Omit<
    UseMutationOptions<
      ICoreHttpResponse<IAccount>,
      AxiosError<ICoreHttpResponse<null>>
    >,
    'mutationKey' | 'mutationFn'
  >
) => {
  return useMutation<
    ICoreHttpResponse<IAccount>,
    AxiosError<ICoreHttpResponse<null>>
  >(validateJwt, options);
};
