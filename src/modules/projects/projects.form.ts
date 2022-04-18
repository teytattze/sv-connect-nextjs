import { RegisterOptions } from 'react-hook-form';

export interface ICreateProjectForm {
  title: string;
  summary: string;
  fieldId: string;
  specializationIds: string[];
  studentId: string;
}

export interface IUpdateProjectForm {
  title: string;
  summary: string;
  fieldId: string;
  specializationIds: string[];
  studentId: string;
}

export const createProjectValue: ICreateProjectForm = {
  title: '',
  summary: '',
  fieldId: '',
  specializationIds: [],
  studentId: '',
};

export const createProjectValidation: Record<
  keyof ICreateProjectForm,
  RegisterOptions
> = {
  title: {
    required: 'This field is required',
    minLength: {
      value: 2,
      message: 'The minimum characters is 2',
    },
  },
  summary: {
    required: 'This field is required',
    minLength: {
      value: 10,
      message: 'The minimum characters is 10',
    },
  },
  fieldId: {
    required: 'This field is required',
  },
  specializationIds: {
    required: 'This field is required',
  },
  studentId: {},
};

export const updateProjectValidation: Record<
  keyof IUpdateProjectForm,
  RegisterOptions
> = {
  title: {
    required: 'This field is required',
    minLength: {
      value: 2,
      message: 'The minimum characters is 2',
    },
  },
  summary: {
    required: 'This field is required',
    minLength: {
      value: 10,
      message: 'The minimum characters is 10',
    },
  },
  fieldId: {
    required: 'This field is required',
  },
  specializationIds: {
    required: 'This field is required',
  },
  studentId: {},
};
