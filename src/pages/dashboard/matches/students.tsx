import { DashboardPageContainer } from 'src/containers/dashboard-page.container';
import { DashboardLayout } from 'src/layouts/dashboard.layout';
import { MatchStudentsList } from 'src/modules/matches';

export default function MatchStudentsPage() {
  return (
    <DashboardPageContainer title="Match Students">
      <MatchStudentsList />
    </DashboardPageContainer>
  );
}

MatchStudentsPage.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
