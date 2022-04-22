import { DashboardLayout } from 'src/layouts/dashboard.layout';
import { DashboardPageContainer } from 'src/containers/dashboard-page.container';
import { AccountsSupervisorList } from 'src/modules/accounts';

export default function AccountsSupervisorPage() {
  return (
    <DashboardPageContainer title="Supervisor Accounts List">
      <AccountsSupervisorList />
    </DashboardPageContainer>
  );
}

AccountsSupervisorPage.getLayout = function getLayout(
  page: React.ReactElement
) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
