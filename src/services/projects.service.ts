import { ajax } from '../lib/ajax.lib';
import { ICoreHttpResponse } from '../shared/interfaces/http-response.interface';
import {
  ICreateProjectPayload,
  IProject,
  IUpdateProjectPayload,
} from '../shared/interfaces/projects.interface';

const API_PROJECTS_BASE_URL = 'http://localhost:8000/api/projects';

export const createProject = async (
  payload: ICreateProjectPayload
): Promise<ICoreHttpResponse<IProject>> => {
  return await ajax.post(`${API_PROJECTS_BASE_URL}/create`, payload, {
    withCredentials: true,
  });
};

export const getProjectByStudentId = async (
  studentId: string
): Promise<ICoreHttpResponse<IProject>> => {
  return await ajax.get(`${API_PROJECTS_BASE_URL}/students/${studentId}`);
};

export const updateProjectById = async (
  id: string,
  payload: IUpdateProjectPayload
): Promise<ICoreHttpResponse<IProject>> => {
  return await ajax.put(`${API_PROJECTS_BASE_URL}/update/${id}`, payload);
};
