import { DashboardLayout } from 'src/layouts/dashboard.layout';
import { DashboardPageContainer } from 'src/containers/dashboard-page.container';
import { AccountsStudentList } from 'src/modules/accounts';

export default function AccountsStudentPage() {
  return (
    <DashboardPageContainer title="Student Accounts List">
      <AccountsStudentList />
    </DashboardPageContainer>
  );
}

AccountsStudentPage.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
