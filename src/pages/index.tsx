import { DefaultLayout } from '../layouts/default.layout';
import { LoginForm, PublicGuard } from '../modules/auth';

export default function LoginPage() {
  return <LoginForm />;
}

LoginPage.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <PublicGuard redirectUrl="/dashboard">
      <DefaultLayout>{page}</DefaultLayout>
    </PublicGuard>
  );
};
