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
import { formatDateTime } from 'src/lib/datetime.lib';
import {
  ProjectDetailsCard,
  useGetProjectByStudentId,
} from 'src/modules/projects';
import { IStudent } from 'src/shared/interfaces/students.interface';

interface IStudentsListProps {
  loading?: boolean;
  error?: boolean;
  students: IStudent[];
}

export function StudentsList({
  loading = false,
  error = false,
  students,
}: IStudentsListProps) {
  return (
    <TableContainer loading={loading} error={error}>
      <Table>
        <TableHead>
          <TableHeadRow expandable>
            <TableCell>Student ID</TableCell>
            <TableCell>Created At</TableCell>
            <TableCell>Updated At</TableCell>
          </TableHeadRow>
        </TableHead>
        <TableBody>
          {students.map((student) => (
            <StudentsListRow key={student.id} student={student} />
          ))}
        </TableBody>
      </Table>
      {!students.length && <TableEmptyBox />}
    </TableContainer>
  );
}

interface IStudentListRowProps {
  student: IStudent;
}

export function StudentsListRow({ student }: IStudentListRowProps) {
  const { isOpen, toggle: handleToggle } = useToggle();
  const {
    data: projectRes,
    isLoading: isGetProjectLoading,
    isError: isGetProjectError,
  } = useGetProjectByStudentId(student.id);

  return (
    <>
      <TableBodyRow expandable handleExpandClick={handleToggle}>
        <TableCell>{student.id}</TableCell>
        <TableCell>{formatDateTime(student.createdAt)}</TableCell>
        <TableCell>{formatDateTime(student.updatedAt)}</TableCell>
      </TableBodyRow>
      <TableBodyRow>
        <TableCell sx={{ p: 0 }} colSpan={4}>
          <TableCollapse open={isOpen}>
            <Stack sx={{ px: 2, py: 1 }} spacing={3}>
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
