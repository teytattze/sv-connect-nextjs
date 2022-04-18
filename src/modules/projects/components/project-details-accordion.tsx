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
import { useGetStudentByAccountId } from '../../students';
import { useGetProjectByStudentId } from '../projects.query';
import { CreateProjectModal } from './create-project-modal';
import { UpdateProjectModal } from './update-project-modal';
import { useToggle } from '../../../hooks/use-toggle.hook';

interface IProjectDetailsAccordionProps {
  accountId: string;
}

export function ProjectDetailsAccordion({
  accountId,
}: IProjectDetailsAccordionProps) {
  const { isOpen: isAccordionOpen, toggle: handleAccordionToggle } =
    useToggle(true);
  const { isOpen: isCreateModalOpen, toggle: handleCreateModalToggle } =
    useToggle();
  const { isOpen: isUpdateModalOpen, toggle: handleUpdateModalToggle } =
    useToggle();

  const { data: studentRes, isLoading: isStudentLoading } =
    useGetStudentByAccountId(accountId, {
      enabled: !!accountId && isAccordionOpen,
    });
  const { data: projectRes, isLoading: isProjectLoading } =
    useGetProjectByStudentId(studentRes?.data?.id || '', {
      enabled: !isStudentLoading && !!studentRes,
    });

  return (
    <>
      <Accordion expanded={isAccordionOpen} onChange={handleAccordionToggle}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography sx={{ fontWeight: 500, textTransform: 'uppercase' }}>
              Project
            </Typography>
            <Button
              size="small"
              onClick={(ev: React.SyntheticEvent) => {
                ev.stopPropagation();
                handleUpdateModalToggle();
              }}
            >
              Edit
            </Button>
          </Stack>
        </AccordionSummary>
        <AccordionDetails>
          {isStudentLoading && isProjectLoading ? (
            <>
              <Skeleton />
              <Skeleton />
              <Skeleton />
            </>
          ) : !!projectRes && !!projectRes.data ? (
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
          ) : (
            <Stack
              direction="column"
              alignItems="center"
              justifyContent="center"
              spacing={0.5}
              sx={{ py: 4 }}
            >
              <Typography
                color="text.secondary"
                variant="body2"
                sx={{
                  fontWeight: 500,
                  textTransform: 'uppercase',
                }}
              >
                No Project Found
              </Typography>
              <Button variant="text" onClick={handleCreateModalToggle}>
                Create Project
              </Button>
            </Stack>
          )}
        </AccordionDetails>
      </Accordion>
      {studentRes && studentRes.data && (
        <CreateProjectModal
          studentId={studentRes.data.id}
          open={isCreateModalOpen}
          handleToggle={handleCreateModalToggle}
        />
      )}
      {projectRes && projectRes.data && (
        <UpdateProjectModal
          project={projectRes.data}
          open={isUpdateModalOpen}
          handleToggle={handleUpdateModalToggle}
        />
      )}
    </>
  );
}
