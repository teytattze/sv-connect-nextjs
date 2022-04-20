import { DashboardLayout } from 'src/layouts/dashboard.layout';
import { DashboardPageContainer } from 'src/containers/dashboard-page.container';
import { AccountsList } from 'src/modules/accounts';

export default function AccountsListPage() {
  return (
    <DashboardPageContainer title="Accounts List">
      <AccountsList />
    </DashboardPageContainer>
  );
}

AccountsListPage.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
