import { ajax } from '../lib/ajax.lib';
import { ICoreHttpResponse } from '../shared/interfaces/http-response.interface';
import {
  IMatch,
  IMatchSelectedStudentsAndSupervisorsPayload,
  IMatchSelectedStudentsPayload,
  IMatchSingleStudentPayload,
} from '../shared/interfaces/matches.interface';

const API_MATCHES_BASE_URL = 'http://localhost:8000/api/matches';

export const matchSingleStudent = async (
  payload: IMatchSingleStudentPayload
): Promise<ICoreHttpResponse<IMatch>> => {
  return await ajax.post(`${API_MATCHES_BASE_URL}/single`, payload);
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
