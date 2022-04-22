import { IStudent } from 'src/shared/interfaces/students.interface';
import { ajax } from '../lib/ajax.lib';
import { ICoreHttpResponse } from '../shared/interfaces/http-response.interface';
import {
  IAcceptMatchesPayload,
  IMatch,
  IMatchSelectedStudentsAndSupervisorsPayload,
  IMatchSelectedStudentsPayload,
  IMatchSingleStudentPayload,
} from '../shared/interfaces/matches.interface';

const API_MATCHES_BASE_URL = 'http://localhost:8000/api/matches';

export const acceptMatches = async (
  payload: IAcceptMatchesPayload
): Promise<ICoreHttpResponse<IStudent[]>> => {
  return await ajax.post(`${API_MATCHES_BASE_URL}/accept`, payload);
};

export const matchSingleStudent = async (
  payload: IMatchSingleStudentPayload
): Promise<ICoreHttpResponse<IMatch>> => {
  return await ajax.post(`${API_MATCHES_BASE_URL}/single/student`, payload);
};

export const matchSelectedStudents = async (
  payload: IMatchSelectedStudentsPayload
): Promise<ICoreHttpResponse<IMatch[]>> => {
  return await ajax.post(`${API_MATCHES_BASE_URL}/selected/students`, payload);
};

export const matchSelectedStudentsAndSupervisors = async (
  payload: IMatchSelectedStudentsAndSupervisorsPayload
): Promise<ICoreHttpResponse<IMatch[]>> => {
  return await ajax.post(
    `${API_MATCHES_BASE_URL}/selected/students/selected/supervisors`,
    payload
  );
};
