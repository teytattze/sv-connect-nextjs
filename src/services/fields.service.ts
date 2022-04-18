import { ajax } from '../lib/ajax.lib';
import {
  IBulkDeleteFieldsByIdPayload,
  ICreateFieldPayload,
  IField,
  IUpdateFieldPayload,
} from '../shared/interfaces/fields.interface';
import { ICoreHttpResponse } from '../shared/interfaces/http-response.interface';

const API_FIELDS_BASE_URL = 'http://localhost:8000/api/fields';

export const indexFields = async (): Promise<ICoreHttpResponse<IField[]>> => {
  return await ajax.get(`${API_FIELDS_BASE_URL}`);
};

export const createField = async (
  payload: ICreateFieldPayload
): Promise<ICoreHttpResponse<IField>> => {
  return await ajax.post(`${API_FIELDS_BASE_URL}/create`, payload);
};

export const updateFieldById = async (
  id: string,
  payload: IUpdateFieldPayload
): Promise<ICoreHttpResponse<IField>> => {
  return await ajax.put(`${API_FIELDS_BASE_URL}/update/${id}`, payload);
};

export const bulkDeleteFieldsById = async (
  payload: IBulkDeleteFieldsByIdPayload
): Promise<ICoreHttpResponse<null>> => {
  return await ajax.post(`${API_FIELDS_BASE_URL}/bulk/delete`, payload);
};
