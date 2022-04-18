import { InvitationStatus } from '../enums/invitations.enum';
import { Nullable } from '../types/common.type';
import { IBaseDomainEntity } from './base.interface';
import {
  IConnectStudentPayload,
  IConnectSupervisorPayload,
} from './prisma-relations.interface';

export interface IBaseInvitation extends IBaseDomainEntity {
  message: Nullable<string>;
  status: InvitationStatus;
  studentId: Nullable<string>;
  supervisorId: Nullable<string>;
}

export interface IInvitation extends IBaseInvitation {}

export interface ICreateInvitationPayload {
  message: string;
  status?: InvitationStatus;
  student: IConnectStudentPayload;
  supervisor: IConnectSupervisorPayload;
}

export interface IIndexInvitationsFilter {
  studentId?: string;
  supervisorId?: string;
  status?: InvitationStatus;
}

export interface IBulkRejectInvitationsByIdPayload {
  ids: string[];
}
