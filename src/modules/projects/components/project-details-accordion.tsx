import { Button, Grid, Typography } from '@mui/material';
import {
  Accordion,
  AccordionDetails,
  AccordionEmptyDataBox,
  AccordionSummary,
} from 'src/components/accordion';
import { useToggle } from 'src/hooks/use-toggle.hook';
import { useGetStudentByAccountId } from 'src/modules/students';
import { useGetProjectByStudentId } from '../projects.query';
import { CreateProjectModal } from './create-project-modal';
import { UpdateProjectModal } from './update-project-modal';

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

  const {
    data: studentRes,
    isLoading: isGetStudentLoading,
    isError: isGetStudentError,
  } = useGetStudentByAccountId(accountId, {
    enabled: !!accountId && isAccordionOpen,
  });
  const { data: projectRes, isLoading: isGetProjectLoading } =
    useGetProjectByStudentId(studentRes?.data?.id || '', {
      enabled: !isGetStudentLoading && !!studentRes,
    });

  return (
    <>
      <Accordion expanded={isAccordionOpen} onChange={handleAccordionToggle}>
        <AccordionSummary title="Project">
          {projectRes && projectRes.data && (
            <Button
              size="small"
              onClick={(ev: React.SyntheticEvent) => {
                ev.stopPropagation();
                handleUpdateModalToggle();
              }}
            >
              Edit
            </Button>
          )}
        </AccordionSummary>
        <AccordionDetails
          loading={isGetStudentLoading || isGetProjectLoading}
          error={isGetStudentError}
        >
          {projectRes && projectRes.data ? (
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
                  <Typography key={specialization.id}>
                    - {specialization.title || ' - '}
                  </Typography>
                ))}
              </Grid>
            </Grid>
          ) : (
            <AccordionEmptyDataBox>
              <Button variant="text" onClick={handleCreateModalToggle}>
                Create Project
              </Button>
            </AccordionEmptyDataBox>
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
