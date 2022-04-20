import { DashboardPageContainer } from 'src/containers/dashboard-page.container';
import { DashboardLayout } from 'src/layouts/dashboard.layout';
import { IncomingInvitationsList } from 'src/modules/invitations';

export default function IncomingInvitationListPage() {
  return (
    <DashboardPageContainer title="Incoming Invitations List">
      <IncomingInvitationsList />
    </DashboardPageContainer>
  );
}

IncomingInvitationListPage.getLayout = function getLayout(
  page: React.ReactElement
) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
