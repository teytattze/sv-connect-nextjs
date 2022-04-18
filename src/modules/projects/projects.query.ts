import { AxiosError } from 'axios';
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from 'react-query';
import {
  createProject,
  getProjectByStudentId,
  updateProjectById,
} from '../../services/projects.service';
import { ICoreHttpResponse } from '../../shared/interfaces/http-response.interface';
import {
  ICreateProjectPayload,
  IProject,
  IUpdateProjectPayload,
} from '../../shared/interfaces/projects.interface';

export const GET_PROJECT_BY_STUDENT_ID_QUERY_KEY = 'getProjectByStudentId';

export function useCreateProject(
  options?: Omit<
    UseMutationOptions<
      ICoreHttpResponse<IProject>,
      AxiosError<ICoreHttpResponse<null>>,
      ICreateProjectPayload,
      unknown
    >,
    'mutationFn'
  >
) {
  return useMutation((payload) => createProject(payload), options);
}

export function useGetProjectByStudentId(
  studentId: string,
  options?: Omit<
    UseQueryOptions<
      ICoreHttpResponse<IProject>,
      AxiosError<ICoreHttpResponse<null>>,
      ICoreHttpResponse<IProject>,
      string[]
    >,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery(
    [GET_PROJECT_BY_STUDENT_ID_QUERY_KEY, studentId],
    () => getProjectByStudentId(studentId),
    options
  );
}

export function useUpdateProjectById(
  id: string,
  options?: Omit<
    UseMutationOptions<
      ICoreHttpResponse<IProject>,
      AxiosError<ICoreHttpResponse<null>>,
      IUpdateProjectPayload,
      unknown
    >,
    'mutationFn'
  >
) {
  return useMutation((payload) => updateProjectById(id, payload), options);
}
