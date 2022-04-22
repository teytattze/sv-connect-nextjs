import { Button } from '@mui/material';
import {
  Accordion,
  AccordionDetails,
  AccordionEmptyDataBox,
  AccordionSummary,
} from 'src/components/accordion';
import { useToggle } from 'src/hooks/use-toggle.hook';
import { ComponentGuard } from 'src/modules/auth';
import {
  CreateProjectModal,
  ProjectDetailsCard,
  UpdateProjectModal,
  useGetProjectByStudentId,
} from 'src/modules/projects';
import { useGetSupervisorById } from 'src/modules/supervisors';
import { SupervisorDetailsCard } from 'src/modules/supervisors/components/supervisor-details-card';
import { AccountRole } from 'src/shared/enums/accounts.enum';
import { useGetStudentByAccountId } from '../students.query';

interface IStudentDetailsAccordionProps {
  accountId: string;
}

export function StudentDetailsAccordion({
  accountId,
}: IStudentDetailsAccordionProps) {
  const {
    isOpen: isProjectAccordionOpen,
    toggle: handleProjectAccordionToggle,
  } = useToggle(true);
  const {
    isOpen: isSupervisorAccordionOpen,
    toggle: handleSupervisorAccordionToggle,
  } = useToggle(true);
  const { isOpen: isCreateModalOpen, toggle: handleCreateModalToggle } =
    useToggle();
  const { isOpen: isUpdateModalOpen, toggle: handleUpdateModalToggle } =
    useToggle();

  const {
    data: studentRes,
    isLoading: isGetStudentLoading,
    isError: isGetStudentError,
  } = useGetStudentByAccountId(accountId, {
    enabled: !!accountId,
  });

  const {
    data: projectRes,
    isLoading: isGetProjectLoading,
    isError: isGetProjectError,
  } = useGetProjectByStudentId(studentRes?.data?.id || '', {
    enabled:
      !isGetStudentLoading && !!studentRes?.data?.id && isProjectAccordionOpen,
  });

  const {
    data: supervisorRes,
    isLoading: isGetSupervisorLoading,
    isError: isGetSupervisorError,
  } = useGetSupervisorById(studentRes?.data?.supervisorId || '', {
    enabled:
      !isGetStudentLoading &&
      !!studentRes?.data?.supervisorId &&
      isSupervisorAccordionOpen,
  });

  console.log(studentRes);

  return (
    <>
      <Accordion
        expanded={isProjectAccordionOpen}
        onChange={handleProjectAccordionToggle}
      >
        <AccordionSummary title="Project">
          {projectRes && projectRes.data && (
            <ComponentGuard roles={[AccountRole.STUDENT]} id={accountId}>
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
          )}
        </AccordionSummary>
        <AccordionDetails
          loading={isGetStudentLoading || isGetProjectLoading}
          error={isGetStudentError}
        >
          {projectRes && projectRes.data ? (
            <ProjectDetailsCard disabledTitle project={projectRes.data} />
          ) : (
            <AccordionEmptyDataBox>
              <Button variant="text" onClick={handleCreateModalToggle}>
                Create Project
              </Button>
            </AccordionEmptyDataBox>
          )}
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={isSupervisorAccordionOpen}
        onChange={handleSupervisorAccordionToggle}
      >
        <AccordionSummary title="Supervisor" />
        <AccordionDetails
          loading={isGetStudentLoading || isGetSupervisorLoading}
          error={isGetStudentError}
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
