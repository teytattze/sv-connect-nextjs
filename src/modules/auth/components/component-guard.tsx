import { useHasPermission } from 'src/hooks/use-has-permission.hook';
import { AccountRole } from 'src/shared/enums/accounts.enum';
import { Nullable } from 'src/shared/types/common.type';

interface IComponentGuardProps {
  children: React.ReactNode;
  roles?: AccountRole[];
  id?: Nullable<string>;
}

export function ComponentGuard({
  children,
  roles = [],
  id = null,
}: IComponentGuardProps) {
  const { hasPermission } = useHasPermission({ roles, id });
  if (!hasPermission()) return null;
  return <>{children}</>;
}
