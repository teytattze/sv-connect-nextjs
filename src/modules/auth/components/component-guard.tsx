import { useHasPermission } from 'src/hooks/use-has-permission.hook';
import { AccountRole } from 'src/shared/enums/accounts.enum';

interface IComponentGuardProps {
  children: React.ReactNode;
  roles?: AccountRole[];
}

export function ComponentGuard({ children, roles = [] }: IComponentGuardProps) {
  const { isLoading, hasPermission } = useHasPermission(roles);
  if (isLoading || !hasPermission()) return null;
  return <>{children}</>;
}
