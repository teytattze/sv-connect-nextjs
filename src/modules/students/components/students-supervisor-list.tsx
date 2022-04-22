import { Stack } from '@mui/material';
import {
  Table,
  TableBody,
  TableBodyRow,
  TableCell,
  TableCollapse,
  TableContainer,
  TableEmptyBox,
  TableHead,
  TableHeadRow,
} from 'src/components/table';
import { useToggle } from 'src/hooks/use-toggle.hook';
import {
  ProjectDetailsCard,
  useGetProjectByStudentId,
} from 'src/modules/projects';
import { useGetSupervisorById } from 'src/modules/supervisors';
import { SupervisorDetailsCard } from 'src/modules/supervisors/components/supervisor-details-card';
import { IStudent } from 'src/shared/interfaces/students.interface';
import { useIndexStudents } from '../students.query';

export function StudentsSupervisorList() {
  const {
    data: studentsRes,
    isLoading: isIndexStudentsLoading,
    isError: isIndexStudentsError,
  } = useIndexStudents({
    hasProject: true,
    hasSupervisor: true,
  });

  return (
    <TableContainer
      loading={isIndexStudentsLoading}
      error={isIndexStudentsError}
    >
      <Table>
        <TableHead>
          <TableHeadRow expandable>
            <TableCell>Student ID</TableCell>
            <TableCell>Supervisor ID</TableCell>
          </TableHeadRow>
        </TableHead>
        <TableBody>
          {studentsRes?.data?.map((student) => (
            <StudentsSupervisorListRow key={student.id} student={student} />
          ))}
        </TableBody>
      </Table>
      {!studentsRes?.data?.length && <TableEmptyBox />}
    </TableContainer>
  );
}

interface IStudentsSupervisorListRowProps {
  student: IStudent;
}

function StudentsSupervisorListRow({
  student,
}: IStudentsSupervisorListRowProps) {
  const { isOpen, toggle: handleToggle } = useToggle();
  const {
    data: projectRes,
    isLoading: isGetProjectLoading,
    isError: isGetProjectError,
  } = useGetProjectByStudentId(student.id);
  const {
    data: supervisorRes,
    isLoading: isGetSupervisorLoading,
    isError: isGetSupervisorError,
  } = useGetSupervisorById(student.supervisorId!, {
    enabled: !!student.supervisorId,
  });

  return (
    <>
      <TableBodyRow expandable handleExpandClick={handleToggle}>
        <TableCell>{student.id}</TableCell>
        <TableCell>{student.supervisorId || ' - '}</TableCell>
      </TableBodyRow>
      <TableBodyRow>
        <TableCell sx={{ p: 0 }} colSpan={3}>
          <TableCollapse open={isOpen}>
            <Stack sx={{ px: 2, py: 1 }} spacing={3}>
              <ProjectDetailsCard
                loading={isGetProjectLoading}
                error={isGetProjectError}
                project={projectRes?.data || null}
              />
              <SupervisorDetailsCard
                loading={isGetSupervisorLoading}
                error={isGetSupervisorError}
                supervisor={supervisorRes?.data || null}
              />
            </Stack>
          </TableCollapse>
        </TableCell>
      </TableBodyRow>
    </>
  );
}
