import { DashboardLayout } from 'src/layouts/dashboard.layout';
import { DashboardPageContainer } from 'src/containers/dashboard-page.container';
import { MyAccountDetails } from 'src/modules/accounts';

export default function MyAccountDetailsPage() {
  return (
    <DashboardPageContainer title="My Details">
      <MyAccountDetails />
    </DashboardPageContainer>
  );
}

MyAccountDetailsPage.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
