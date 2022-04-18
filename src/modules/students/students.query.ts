import { AxiosError } from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';
import {
  getStudentById,
  getStudentByAccountId,
  indexStudents,
} from '../../services/students.service';
import { ICoreHttpResponse } from '../../shared/interfaces/http-response.interface';
import {
  IIndexStudentsFilter,
  IStudent,
} from '../../shared/interfaces/students.interface';

export const INDEX_STUDENTS_QUERY_KEY = 'indexStudents';
export const GET_STUDENT_BY_ID_QUERY_KEY = 'getStudentById';
export const GET_STUDENT_BY_ACCUONT_ID_QUERY_KEY = 'getStudentByAccountId';

export function useIndexStudents(
  filter?: IIndexStudentsFilter,
  options?: Omit<
    UseQueryOptions<
      ICoreHttpResponse<IStudent[]>,
      AxiosError<ICoreHttpResponse<null>>,
      ICoreHttpResponse<IStudent[]>
    >,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery(
    [INDEX_STUDENTS_QUERY_KEY, filter],
    () => indexStudents(filter),
    options
  );
}

export function useGetStudentById(
  id: string,
  options?: Omit<
    UseQueryOptions<
      ICoreHttpResponse<IStudent>,
      AxiosError<ICoreHttpResponse<null>>,
      ICoreHttpResponse<IStudent>
    >,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery(
    [GET_STUDENT_BY_ID_QUERY_KEY, id],
    () => getStudentById(id),
    options
  );
}

export function useGetStudentByAccountId(
  accountId: string,
  options?: Omit<
    UseQueryOptions<
      ICoreHttpResponse<IStudent>,
      AxiosError<ICoreHttpResponse<null>>,
      ICoreHttpResponse<IStudent>
    >,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery(
    [GET_STUDENT_BY_ACCUONT_ID_QUERY_KEY, accountId],
    () => getStudentByAccountId(accountId),
    options
  );
}
