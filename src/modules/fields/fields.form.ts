import { RegisterOptions } from 'react-hook-form';

export interface ICreateFieldForm {
  title: string;
  specializationIds: string[];
}

export interface IUpdateFieldForm {
  title: string;
  specializationIds: string[];
}

export const createFieldValue: ICreateFieldForm = {
  title: '',
  specializationIds: [],
};

export const createFieldValidation: Record<
  keyof ICreateFieldForm,
  RegisterOptions
> = {
  title: {
    required: 'This field is required',
    minLength: {
      value: 2,
      message: 'The minimum characters is 2',
    },
  },
  specializationIds: {},
};

export const updateFieldValidation: Record<
  keyof IUpdateFieldForm,
  RegisterOptions
> = {
  title: {
    required: 'This field is required',
    minLength: {
      value: 2,
      message: 'The minimum characters is 2',
    },
  },
  specializationIds: {},
};
