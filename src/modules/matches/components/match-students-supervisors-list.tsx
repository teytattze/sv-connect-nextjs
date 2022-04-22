import { LoadingButton } from '@mui/lab';
import { Box, Stack } from '@mui/material';
import { DateTime } from 'luxon';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useQueryClient } from 'react-query';
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
import { useTableCheckbox } from 'src/hooks/use-table-checkbox.hook';
import { useToggle } from 'src/hooks/use-toggle.hook';
import { formateDateTime } from 'src/lib/datetime.lib';
import {
  ProjectDetailsCard,
  useGetProjectByStudentId,
} from 'src/modules/projects';
import { useIndexStudents } from 'src/modules/students';
import { INDEX_STUDENTS_QUERY_KEY } from 'src/modules/students/students.query';
import {
  INDEX_SUPERVISORS_QUERY_KEY,
  useIndexSupervisors,
} from 'src/modules/supervisors';
import { IMatch } from 'src/shared/interfaces/matches.interface';
import { IStudent } from 'src/shared/interfaces/students.interface';
import { ISupervisor } from 'src/shared/interfaces/supervisors.interface';
import { useMatchSelectedStudentsAndSupervisors } from '../matches.query';
import { MatchResultForm } from './match-result-modal';

export function MatchStudentsSupervisorsList() {
  const {
    data: studentsRes,
    isLoading: isIndexStudentsLoading,
    isError: isIndexStudentsError,
  } = useIndexStudents({ hasProject: true, hasSupervisor: false });
  const {
    data: supervisorRes,
    isLoading: isIndexSupervisorsLoading,
    isError: isIndexSupervisorsError,
  } = useIndexSupervisors({ minCapacity: 1 });

  const {
    allCheckboxToggle: handleStudentsAllCheckboxToggle,
    allCheckboxValue: handleStudentsAllCheckboxValue,
    allInterminateValue: handleStudentsAllInterminateValue,
    checkboxToggle: handleStudentsCheckboxToggle,
    checkboxValue: handleStudentsCheckboxValue,
    resetSelected: handleStudentsResetSelected,
    selected: studentsSelected,
  } = useTableCheckbox(studentsRes?.data || []);

  const {
    allCheckboxToggle: handleSupervisorsAllCheckboxToggle,
    allCheckboxValue: handleSupervisorsAllCheckboxValue,
    allInterminateValue: handleSupervisorsAllInterminateValue,
    checkboxToggle: handleSupervisorsCheckboxToggle,
    checkboxValue: handleSupervisorsCheckboxValue,
    resetSelected: handleSupervisorsResetSelected,
    selected: supervisorsSelected,
  } = useTableCheckbox(supervisorRes?.data || []);

  const handleReset = () => {
    handleStudentsResetSelected();
    handleSupervisorsResetSelected();
  };

  const { isOpen: isResultModalOpen, toggle: handleResultModalToggle } =
    useToggle();
  const [result, setResult] = useState<IMatch[]>([]);
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const {
    mutate: matchSelectedStudentsAndSupervisors,
    isLoading: isSubmitLoading,
  } = useMatchSelectedStudentsAndSupervisors({
    onError: ({ response }) => {
      if (response?.data.message)
        enqueueSnackbar(response?.data.message, { variant: 'error' });
      else
        enqueueSnackbar('There is something unexpected happened', {
          variant: 'error',
        });
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries([
        INDEX_STUDENTS_QUERY_KEY,
        { hasProject: true, hasSupervisor: false },
      ]);
      queryClient.invalidateQueries([
        INDEX_SUPERVISORS_QUERY_KEY,
        { minCapacity: 1 },
      ]);
      enqueueSnackbar('Students and Supervisors match successfully', {
        variant: 'success',
      });
      handleResultModalToggle();
      setResult(res.data || []);
    },
    onSettled: () => handleReset(),
  });

  return (
    <>
      <Stack spacing={5}>
        <TableContainer
          loading={isIndexStudentsLoading}
          error={isIndexStudentsError}
        >
          <Table>
            <TableHead>
              <TableHeadRow
                checkable
                expandable
                checked={handleStudentsAllCheckboxValue()}
                indeterminate={handleStudentsAllInterminateValue()}
                handleAllCheckboxChange={handleStudentsAllCheckboxToggle}
              >
                <TableCell>Student ID</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Updated At</TableCell>
              </TableHeadRow>
            </TableHead>
            <TableBody>
              {studentsRes?.data?.map((student) => (
                <MatchStudentsListRow
                  key={student.id}
                  student={student}
                  handleCheckboxToggle={handleStudentsCheckboxToggle}
                  handleCheckboxValue={handleStudentsCheckboxValue}
                />
              ))}
            </TableBody>
          </Table>
          {!studentsRes?.data?.length && <TableEmptyBox />}
        </TableContainer>
        <TableContainer
          loading={isIndexSupervisorsLoading}
          error={isIndexSupervisorsError}
        >
          <Table>
            <TableHead>
              <TableHeadRow
                checkable
                checked={handleSupervisorsAllCheckboxValue()}
                indeterminate={handleSupervisorsAllInterminateValue()}
                handleAllCheckboxChange={handleSupervisorsAllCheckboxToggle}
              >
                <TableCell>Supervisor ID</TableCell>
                <TableCell>Capacity</TableCell>
                <TableCell>Field</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Updated At</TableCell>
              </TableHeadRow>
            </TableHead>
            <TableBody>
              {supervisorRes?.data?.map((supervisor) => (
                <MatchSupervisorsListRow
                  key={supervisor.id}
                  supervisor={supervisor}
                  handleCheckboxToggle={handleSupervisorsCheckboxToggle}
                  handleCheckboxValue={handleSupervisorsCheckboxValue}
                />
              ))}
            </TableBody>
          </Table>
          {!studentsRes?.data?.length && <TableEmptyBox />}
        </TableContainer>
        <Box sx={{ width: '100%', textAlign: 'center' }}>
          <LoadingButton
            onClick={() =>
              matchSelectedStudentsAndSupervisors({
                studentIds: studentsSelected,
                supervisorIds: supervisorsSelected,
              })
            }
            loading={isSubmitLoading}
            disabled={
              supervisorsSelected.length < 1 || studentsSelected.length < 1
            }
            variant="contained"
          >
            Match
          </LoadingButton>
        </Box>
      </Stack>
      <MatchResultForm
        matches={result}
        open={isResultModalOpen}
        handleToggle={handleResultModalToggle}
      />
    </>
  );
}

interface IMatchStudentsListRowProps {
  student: IStudent;
  handleCheckboxValue: (id: string) => boolean;
  handleCheckboxToggle: (id: string) => void;
}

export function MatchStudentsListRow({
  student,
  handleCheckboxToggle,
  handleCheckboxValue,
}: IMatchStudentsListRowProps) {
  const { isOpen, toggle: handleExpandToggle } = useToggle();
  const {
    data: projectRes,
    isLoading: isGetProjectLoading,
    isError: isGetProjectError,
  } = useGetProjectByStudentId(student.id, {
    enabled: !!student && !!student.id,
  });

  return (
    <>
      <TableBodyRow
        checkable
        expandable
        checked={handleCheckboxValue(student.id)}
        expanded={isOpen}
        handleCheckboxChange={() => handleCheckboxToggle(student.id)}
        handleExpandClick={handleExpandToggle}
      >
        <TableCell component="th" scope="row">
          {student.id}
        </TableCell>
        <TableCell component="th" scope="row">
          {DateTime.fromISO(student.createdAt).toHTTP()}
        </TableCell>
        <TableCell component="th" scope="row">
          {DateTime.fromISO(student.updatedAt).toHTTP()}
        </TableCell>
      </TableBodyRow>
      <TableBodyRow>
        <TableCell sx={{ p: 0 }} colSpan={5}>
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

interface IMatchSupervisorsListRowProps {
  supervisor: ISupervisor;
  handleCheckboxValue: (id: string) => boolean;
  handleCheckboxToggle: (id: string) => void;
}

export function MatchSupervisorsListRow({
  supervisor,
  handleCheckboxToggle,
  handleCheckboxValue,
}: IMatchSupervisorsListRowProps) {
  const {
    data: studentsRes,
    isLoading: isIndexStudentsLoading,
    isError: isIndexStudentsError,
  } = useIndexStudents(
    { supervisorId: supervisor.id },
    { enabled: !!supervisor?.id }
  );

  return (
    <TableBodyRow
      checkable
      checked={handleCheckboxValue(supervisor.id)}
      handleCheckboxChange={() => handleCheckboxToggle(supervisor.id)}
    >
      <TableCell>{supervisor.id}</TableCell>
      <TableCell>{supervisor.capacity}</TableCell>
      <TableCell>{supervisor.field?.title || ' - '}</TableCell>
      <TableCell>{formateDateTime(supervisor.createdAt)}</TableCell>
      <TableCell>{formateDateTime(supervisor.updatedAt)}</TableCell>
    </TableBodyRow>
  );
}
