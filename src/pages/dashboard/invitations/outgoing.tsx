import { DashboardLayout } from '../../../layouts/dashboard.layout';
import { DashboardPageContainer } from '../../../components/dashboard-page-container';
import { OutgoingInvitationList } from '../../../modules/invitations';

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
