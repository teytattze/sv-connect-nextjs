import { DashboardLayout } from '../../../layouts/dashboard.layout';
import { DashboardPageContainer } from '../../../components/dashboard-page-container';
import { IncomingInvitationsList } from '../../../modules/invitations';

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
