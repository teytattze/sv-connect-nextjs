import cookie from 'js-cookie';
import { ACCOUNT_COOKIE_NAME } from '../shared/constants/accounts.const';
import { IAccount } from '../shared/interfaces/accounts.interface';
import { Nullable } from '../shared/types/common.type';

export const getAccountCookie = (): Nullable<IAccount> => {
  const value = cookie.get(ACCOUNT_COOKIE_NAME);
  return value ? JSON.parse(value) : null;
};
