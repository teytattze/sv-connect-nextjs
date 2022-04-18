import {
  Alert,
  Box,
  Button,
  Checkbox,
  Collapse,
  Grid,
  IconButton,
  Paper,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import { DateTime } from 'luxon';
import { LoadingWrapper } from '../../../components/loading-wrapper';
import { theme } from '../../../styles/theme.style';
import { useAuth } from '../../auth';
import { useGetSupervisorByAccountId } from '../../supervisors';
import {
  INDEX_INVITATIONS_QUERY_KEY,
  useAcceptInvitationById,
  useBulkRejectInvitationsById,
  useIndexInvitations,
} from '../invitations.query';
import { IInvitation } from '../../../shared/interfaces/invitations.interface';
import { useGetProjectByStudentId } from '../../projects';
import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { useQueryClient } from 'react-query';
import { InvitationStatus } from '../../../shared/enums/invitations.enum';

export function IncomingInvitationsList() {
  const { account, isLoading } = useAuth();

  const { data: supervisorRes, isLoading: isGetSupervisorLoading } =
    useGetSupervisorByAccountId(account!.id, {
      enabled: !isLoading && !!account,
    });

  const {
    data: invitationsRes,
    isLoading: isIndexInvitationsLoading,
    isError: isIndexInvitationsError,
  } = useIndexInvitations(
    {
      supervisorId: supervisorRes?.data?.id,
      status: InvitationStatus.PENDING,
    },
    { enabled: !!supervisorRes && !!supervisorRes.data }
  );

  const [selected, setSelected] = useState<string[]>([]);

  const handleResetSelected = () => {
    setSelected([]);
  };

  const handleAllCheckboxToggle = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.checked) {
      const selectedArr = invitationsRes?.data?.map(
        (invitation) => invitation.id
      );
      setSelected(selectedArr || []);
      return;
    }
    setSelected([]);
  };

  const handleAllInterminateValue = () => {
    const selLen = selected.length;
    const resLen = invitationsRes?.data?.length || 0;
    return selLen > 0 && selLen < resLen;
  };

  const handleAllCheckboxValue = () => {
    const selLen = selected.length;
    const resLen = invitationsRes?.data?.length || 0;
    return resLen > 0 && selLen === resLen;
  };

  const handleCheckboxToggle = (id: string) => {
    const idx = selected.indexOf(id);
    if (idx >= 0) {
      const newSelected = [
        ...selected.slice(0, idx),
        ...selected.slice(idx + 1),
      ];
      setSelected(newSelected);
      return;
    }
    setSelected((prev) => [...prev, id]);
  };

  const handleCheckboxValue = (id: string) => {
    const idx = selected.indexOf(id);
    return idx >= 0;
  };

  return (
    <LoadingWrapper
      loading={isGetSupervisorLoading || isIndexInvitationsLoading}
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
      {!supervisorRes ||
      !supervisorRes.data ||
      !invitationsRes ||
      !invitationsRes.data ? (
        <Alert severity="error">There is something wrong</Alert>
      ) : (
        <TableContainer component={Paper}>
          <InvitationsListActionsBar
            supervisorId={supervisorRes?.data?.id}
            selected={selected}
            resetSelected={handleResetSelected}
          />
          <Table stickyHeader sx={{ width: '100%' }}>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox"></TableCell>
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    indeterminate={handleAllInterminateValue()}
                    checked={handleAllCheckboxValue()}
                    onChange={handleAllCheckboxToggle}
                  />
                </TableCell>
                <TableCell>StudentId</TableCell>
                <TableCell>Message</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Updated At</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {invitationsRes?.data?.map((invitation) => (
                <IncomingInvitationsListRow
                  key={invitation.id}
                  invitation={invitation}
                  handleCheckboxToggle={handleCheckboxToggle}
                  handleCheckboxValue={handleCheckboxValue}
                />
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
      )}
    </LoadingWrapper>
  );
}

interface IIncomingInvitationsListRowProps {
  invitation: IInvitation;
  handleCheckboxValue: (id: string) => boolean;
  handleCheckboxToggle: (id: string) => void;
}

export function IncomingInvitationsListRow({
  invitation,
  handleCheckboxValue,
  handleCheckboxToggle,
}: IIncomingInvitationsListRowProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { data: projectRes, isLoading: isGetProjectLoading } =
    useGetProjectByStudentId(invitation.studentId!, {
      enabled: isOpen && !!invitation && !!invitation.studentId,
    });

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <TableCell padding="checkbox" sx={{ textAlign: 'center' }}>
          <IconButton size="small" onClick={handleToggle}>
            {isOpen ? (
              <KeyboardArrowUpRoundedIcon />
            ) : (
              <KeyboardArrowDownRoundedIcon />
            )}
          </IconButton>
        </TableCell>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            checked={handleCheckboxValue(invitation.id)}
            onChange={() => handleCheckboxToggle(invitation.id)}
          />
        </TableCell>
        <TableCell component="th" scope="row">
          {invitation.studentId}
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
      <TableRow>
        <TableCell sx={{ p: 0 }} colSpan={7}>
          <Collapse in={isOpen} timeout="auto" unmountOnExit>
            <Stack sx={{ px: 8, py: 1 }} spacing={1}>
              <Typography variant="h6" component="h3">
                Project
              </Typography>
              <Grid container rowSpacing={0.5}>
                <Grid item xs={3}>
                  <Typography
                    color="text.secondary"
                    variant="body2"
                    sx={{
                      fontWeight: 500,
                      textTransform: 'uppercase',
                    }}
                  >
                    Title
                  </Typography>
                </Grid>
                <Grid item xs={9}>
                  <Typography>{projectRes?.data?.title || ' - '}</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography
                    color="text.secondary"
                    variant="body2"
                    sx={{
                      fontWeight: 500,
                      textTransform: 'uppercase',
                    }}
                  >
                    Summary
                  </Typography>
                </Grid>
                <Grid item xs={9}>
                  <Typography>{projectRes?.data?.summary || ' - '}</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography
                    color="text.secondary"
                    variant="body2"
                    sx={{
                      fontWeight: 500,
                      textTransform: 'uppercase',
                    }}
                  >
                    Field
                  </Typography>
                </Grid>
                <Grid item xs={9}>
                  <Typography>
                    {projectRes?.data?.field.title || ' - '}
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography
                    color="text.secondary"
                    variant="body2"
                    sx={{
                      fontWeight: 500,
                      textTransform: 'uppercase',
                    }}
                  >
                    Specializations
                  </Typography>
                </Grid>
                <Grid item xs={9}>
                  {projectRes?.data?.specializations.map((specialization) => (
                    <Typography>- {specialization.title || ' - '}</Typography>
                  ))}
                </Grid>
              </Grid>
            </Stack>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

interface IFieldsListActionBarProps {
  supervisorId: string;
  selected: string[];
  resetSelected: () => void;
}

export function InvitationsListActionsBar({
  supervisorId,
  selected,
  resetSelected,
}: IFieldsListActionBarProps) {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const { mutate: bulkDeleteFields } = useBulkRejectInvitationsById({
    onSuccess: () => {
      queryClient.invalidateQueries([
        INDEX_INVITATIONS_QUERY_KEY,
        { supervisorId },
      ]);
      enqueueSnackbar('Invitations rejected successfully', {
        variant: 'success',
      });
      resetSelected();
    },
  });

  const { mutate: acceptInvitation } = useAcceptInvitationById({
    onSuccess: () => {
      queryClient.invalidateQueries([
        INDEX_INVITATIONS_QUERY_KEY,
        { supervisorId },
      ]);
      enqueueSnackbar('Invitations accepted successfully', {
        variant: 'success',
      });
      resetSelected();
    },
  });

  const handleBulkDelete = () => {
    bulkDeleteFields({ ids: selected });
  };

  const handleAcceptInvitation = () => {
    acceptInvitation(selected[0]);
  };

  if (selected.length === 0) return null;
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{
        p: 2,
        background: theme.palette.grey[100],
      }}
    >
      <Typography>{selected.length} Item Selected</Typography>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Button
          color="success"
          disabled={selected.length > 1}
          onClick={handleAcceptInvitation}
        >
          Accept
        </Button>
        <Button color="error" onClick={handleBulkDelete}>
          Reject
        </Button>
      </Stack>
    </Stack>
  );
}
