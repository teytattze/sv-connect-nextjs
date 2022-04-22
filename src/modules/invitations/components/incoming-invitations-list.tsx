import { LoadingButton } from '@mui/lab';
import { Stack } from '@mui/material';
import { DateTime } from 'luxon';
import { useSnackbar } from 'notistack';
import { useQueryClient } from 'react-query';
import {
  Table,
  TableBody,
  TableBodyRow,
  TableCell,
  TableHead,
  TableHeadRow,
  TableContainer,
  TableEmptyBox,
  TableCollapse,
  TableActionBar,
} from 'src/components/table';
import { useTableCheckbox } from 'src/hooks/use-table-checkbox.hook';
import { useToggle } from 'src/hooks/use-toggle.hook';
import { useAuth } from 'src/modules/auth';
import {
  ProjectDetailsCard,
  useGetProjectByStudentId,
} from 'src/modules/projects';
import { useGetSupervisorByAccountId } from 'src/modules/supervisors';
import { InvitationStatus } from 'src/shared/enums/invitations.enum';
import { IInvitation } from 'src/shared/interfaces/invitations.interface';
import {
  INDEX_INVITATIONS_QUERY_KEY,
  useAcceptInvitationById,
  useBulkRejectInvitationsById,
  useIndexInvitations,
} from '../invitations.query';

export function IncomingInvitationsList() {
  const { account, isLoading } = useAuth();

  const {
    data: supervisorRes,
    isLoading: isGetSupervisorLoading,
    isError: isGetSupervisorError,
  } = useGetSupervisorByAccountId(account!.id, {
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

  const {
    allCheckboxToggle,
    allCheckboxValue,
    allInterminateValue,
    checkboxToggle,
    checkboxValue,
    resetSelected,
    selected,
  } = useTableCheckbox(invitationsRes?.data || []);

  return (
    <TableContainer
      loading={isGetSupervisorLoading || isIndexInvitationsLoading}
      error={isGetSupervisorError || isIndexInvitationsError}
    >
      {supervisorRes && supervisorRes.data && (
        <InvitationsListActionsBar
          supervisorId={supervisorRes?.data?.id}
          selected={selected}
          resetSelected={resetSelected}
        />
      )}
      <Table>
        <TableHead>
          <TableHeadRow
            checkable
            expandable
            indeterminate={allInterminateValue()}
            checked={allCheckboxValue()}
            handleAllCheckboxChange={allCheckboxToggle}
          >
            <TableCell>StudentId</TableCell>
            <TableCell>Message</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Created At</TableCell>
            <TableCell>Updated At</TableCell>
          </TableHeadRow>
        </TableHead>
        <TableBody>
          {invitationsRes?.data?.map((invitation) => (
            <IncomingInvitationsListRow
              key={invitation.id}
              invitation={invitation}
              handleCheckboxToggle={checkboxToggle}
              handleCheckboxValue={checkboxValue}
            />
          ))}
        </TableBody>
      </Table>
      {!invitationsRes?.data?.length && <TableEmptyBox />}
    </TableContainer>
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
  const { isOpen, toggle: handleExpandToggle } = useToggle();

  const {
    data: projectRes,
    isLoading: isGetProjectLoading,
    isError: isGetProjectError,
  } = useGetProjectByStudentId(invitation.studentId!, {
    enabled: isOpen && !!invitation && !!invitation.studentId,
  });

  return (
    <>
      <TableBodyRow
        checkable
        expandable
        checked={handleCheckboxValue(invitation.id)}
        expanded={isOpen}
        handleCheckboxChange={() => handleCheckboxToggle(invitation.id)}
        handleExpandClick={handleExpandToggle}
      >
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
      </TableBodyRow>
      <TableBodyRow>
        <TableCell sx={{ p: 0 }} colSpan={7}>
          <TableCollapse open={isOpen}>
            <Stack sx={{ px: 2, py: 1 }} spacing={1}>
              <ProjectDetailsCard
                loading={isGetProjectLoading}
                error={isGetProjectError}
                project={projectRes?.data || null}
              />
            </Stack>
          </TableCollapse>
        </TableCell>
      </TableBodyRow>
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
  const {
    mutate: bulkRejectInvitations,
    isLoading: isBulkRejectInvitationLoading,
  } = useBulkRejectInvitationsById({
    onError: ({ response }) => {
      if (response?.data.message)
        enqueueSnackbar(response?.data.message, { variant: 'error' });
      else
        enqueueSnackbar('There is something unexpected happened', {
          variant: 'error',
        });
    },
    onSuccess: () => {
      queryClient.invalidateQueries([
        INDEX_INVITATIONS_QUERY_KEY,
        { supervisorId },
      ]);
      enqueueSnackbar('Invitations rejected successfully', {
        variant: 'success',
      });
    },
    onSettled: () => resetSelected(),
  });

  const { mutate: acceptInvitation, isLoading: isAcceptInvitationLoading } =
    useAcceptInvitationById({
      onError: ({ response }) => {
        if (response?.data.message)
          enqueueSnackbar(response?.data.message, { variant: 'error' });
        else
          enqueueSnackbar('There is something unexpected happened', {
            variant: 'error',
          });
      },
      onSuccess: () => {
        queryClient.invalidateQueries([
          INDEX_INVITATIONS_QUERY_KEY,
          { supervisorId },
        ]);
        enqueueSnackbar('Invitations accepted successfully', {
          variant: 'success',
        });
      },
      onSettled: () => resetSelected(),
    });

  if (selected.length === 0) return null;
  return (
    <TableActionBar items={selected}>
      <Stack direction="row" alignItems="center" spacing={1}>
        <LoadingButton
          color="success"
          disabled={selected.length > 1}
          onClick={() => acceptInvitation(selected[0])}
          loading={isAcceptInvitationLoading || isBulkRejectInvitationLoading}
        >
          Accept
        </LoadingButton>
        <LoadingButton
          color="error"
          onClick={() => bulkRejectInvitations({ ids: selected })}
          loading={isAcceptInvitationLoading || isBulkRejectInvitationLoading}
        >
          Reject
        </LoadingButton>
      </Stack>
    </TableActionBar>
  );
}
