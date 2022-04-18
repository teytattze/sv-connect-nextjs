import { ajax, filterParamsEmptyString } from '../lib/ajax.lib';
import { ICoreHttpResponse } from '../shared/interfaces/http-response.interface';
import {
  IIndexStudentsFilter,
  IStudent,
} from '../shared/interfaces/students.interface';

const API_STUDENTS_BASE_URL = 'http://localhost:8000/api/students';

export const indexStudents = async (
  filter: IIndexStudentsFilter = {}
): Promise<ICoreHttpResponse<IStudent[]>> => {
  return await ajax.get(`${API_STUDENTS_BASE_URL}`, {
    params: filterParamsEmptyString(filter),
  });
};

export const getStudentById = async (
  id: string
): Promise<ICoreHttpResponse<IStudent>> => {
  return await ajax.get(`${API_STUDENTS_BASE_URL}/${id}`);
};

export const getStudentByAccountId = async (
  accountId: string
): Promise<ICoreHttpResponse<IStudent>> => {
  return await ajax.get(`${API_STUDENTS_BASE_URL}/accounts/${accountId}`);
};
