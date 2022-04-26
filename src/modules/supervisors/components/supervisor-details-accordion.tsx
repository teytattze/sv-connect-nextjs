import { Button } from '@mui/material';
import {
  Accordion,
  AccordionDetails,
  AccordionEmptyDataBox,
  AccordionSummary,
} from 'src/components/accordion';
import { useToggle } from 'src/hooks/use-toggle.hook';
import { ComponentGuard } from 'src/modules/auth';
import { CreateInvitationModal } from 'src/modules/invitations';
import { useIndexStudents } from 'src/modules/students';
import { StudentsList } from 'src/modules/students';
import { AccountRole } from 'src/shared/enums/accounts.enum';
import { useGetSupervisorByAccountId } from '../supervisors.query';
import { SupervisorDetailsCard } from './supervisor-details-card';
import { UpdateSupervisorModal } from './update-supervisor-modal';

interface ISupervisorDetailsAccordionProps {
  accountId: string;
}

export function SupervisorDetailsAccordion({
  accountId,
}: ISupervisorDetailsAccordionProps) {
  const {
    isOpen: isSupervisorDetailsAccordionOpen,
    toggle: handleSupervisorDetailsAccordionToggle,
  } = useToggle(true);
  const {
    isOpen: isSupervisorStudentsAccordionOpen,
    toggle: handleSupervisorStudentsAccordionToggle,
  } = useToggle(true);
  const { isOpen: isUpdateModalOpen, toggle: handleUpdateModalToggle } =
    useToggle();
  const { isOpen: isInviteModalOpen, toggle: handleInviteModalToggle } =
    useToggle();

  const {
    data: supervisorRes,
    isLoading: isGetSupervisorLoading,
    isError: isGetSupervisorError,
  } = useGetSupervisorByAccountId(accountId, {
    enabled: !!accountId && isSupervisorDetailsAccordionOpen,
  });

  const {
    data: studentsRes,
    isLoading: isIndexStudentsLoading,
    isError: isIndexStudentsError,
  } = useIndexStudents(
    { supervisorId: supervisorRes?.data?.id },
    { enabled: !!supervisorRes?.data?.id && isSupervisorStudentsAccordionOpen }
  );

  return (
    <>
      <Accordion
        expanded={isSupervisorDetailsAccordionOpen}
        onChange={handleSupervisorDetailsAccordionToggle}
      >
        <AccordionSummary title="Supervisor">
          <ComponentGuard
            roles={[AccountRole.SUPERVISOR, AccountRole.ADMIN]}
            id={accountId}
          >
            <Button
              size="small"
              onClick={(ev: React.SyntheticEvent) => {
                ev.stopPropagation();
                handleUpdateModalToggle();
              }}
            >
              Edit
            </Button>
          </ComponentGuard>
          <ComponentGuard roles={[AccountRole.STUDENT]}>
            <Button
              size="small"
              onClick={(ev: React.SyntheticEvent) => {
                ev.stopPropagation();
                handleInviteModalToggle();
              }}
            >
              Invite
            </Button>
          </ComponentGuard>
        </AccordionSummary>
        <AccordionDetails
          loading={isGetSupervisorLoading}
          error={isGetSupervisorError}
        >
          {supervisorRes && supervisorRes.data ? (
            <SupervisorDetailsCard
              disabledTitle
              supervisor={supervisorRes.data}
            />
          ) : (
            <AccordionEmptyDataBox />
          )}
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={isSupervisorStudentsAccordionOpen}
        onChange={handleSupervisorStudentsAccordionToggle}
      >
        <AccordionSummary title="Students" />
        <AccordionDetails
          paddingSize="none"
          loading={isIndexStudentsLoading}
          error={isIndexStudentsError}
        >
          <StudentsList students={studentsRes?.data || []} />
        </AccordionDetails>
      </Accordion>
      {supervisorRes && supervisorRes.data && (
        <CreateInvitationModal
          supervisorId={supervisorRes.data.id}
          open={isInviteModalOpen}
          handleToggle={handleInviteModalToggle}
        />
      )}
      {supervisorRes && supervisorRes.data && (
        <UpdateSupervisorModal
          supervisor={supervisorRes.data}
          open={isUpdateModalOpen}
          handleToggle={handleUpdateModalToggle}
        />
      )}
    </>
  );
}
