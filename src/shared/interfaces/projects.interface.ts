import { Nullable } from '../types/common.type';
import { IBaseDomainEntity } from './base.interface';
import { IBaseField } from './fields.interface';
import {
  IConnectFieldPayload,
  IConnectSpecializationPayload,
  IConnectStudentPayload,
} from './prisma-relations.interface';
import { IBaseSpecialization } from './specializations.interface';

export interface IBaseProject extends IBaseDomainEntity {
  title: string;
  summary: string;
  fieldId: Nullable<string>;
  studentId: string;
}

export interface IProject extends Omit<IBaseProject, 'fieldId'> {
  field: IBaseField;
  specializations: IBaseSpecialization[];
}

export interface ICreateProjectPayload {
  title: string;
  summary: string;
  field: IConnectFieldPayload;
  specializations: IConnectSpecializationPayload[];
  student: IConnectStudentPayload;
}

export interface IUpdateProjectPayload extends Partial<ICreateProjectPayload> {}
