import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from '../auth.provider';

interface IPublicGuardProps {
  children: React.ReactNode;
  redirectUrl: string;
}

export function PublicGuard({ children, redirectUrl }: IPublicGuardProps) {
  const { account, isLoading } = useAuth();
  const { push } = useRouter();

  useEffect(() => {
    if (isLoading) return;
    if (!!account) push(redirectUrl);
  }, [account, isLoading]);

  if (isLoading || !!account) return null;
  return <>{children}</>;
}
