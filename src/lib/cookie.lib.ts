import cookies from 'js-cookie';
import { ACCOUNT_COOKIE_NAME } from '../shared/constants/accounts.const';
import { IAccount } from '../shared/interfaces/accounts.interface';
import { Nullable } from '../shared/types/common.type';

export const getAccountCookie = (): Nullable<IAccount> => {
  const accountCookie = cookies.get(ACCOUNT_COOKIE_NAME) || null;
  const account = accountCookie ? JSON.parse(accountCookie.slice(2)) : null;
  return account;
};
