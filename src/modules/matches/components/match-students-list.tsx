import { Button, Stack } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useQueryClient } from 'react-query';
import {
  Table,
  TableActionBar,
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
import { formatDateTime } from 'src/lib/datetime.lib';
import {
  ProjectDetailsCard,
  useGetProjectByStudentId,
} from 'src/modules/projects';
import { useIndexStudents } from 'src/modules/students';
import { INDEX_STUDENTS_QUERY_KEY } from 'src/modules/students/students.query';
import { IMatch } from 'src/shared/interfaces/matches.interface';
import { IStudent } from 'src/shared/interfaces/students.interface';
import {
  useMatchSelectedStudents,
  useMatchSingleStudent,
} from '../matches.query';
import { MatchResultForm } from './match-result-modal';

export function MatchStudentsList() {
  const {
    data: studentsRes,
    isLoading: isIndexStudentsLoading,
    isError: isIndexStudentsError,
  } = useIndexStudents({ hasProject: true, hasSupervisor: false });

  const {
    allCheckboxToggle,
    allCheckboxValue,
    allInterminateValue,
    checkboxToggle,
    checkboxValue,
    resetSelected,
    selected,
  } = useTableCheckbox(studentsRes?.data || []);

  return (
    <TableContainer
      loading={isIndexStudentsLoading}
      error={isIndexStudentsError}
    >
      <MatchStudentsListActionsBar
        selected={selected}
        resetSelected={resetSelected}
      />
      <Table>
        <TableHead>
          <TableHeadRow
            checkable
            expandable
            checked={allCheckboxValue()}
            indeterminate={allInterminateValue()}
            handleAllCheckboxChange={allCheckboxToggle}
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
              handleCheckboxToggle={checkboxToggle}
              handleCheckboxValue={checkboxValue}
            />
          ))}
        </TableBody>
      </Table>
      {!studentsRes?.data?.length && <TableEmptyBox />}
    </TableContainer>
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
          {formatDateTime(student.createdAt)}
        </TableCell>
        <TableCell component="th" scope="row">
          {formatDateTime(student.updatedAt)}
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

interface IMatchStudentsListActionBarProps {
  selected: string[];
  resetSelected: () => void;
}

export function MatchStudentsListActionsBar({
  selected,
  resetSelected,
}: IMatchStudentsListActionBarProps) {
  const { isOpen, toggle: handleResultModalToggle } = useToggle();
  const [result, setResult] = useState<IMatch[]>([]);
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const { mutate: matchSingleStudent } = useMatchSingleStudent({
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
      enqueueSnackbar('Students match successfully', { variant: 'success' });
      handleResultModalToggle();
      setResult(res.data ? [res.data] : []);
    },
    onSettled: () => {
      resetSelected();
    },
  });

  const { mutate: matchSelectedStudents } = useMatchSelectedStudents({
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
      enqueueSnackbar('Students matches successfully', {
        persist: true,
        variant: 'success',
      });
      handleResultModalToggle();
      setResult(res.data ? res.data : []);
    },
    onSettled: () => {
      resetSelected();
    },
  });

  const handleMatch = () => {
    if (selected.length === 1) matchSingleStudent({ studentId: selected[0] });
    else if (selected.length > 1)
      matchSelectedStudents({ studentIds: selected });
  };

  return (
    <>
      <TableActionBar items={selected}>
        <Button onClick={handleMatch}>Match</Button>
      </TableActionBar>
      <MatchResultForm
        matches={result}
        open={isOpen}
        handleToggle={handleResultModalToggle}
      />
    </>
  );
}
