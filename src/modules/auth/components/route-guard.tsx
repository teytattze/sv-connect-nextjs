import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useHasPermission } from 'src/hooks/use-has-permission.hook';
import { AccountRole } from 'src/shared/enums/accounts.enum';

interface IRouteGuardProps {
  children: React.ReactNode;
  roles?: AccountRole[];
  redirectUrl?: string;
}

export function RouteGuard({
  children,
  roles = [],
  redirectUrl = '/',
}: IRouteGuardProps) {
  const { account, isLoading, hasPermission } = useHasPermission(roles);
  const { push } = useRouter();

  useEffect(() => {
    if (!isLoading && !hasPermission()) push(redirectUrl);
  }, [account, isLoading]);

  if (isLoading) return null;
  return <>{children}</>;
}
