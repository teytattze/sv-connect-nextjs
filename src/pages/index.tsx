import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { DefaultLayout } from '../layouts/default.layout';
import { LoginForm, useAuth } from '../modules/auth';

export default function LoginPage() {
  const { account } = useAuth();
  const { push } = useRouter();

  useEffect(() => {
    if (account) push('/dashboard');
  }, []);

  return <LoginForm />;
}

LoginPage.getLayout = function getLayout(page: React.ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>;
};
