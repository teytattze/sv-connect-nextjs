import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useHasPermission } from 'src/hooks/use-has-permission.hook';
import { AccountRole } from 'src/shared/enums/accounts.enum';
import { Nullable } from 'src/shared/types/common.type';

interface IRouteGuardProps {
  children: React.ReactNode;
  roles?: AccountRole[];
  id?: Nullable<string>;
  redirectUrl?: string;
}

export function RouteGuard({
  children,
  roles = [],
  id = null,
  redirectUrl = '/',
}: IRouteGuardProps) {
  const { account, hasPermission } = useHasPermission({ roles, id });
  const { push } = useRouter();

  useEffect(() => {
    if (!hasPermission()) push(redirectUrl);
  }, [account]);

  if (!hasPermission()) return null;
  return <>{children}</>;
}
