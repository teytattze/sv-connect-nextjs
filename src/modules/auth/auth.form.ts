import { RegisterOptions } from 'react-hook-form';
import { AccountRole } from '../../shared/enums/accounts.enum';
import {
  ILoginPayload,
  IRegisterPayload,
} from '../../shared/interfaces/auth.interface';

const emailReg =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export const loginValue: ILoginPayload = {
  email: '',
  password: '',
};

export const loginValidation: Record<keyof ILoginPayload, RegisterOptions> = {
  email: {
    required: 'This field is required',
    pattern: {
      value: emailReg,
      message: 'Invalid email address',
    },
  },
  password: {
    required: 'This field is required',
  },
};

export const registerValue: IRegisterPayload = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  role: AccountRole.STUDENT,
};

export const registerValidation: Record<
  IRegisterPayload['email' | 'password'],
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
  email: {
    required: 'This field is required',
    pattern: {
      value: emailReg,
      message: 'Invalid email address',
    },
  },
  password: {
    required: 'This field is required',
    minLength: {
      value: 10,
      message: 'The minimum characters is 10',
    },
  },
};
