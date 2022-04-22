import { Nullable } from '../types/common.type';
import { IBaseDomainEntity } from './base.interface';
import { IBaseField } from './fields.interface';
import {
  IConnectAccountPayload,
  IConnectFieldPayload,
  IConnectSpecializationPayload,
} from './prisma-relations.interface';
import { IBaseSpecialization } from './specializations.interface';

export interface IBaseSupervisor extends IBaseDomainEntity {
  capacity: number;
  accountId: string;
  fieldId: Nullable<string>;
}

export interface ISupervisor extends Omit<IBaseSupervisor, 'fieldId'> {
  field: Nullable<IBaseField>;
  specializations: IBaseSpecialization[];
}

export interface IIndexSupervisorsFilter {
  fieldId?: string;
  maxCapacity?: number;
  minCapacity?: number;
}

export interface ICreateSupervisorPayload {
  capacity?: number;
  account: IConnectAccountPayload;
  field: IConnectFieldPayload;
  specializations: IConnectSpecializationPayload[];
}

export interface IUpdateSupervisorPayload
  extends Partial<ICreateSupervisorPayload> {}
