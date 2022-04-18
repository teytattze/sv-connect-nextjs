import { AccountRole } from '../enums/accounts.enum';
import { IBaseDomainEntity } from './base.interface';

export interface IBaseAccount extends IBaseDomainEntity {
  email: string;
  emailVerified: boolean;
  password?: string;
  role: AccountRole;
}

export interface IAccount extends IBaseAccount {}

export interface ICreateAccountPayload {
  email: string;
  emailVerified?: boolean;
  password: string;
  role?: AccountRole;
}
