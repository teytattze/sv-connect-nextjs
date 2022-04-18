import { Nullable } from '../types/common.type';
import { IBaseDomainEntity } from './base.interface';

export interface IBaseStudent extends IBaseDomainEntity {
  accountId: string;
  supervisorId: Nullable<string>;
}

export interface IStudent extends IBaseStudent {}

export interface IIndexStudentsFilter {
  supervisorId?: string;
  hasSupervisor?: boolean;
}
