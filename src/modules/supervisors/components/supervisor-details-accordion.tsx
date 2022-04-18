import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Grid,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import { useModal } from '../../../hooks/use-modal.hook';
import { useGetSupervisorByAccountId } from '../supervisors.query';
import { UpdateSupervisorModal } from './update-supervisor-modal';
import { CreateInvitationModal } from '../../invitations';

interface ISupervisorDetailsAccordionProps {
  accountId: string;
}

export function SupervisorDetailsAccordion({
  accountId,
}: ISupervisorDetailsAccordionProps) {
  const [isOpen, setIsOpen] = useState(true);
  const { isOpen: isUpdateModalOpen, toggle: handleUpdateModalToggle } =
    useModal();
  const { isOpen: isInviteModalOpen, toggle: handleInviteModalToggle } =
    useModal();

  const { data: supervisorRes, isLoading: isGetSupervisorLoading } =
    useGetSupervisorByAccountId(accountId, {
      enabled: !!accountId && isOpen,
    });

  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <Accordion expanded={isOpen} onChange={handleOpen}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Typography
              sx={{ fontWeight: 500, textTransform: 'uppercase', mr: 0.5 }}
            >
              Supervisor
            </Typography>
            <Button
              size="small"
              variant="outlined"
              onClick={(ev: React.SyntheticEvent) => {
                ev.stopPropagation();
                handleUpdateModalToggle();
              }}
            >
              Edit
            </Button>
            <Button
              size="small"
              variant="outlined"
              onClick={(ev: React.SyntheticEvent) => {
                ev.stopPropagation();
                handleInviteModalToggle();
              }}
            >
              Invite
            </Button>
          </Stack>
        </AccordionSummary>
        <AccordionDetails>
          {isGetSupervisorLoading ? (
            <>
              <Skeleton />
              <Skeleton />
              <Skeleton />
            </>
          ) : (
            supervisorRes &&
            supervisorRes.data && (
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
                  {supervisorRes?.data?.specializations.map(
                    (specialization) => (
                      <Typography>- {specialization.title}</Typography>
                    )
                  )}
                </Grid>
              </Grid>
            )
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
