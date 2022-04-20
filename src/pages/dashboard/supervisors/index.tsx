import { DashboardLayout } from 'src/layouts/dashboard.layout';
import { DashboardPageContainer } from 'src/containers/dashboard-page.container';
import { SupervisorsList } from 'src/modules/supervisors';

export default function SupervisorsListPage() {
  return (
    <DashboardPageContainer title="Supervisors List">
      <SupervisorsList />
    </DashboardPageContainer>
  );
}

SupervisorsListPage.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
