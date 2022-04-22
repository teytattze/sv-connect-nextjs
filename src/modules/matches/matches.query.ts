import { AxiosError } from 'axios';
import { useMutation, UseMutationOptions } from 'react-query';
import { IStudent } from 'src/shared/interfaces/students.interface';
import {
  acceptMatches,
  matchSelectedStudents,
  matchSelectedStudentsAndSupervisors,
  matchSingleStudent,
} from '../../services/matches.service';
import { ICoreHttpResponse } from '../../shared/interfaces/http-response.interface';
import {
  IAcceptMatchesPayload,
  IMatch,
  IMatchSelectedStudentsAndSupervisorsPayload,
  IMatchSelectedStudentsPayload,
  IMatchSingleStudentPayload,
} from '../../shared/interfaces/matches.interface';

export function useAcceptMatches(
  options?: Omit<
    UseMutationOptions<
      ICoreHttpResponse<IStudent[]>,
      AxiosError<ICoreHttpResponse<null>>,
      IAcceptMatchesPayload
    >,
    'mutationFn'
  >
) {
  return useMutation((payload) => acceptMatches(payload), options);
}

export function useMatchSingleStudent(
  options?: Omit<
    UseMutationOptions<
      ICoreHttpResponse<IMatch>,
      AxiosError<ICoreHttpResponse<null>>,
      IMatchSingleStudentPayload
    >,
    'mutationFn'
  >
) {
  return useMutation((payload) => matchSingleStudent(payload), options);
}

export function useMatchSelectedStudents(
  options?: Omit<
    UseMutationOptions<
      ICoreHttpResponse<IMatch[]>,
      AxiosError<ICoreHttpResponse<null>>,
      IMatchSelectedStudentsPayload
    >,
    'mutationFn'
  >
) {
  return useMutation((payload) => matchSelectedStudents(payload), options);
}

export function useMatchSelectedStudentsAndSupervisors(
  options?: Omit<
    UseMutationOptions<
      ICoreHttpResponse<IMatch[]>,
      AxiosError<ICoreHttpResponse<null>>,
      IMatchSelectedStudentsAndSupervisorsPayload
    >,
    'mutationFn'
  >
) {
  return useMutation(
    (payload) => matchSelectedStudentsAndSupervisors(payload),
    options
  );
}
