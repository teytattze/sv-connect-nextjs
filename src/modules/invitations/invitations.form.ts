import { RegisterOptions } from 'react-hook-form';

export interface ICreateInvitationForm {
  message: string;
  supervisorId: string;
}

export const createInvitationValue: ICreateInvitationForm = {
  message: '',
  supervisorId: '',
};

export const createInvitationValidation: Record<
  keyof ICreateInvitationForm,
  RegisterOptions
> = {
  message: {},
  supervisorId: {},
};
