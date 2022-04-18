import { AxiosError } from 'axios';
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from 'react-query';
import {
  bulkDeleteSpecializationsById,
  createSpecialization,
  indexSpecializations,
  updateSpecializationById,
} from '../../services/specializations.service';
import { ICoreHttpResponse } from '../../shared/interfaces/http-response.interface';
import {
  IBulkDeleteSpecializationsByIdPayload,
  ICreateSpecializationPayload,
  ISpecialization,
  IUpdateSpecializationPayload,
} from '../../shared/interfaces/specializations.interface';

export const INDEX_SPECIALIZATIONS_QUERY_KEY = 'indexSpecializations';

export function useIndexSpecializations(
  options?: Omit<
    UseQueryOptions<
      ICoreHttpResponse<ISpecialization[]>,
      AxiosError<ICoreHttpResponse<null>>,
      ICoreHttpResponse<ISpecialization[]>,
      'indexSpecializations'
    >,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery(
    INDEX_SPECIALIZATIONS_QUERY_KEY,
    indexSpecializations,
    options
  );
}

export function useCreateSpecialization(
  options?: Omit<
    UseMutationOptions<
      ICoreHttpResponse<ISpecialization>,
      AxiosError<ICoreHttpResponse<null>>,
      ICreateSpecializationPayload,
      unknown
    >,
    'mutationFn'
  >
) {
  return useMutation((payload) => createSpecialization(payload), options);
}

export function useUpdateSpecialization(
  id: string,
  options?: Omit<
    UseMutationOptions<
      ICoreHttpResponse<ISpecialization>,
      AxiosError<ICoreHttpResponse<null>>,
      IUpdateSpecializationPayload,
      unknown
    >,
    'mutationFn'
  >
) {
  return useMutation(
    (payload) => updateSpecializationById(id, payload),
    options
  );
}

export function useBulkDeleteSpecializationsById(
  options?: Omit<
    UseMutationOptions<
      ICoreHttpResponse<null>,
      AxiosError<ICoreHttpResponse<null>>,
      IBulkDeleteSpecializationsByIdPayload,
      unknown
    >,
    'mutationFn'
  >
) {
  return useMutation(
    (payload) => bulkDeleteSpecializationsById(payload),
    options
  );
}
