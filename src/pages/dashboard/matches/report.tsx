import { DashboardPageContainer } from 'src/containers/dashboard-page.container';
import { DashboardLayout } from 'src/layouts/dashboard.layout';
import { MatchResultsList } from 'src/modules/matches';

export default function MatchResultsListPage() {
  return (
    <DashboardPageContainer title="Match Results">
      <MatchResultsList />
    </DashboardPageContainer>
  );
}

MatchResultsListPage.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
