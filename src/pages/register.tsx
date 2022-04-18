import { DefaultLayout } from '../layouts/default.layout';
import { RegisterForm } from '../modules/auth';

export default function RegisterPage() {
  return <RegisterForm />;
}

RegisterPage.getLayout = function getLayout(page: React.ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>;
};
