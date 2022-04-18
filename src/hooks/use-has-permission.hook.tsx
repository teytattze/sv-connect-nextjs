import { useAuth } from '../modules/auth';
import { AccountRole } from '../shared/enums/accounts.enum';

export function useHasPermission(roles: AccountRole[] = []) {
  const { account, isLoading } = useAuth();

  const hasPermission = () => {
    if (account && roles.includes(account.role)) return true;
    return false;
  };

  return { account, isLoading, hasPermission };
}
