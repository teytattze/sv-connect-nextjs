import { LoadingButton } from '@mui/lab';
import { Box, Button, Chip, Grid, Stack, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useQueryClient } from 'react-query';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from 'src/components/accordion';
import { FormModal } from 'src/components/form-modal';
import { useToggle } from 'src/hooks/use-toggle.hook';
import { ProjectDetailsCard } from 'src/modules/projects';
import { INDEX_STUDENTS_QUERY_KEY } from 'src/modules/students/students.query';
import { SupervisorDetailsCard } from 'src/modules/supervisors/components/supervisor-details-card';
import { IMatch } from 'src/shared/interfaces/matches.interface';
import { useAcceptMatches } from '../matches.query';

interface IMatchResultFormProps {
  matches: IMatch[];
  error?: boolean;
  open: boolean;
  handleToggle: () => void;
}

export function MatchResultForm({
  matches,
  open,
  handleToggle,
  error,
}: IMatchResultFormProps) {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const { mutate: acceptMatches, isLoading: isSubmitLoading } =
    useAcceptMatches({
      onError: () => {
        enqueueSnackbar('There is something unexpected happened', {
          variant: 'error',
        });
      },
      onSuccess: () => {
        queryClient.invalidateQueries([
          INDEX_STUDENTS_QUERY_KEY,
          { hasProject: true, hasSupervisor: false },
        ]);
        enqueueSnackbar('Confirm matches successfully', { variant: 'success' });
      },
      onSettled: () => {
        handleClose();
      },
    });

  const handleClose = () => {
    handleToggle();
  };

  return (
    <FormModal
      title="Matching Results"
      size="large"
      submitLoading={isSubmitLoading}
      error={error}
      open={open}
      handleClose={handleClose}
    >
      <Box sx={{ my: 5 }}>
        {matches.map((match) => (
          <MatchResultAccordion key={match.student.id} match={match} />
        ))}
      </Box>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        spacing={1}
      >
        <Button color="error" onClick={handleClose}>
          Discard
        </Button>
        <LoadingButton
          variant="contained"
          loading={isSubmitLoading}
          onClick={() => acceptMatches({ matches })}
        >
          Confirm
        </LoadingButton>
      </Stack>
    </FormModal>
  );
}

interface IMatchResultAccordionProps {
  match: IMatch;
}

function MatchResultAccordion({ match }: IMatchResultAccordionProps) {
  const { isOpen, toggle: handleToggle } = useToggle();
  const { student, supervisor, isMatched } = match;

  return (
    <Accordion expanded={isOpen} onChange={handleToggle}>
      <AccordionSummary title={student.id}>
        {isMatched ? (
          <Chip size="small" label="Success" color="success" />
        ) : (
          <Chip size="small" label="Failed" color="error" />
        )}
      </AccordionSummary>
      <AccordionDetails>
        <Stack spacing={3}>
          <ProjectDetailsCard project={student.project} />
          {supervisor && <SupervisorDetailsCard supervisor={supervisor} />}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
}
