import { IStudentWithProject } from './students.interface';
import { ISupervisor } from './supervisors.interface';

export interface IMatch {
  student: IStudentWithProject;
  supervisor: ISupervisor;
  isMatch: boolean;
  isApproved: boolean;
}

export interface IMatchSingleStudentPayload {
  studentId: string;
}

export interface IMatchSelectedStudentsPayload {
  studentIds: string[];
}

export interface IMatchSelectedStudentsAndSupervisorsPayload {
  studentIds: string[];
  supervisorIds: string[];
}
