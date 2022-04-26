import {
  Table,
  TableBody,
  TableBodyRow,
  TableCell,
  TableHead,
  TableHeadRow,
  TableContainer,
  TableEmptyBox,
} from 'src/components/table';
import { formatDateTime } from 'src/lib/datetime.lib';
import { useAuth } from 'src/modules/auth';
import { useGetStudentByAccountId } from 'src/modules/students';
import { useIndexInvitations } from '../invitations.query';

export function OutgoingInvitationList() {
  const { account, isLoading } = useAuth();

  const {
    data: studentRes,
    isLoading: isGetStudentLoading,
    isError: isGetStudentError,
  } = useGetStudentByAccountId(account!.id, {
    enabled: !isLoading && !!account?.id,
  });
  const {
    data: invitationsRes,
    isLoading: isIndexInvitationsLoading,
    isError: isIndexInvitationsError,
  } = useIndexInvitations(
    { studentId: studentRes?.data?.id },
    { enabled: !!studentRes?.data }
  );

  return (
    <TableContainer
      loading={isGetStudentLoading || isIndexInvitationsLoading}
      error={isGetStudentError || isIndexInvitationsError}
    >
      <Table>
        <TableHead>
          <TableHeadRow>
            <TableCell>Supervisor ID</TableCell>
            <TableCell>Message</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Created At</TableCell>
            <TableCell>Updated At</TableCell>
          </TableHeadRow>
        </TableHead>
        <TableBody>
          {invitationsRes?.data?.map((invitation) => (
            <TableBodyRow key={invitation.id}>
              <TableCell component="th" scope="row">
                {invitation.supervisorId}
              </TableCell>
              <TableCell component="th" scope="row">
                {invitation.message || ' - '}
              </TableCell>
              <TableCell component="th" scope="row">
                {invitation.status}
              </TableCell>
              <TableCell component="th" scope="row">
                {formatDateTime(invitation.createdAt)}
              </TableCell>
              <TableCell component="th" scope="row">
                {formatDateTime(invitation.updatedAt)}
              </TableCell>
            </TableBodyRow>
          ))}
        </TableBody>
      </Table>
      {!invitationsRes?.data?.length && <TableEmptyBox />}
    </TableContainer>
  );
}
