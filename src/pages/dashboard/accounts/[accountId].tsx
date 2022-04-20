import { DashboardLayout } from 'src/layouts/dashboard.layout';
import { DashboardPageContainer } from 'src/containers/dashboard-page.container';
import { AccountDetails } from 'src/modules/accounts';

export default function AccountDetailsPage() {
  return (
    <DashboardPageContainer title="Accounts Details">
      <AccountDetails />
    </DashboardPageContainer>
  );
}

AccountDetailsPage.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
