import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { DefaultLayout } from '../layouts/default.layout';
import { RegisterForm, useAuth } from '../modules/auth';

export default function RegisterPage() {
  const { account } = useAuth();
  const { push } = useRouter();

  useEffect(() => {
    if (account) push('/dashboard');
  }, []);

  return <RegisterForm />;
}

RegisterPage.getLayout = function getLayout(page: React.ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>;
};
