import { AccountRole } from 'src/enums/accounts.enum';

export interface ILoginPayload {
  email: string;
  password: string;
}

export interface IRegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: AccountRole;
}
