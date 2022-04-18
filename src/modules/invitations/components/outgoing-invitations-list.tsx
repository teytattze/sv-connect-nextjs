import {
  Box,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { DateTime } from 'luxon';
import { LoadingWrapper } from '../../../components/loading-wrapper';
import { theme } from '../../../styles/theme.style';
import { useAuth } from '../../auth';
import { useGetStudentByAccountId } from '../../students';
import { useIndexInvitations } from '../invitations.query';

export function OutgoingInvitationList() {
  const { account, isLoading } = useAuth();

  const { data: studentRes, isLoading: isGetStudentLoading } =
    useGetStudentByAccountId(account!.id, {
      enabled: !isLoading && !!account,
    });
  const {
    data: invitationsRes,
    isLoading: isIndexInvitationsLoading,
    isError: isIndexInvitationsError,
  } = useIndexInvitations(
    { studentId: studentRes?.data?.id },
    { enabled: !!studentRes && !!studentRes.data }
  );

  return (
    <LoadingWrapper
      loading={isGetStudentLoading || isIndexInvitationsLoading}
      type="skeleton"
      renderSkeleton={() => (
        <Box sx={{ width: '100%', px: 1 }}>
          <Skeleton animation="wave" height={32} />
          <Skeleton animation="wave" height={32} />
          <Skeleton animation="wave" height={32} />
          <Skeleton animation="wave" height={32} />
          <Skeleton animation="wave" height={32} />
        </Box>
      )}
    >
      <TableContainer component={Paper}>
        <Table stickyHeader sx={{ width: '100%' }}>
          <TableHead>
            <TableRow>
              <TableCell>SupervisorId</TableCell>
              <TableCell>Message</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Updated At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invitationsRes?.data?.map((invitation) => (
              <TableRow
                key={invitation.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
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
                  {DateTime.fromISO(invitation.createdAt).toHTTP()}
                </TableCell>
                <TableCell component="th" scope="row">
                  {DateTime.fromISO(invitation.updatedAt).toHTTP()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {(isIndexInvitationsError ||
          !invitationsRes ||
          invitationsRes?.data?.length === 0) && (
          <Box
            sx={{
              background: theme.palette.grey[100],
              width: '100%',
              textAlign: 'center',
              py: 4,
            }}
          >
            <Typography
              component="h3"
              variant="body2"
              color="text.secondary"
              sx={{
                fontWeight: 'bold',
              }}
            >
              No data available
            </Typography>
          </Box>
        )}
      </TableContainer>
    </LoadingWrapper>
  );
}
