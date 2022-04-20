import { DashboardLayout } from 'src/layouts/dashboard.layout';
import { DashboardPageContainer } from 'src/containers/dashboard-page.container';
import { StudentsList } from 'src/modules/students';

export default function StudentsListPage() {
  return (
    <DashboardPageContainer title="Students List">
      <StudentsList />
    </DashboardPageContainer>
  );
}

StudentsListPage.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
