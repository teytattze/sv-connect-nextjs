import { DashboardLayout } from '../../../layouts/dashboard.layout';
import { DashboardPageContainer } from '../../../components/dashboard-page-container';
import { AccountDetails } from '../../../modules/accounts';

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
