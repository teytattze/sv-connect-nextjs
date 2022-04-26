import { DashboardPageContainer } from 'src/containers/dashboard-page.container';
import { DashboardLayout } from 'src/layouts/dashboard.layout';
import { MatchStudentsSupervisorsList } from 'src/modules/matches';

export default function MatchStudentsPage() {
  return (
    <DashboardPageContainer title="Match Students and Supervisors">
      <MatchStudentsSupervisorsList />
    </DashboardPageContainer>
  );
}

MatchStudentsPage.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
