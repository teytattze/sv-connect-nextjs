import { IStudentWithProject } from './students.interface';
import { ISupervisor } from './supervisors.interface';

export interface IMatch {
  student: IStudentWithProject;
  supervisor: ISupervisor;
  isMatched: boolean;
  isApproved: boolean;
}

export interface IAcceptMatchesPayload {
  matches: IMatch[];
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
