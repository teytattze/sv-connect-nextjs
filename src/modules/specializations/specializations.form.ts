import { RegisterOptions } from 'react-hook-form';

export interface ICreateSpecializationForm {
  title: string;
  fieldIds: string[];
}

export interface IUpdateSpecializationForm {
  title: string;
  fieldIds: string[];
}

export const createSpecializationValue: ICreateSpecializationForm = {
  title: '',
  fieldIds: [],
};

export const createSpecializationValidation: Record<
  keyof ICreateSpecializationForm,
  RegisterOptions
> = {
  title: {
    required: 'This field is required',
    minLength: {
      value: 2,
      message: 'The minimum characters is 2',
    },
  },
  fieldIds: {},
};

export const updateSpecializationValidation: Record<
  keyof IUpdateSpecializationForm,
  RegisterOptions
> = {
  title: {
    required: 'This field is required',
    minLength: {
      value: 2,
      message: 'The minimum characters is 2',
    },
  },
  fieldIds: {},
};
