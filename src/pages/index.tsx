import { DefaultLayout } from '../layouts/default.layout';
import { LoginForm } from '../modules/auth';

export default function LoginPage() {
  return <LoginForm />;
}

LoginPage.getLayout = function getLayout(page: React.ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>;
};
