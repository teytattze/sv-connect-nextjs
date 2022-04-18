import { IBaseDomainEntity } from './base.interface';
import { IBaseField } from './fields.interface';
import { IConnectFieldPayload } from './prisma-relations.interface';

export interface IBaseSpecialization extends IBaseDomainEntity {
  title: string;
}

export interface ISpecialization extends IBaseSpecialization {
  fields: IBaseField[];
}

export interface ICreateSpecializationPayload {
  title: string;
  fields: IConnectFieldPayload[];
}

export interface IUpdateSpecializationPayload
  extends Partial<ICreateSpecializationPayload> {}

export interface IBulkDeleteSpecializationsByIdPayload {
  ids: string[];
}
