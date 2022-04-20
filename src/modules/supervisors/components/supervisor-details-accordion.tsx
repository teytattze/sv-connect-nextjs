import { Button, Grid, Typography } from '@mui/material';
import {
  Accordion,
  AccordionDetails,
  AccordionEmptyDataBox,
  AccordionSummary,
} from 'src/components/accordion';
import { useToggle } from 'src/hooks/use-toggle.hook';
import { CreateInvitationModal } from 'src/modules/invitations';
import { useGetSupervisorByAccountId } from '../supervisors.query';
import { UpdateSupervisorModal } from './update-supervisor-modal';

interface ISupervisorDetailsAccordionProps {
  accountId: string;
}

export function SupervisorDetailsAccordion({
  accountId,
}: ISupervisorDetailsAccordionProps) {
  const { isOpen: isAccordionOpen, toggle: handleAccordionToggle } =
    useToggle(true);
  const { isOpen: isUpdateModalOpen, toggle: handleUpdateModalToggle } =
    useToggle();
  const { isOpen: isInviteModalOpen, toggle: handleInviteModalToggle } =
    useToggle();

  const {
    data: supervisorRes,
    isLoading: isGetSupervisorLoading,
    isError: isGetSupervisorError,
  } = useGetSupervisorByAccountId(accountId, {
    enabled: !!accountId && isAccordionOpen,
  });

  return (
    <>
      <Accordion expanded={isAccordionOpen} onChange={handleAccordionToggle}>
        <AccordionSummary title="Supervisor">
          <Button
            size="small"
            onClick={(ev: React.SyntheticEvent) => {
              ev.stopPropagation();
              handleUpdateModalToggle();
            }}
          >
            Edit
          </Button>
          <Button
            size="small"
            onClick={(ev: React.SyntheticEvent) => {
              ev.stopPropagation();
              handleInviteModalToggle();
            }}
          >
            Invite
          </Button>
        </AccordionSummary>
        <AccordionDetails
          loading={isGetSupervisorLoading}
          error={isGetSupervisorError}
        >
          {supervisorRes && supervisorRes.data ? (
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Typography
                  color="text.secondary"
                  variant="body2"
                  sx={{
                    fontWeight: 500,
                    textTransform: 'uppercase',
                  }}
                >
                  Capacity
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography>{supervisorRes?.data?.capacity}</Typography>
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
                  {supervisorRes?.data?.field?.title || ' - '}
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
                {supervisorRes?.data?.specializations.length === 0 && (
                  <Typography> - </Typography>
                )}
                {supervisorRes?.data?.specializations.map((specialization) => (
                  <Typography key={specialization.id}>
                    - {specialization.title}
                  </Typography>
                ))}
              </Grid>
            </Grid>
          ) : (
            <AccordionEmptyDataBox />
          )}
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
