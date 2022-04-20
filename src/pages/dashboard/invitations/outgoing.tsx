import { DashboardPageContainer } from 'src/containers/dashboard-page.container';
import { DashboardLayout } from 'src/layouts/dashboard.layout';
import { OutgoingInvitationList } from 'src/modules/invitations';

export default function OutgoingInvitationListPage() {
  return (
    <DashboardPageContainer title="Outgoing Invitations List">
      <OutgoingInvitationList />
    </DashboardPageContainer>
  );
}

OutgoingInvitationListPage.getLayout = function getLayout(
  page: React.ReactElement
) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
