import { Nullable } from '../types/common.type';
import { IBaseDomainEntity } from './base.interface';
import { IProject } from './projects.interface';

export interface IBaseStudent extends IBaseDomainEntity {
  accountId: string;
  supervisorId: Nullable<string>;
}

export interface IStudent extends IBaseStudent {}

export interface IStudentWithProject extends IStudent {
  project: IProject;
}

export interface IIndexStudentsFilter {
  hasProject?: boolean;
  hasSupervisor?: boolean;
  supervisorId?: string;
}
