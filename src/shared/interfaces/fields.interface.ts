import { IBaseDomainEntity } from './base.interface';
import { IConnectSpecializationPayload } from './prisma-relations.interface';
import { IBaseSpecialization } from './specializations.interface';

export interface IBaseField extends IBaseDomainEntity {
  title: string;
}

export interface IField extends IBaseField {
  specializations: IBaseSpecialization[];
}

export interface ICreateFieldPayload {
  title: string;
  specializations: IConnectSpecializationPayload[];
}

export interface IUpdateFieldPayload extends Partial<ICreateFieldPayload> {}

export interface IBulkDeleteFieldsByIdPayload {
  ids: string[];
}
