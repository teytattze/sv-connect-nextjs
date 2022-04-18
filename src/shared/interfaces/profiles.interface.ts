import { Nullable } from '../types/common.type';
import { IBaseDomainEntity } from './base.interface';

export interface IBaseProfile extends IBaseDomainEntity {
  firstName: string;
  lastName: string;
  headline: Nullable<string>;
  summary: Nullable<string>;
  pictureUrl: Nullable<string>;
  backgroundUrl: Nullable<string>;
  accountId: string;
}

export interface IProfile extends IBaseProfile {}

export interface ICreateProfilePayload {
  firstName: string;
  lastName: string;
  headline?: Nullable<string>;
  summary?: Nullable<string>;
  pictureUrl?: Nullable<string>;
  backgroundUrl?: Nullable<string>;
  account: { id: string };
}

export interface IUpdateProfilePayload extends Partial<ICreateProfilePayload> {}
