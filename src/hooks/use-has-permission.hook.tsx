import { Nullable } from 'src/shared/types/common.type';
import { useAuth } from '../modules/auth';
import { AccountRole } from '../shared/enums/accounts.enum';

interface UseHasPermissionOptions {
  roles?: AccountRole[];
  id?: Nullable<string>;
}

export function useHasPermission({
  roles = [],
  id = null,
}: UseHasPermissionOptions) {
  const { account } = useAuth();
  const hasPermission = () => {
    if (
      account &&
      roles.includes(account.role) &&
      (!id || account.id === id || account.role === AccountRole.ADMIN)
    )
      return true;
    return false;
  };
  return { account, hasPermission };
}
