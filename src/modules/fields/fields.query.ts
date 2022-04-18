import { AxiosError } from 'axios';
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from 'react-query';
import {
  bulkDeleteFieldsById,
  createField,
  indexFields,
  updateFieldById,
} from '../../services/fields.service';
import {
  IBulkDeleteFieldsByIdPayload,
  ICreateFieldPayload,
  IField,
  IUpdateFieldPayload,
} from '../../shared/interfaces/fields.interface';
import { ICoreHttpResponse } from '../../shared/interfaces/http-response.interface';

export const INDEX_FIELDS_QUERY_KEY = 'indexFields';

export function useIndexFields(
  options?: Omit<
    UseQueryOptions<
      ICoreHttpResponse<IField[]>,
      AxiosError<ICoreHttpResponse<null>>,
      ICoreHttpResponse<IField[]>,
      'indexFields'
    >,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery(INDEX_FIELDS_QUERY_KEY, indexFields, options);
}

export function useCreateField(
  options?: Omit<
    UseMutationOptions<
      ICoreHttpResponse<IField>,
      AxiosError<ICoreHttpResponse<null>>,
      ICreateFieldPayload,
      unknown
    >,
    'mutationFn'
  >
) {
  return useMutation<
    ICoreHttpResponse<IField>,
    AxiosError<ICoreHttpResponse<null>>,
    ICreateFieldPayload
  >((payload) => createField(payload), options);
}

export function useUpdateFieldById(
  id: string,
  options?: Omit<
    UseMutationOptions<
      ICoreHttpResponse<IField>,
      AxiosError<ICoreHttpResponse<null>>,
      IUpdateFieldPayload,
      unknown
    >,
    'mutationFn'
  >
) {
  return useMutation<
    ICoreHttpResponse<IField>,
    AxiosError<ICoreHttpResponse<null>>,
    IUpdateFieldPayload
  >((payload) => updateFieldById(id, payload), options);
}

export function useBulkDeleteFieldsById(
  options?: Omit<
    UseMutationOptions<
      ICoreHttpResponse<null>,
      AxiosError<ICoreHttpResponse<null>>,
      IBulkDeleteFieldsByIdPayload,
      unknown
    >,
    'mutationFn'
  >
) {
  return useMutation<
    ICoreHttpResponse<null>,
    AxiosError<ICoreHttpResponse<null>>,
    IBulkDeleteFieldsByIdPayload
  >((payload) => bulkDeleteFieldsById(payload), options);
}
