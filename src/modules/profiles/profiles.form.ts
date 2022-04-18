import { RegisterOptions } from 'react-hook-form';

export interface IUpdateProfileForm {
  firstName: string;
  lastName: string;
  headline: string;
  summary: string;
}

export const updateProfileValidation: Record<
  keyof IUpdateProfileForm,
  RegisterOptions
> = {
  firstName: {
    required: 'This field is required',
    minLength: {
      value: 2,
      message: 'The minimum characters is 2',
    },
  },
  lastName: {
    required: 'This field is required',
    minLength: {
      value: 2,
      message: 'The minimum characters is 2',
    },
  },
  headline: {},
  summary: {},
};
