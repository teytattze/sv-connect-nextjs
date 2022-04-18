import { RegisterOptions } from 'react-hook-form';

const NUMBERS_ONLY_REGEX = /^[0-9]+$/;

export interface IUpdateSupervisorForm {
  capacity: number;
  fieldId: string;
  specializationIds: string[];
}

export const updateSupervisorValidation: Record<
  keyof IUpdateSupervisorForm,
  RegisterOptions
> = {
  capacity: {
    required: 'This field is required',
    pattern: {
      value: NUMBERS_ONLY_REGEX,
      message: 'Invalid number',
    },
  },
  fieldId: {
    required: 'This field is required',
  },
  specializationIds: {
    required: 'This field is required',
  },
};
