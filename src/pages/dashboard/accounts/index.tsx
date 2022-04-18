import { DashboardLayout } from '../../../layouts/dashboard.layout';
import { DashboardPageContainer } from '../../../components/dashboard-page-container';
import { AccountsList } from '../../../modules/accounts';

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
