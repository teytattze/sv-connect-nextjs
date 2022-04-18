import {
  Alert,
  Box,
  Button,
  Checkbox,
  Collapse,
  Grid,
  IconButton,
  Paper,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import { useIndexStudents } from '../students.query';
import { LoadingWrapper } from '../../../components/loading-wrapper';
import { IStudent } from '../../../shared/interfaces/students.interface';
import { useTableCheckbox } from '../../../hooks/use-table-checkbox.hook';
import { theme } from '../../../styles/theme.style';

export function StudentsMatchingList() {
  const {
    data: studentsRes,
    isLoading: isIndexStudentsLoading,
    isError: isIndexStudentsError,
  } = useIndexStudents();

  const {
    selected,
    allCheckboxToggle,
    allCheckboxValue,
    allInterminateValue,
    checkboxToggle,
    checkboxValue,
    resetSelected,
  } = useTableCheckbox(studentsRes?.data || []);

  return (
    <LoadingWrapper
      loading={isIndexStudentsLoading}
      type="skeleton"
      renderSkeleton={() => (
        <Box sx={{ width: '100%', px: 1 }}>
          <Skeleton animation="wave" height={32} />
          <Skeleton animation="wave" height={32} />
          <Skeleton animation="wave" height={32} />
          <Skeleton animation="wave" height={32} />
          <Skeleton animation="wave" height={32} />
        </Box>
      )}
    >
      <TableContainer component={Paper}>
        <StudentsMatchingListActionBar
          selected={selected}
          resetSelected={resetSelected}
        />
        <Table stickyHeader sx={{ width: '100%' }}>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox"></TableCell>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  indeterminate={allInterminateValue()}
                  checked={allCheckboxValue()}
                  onChange={allCheckboxToggle}
                />
              </TableCell>
              <TableCell>StudentId</TableCell>
              <TableCell>Message</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Updated At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {studentsRes?.data?.map((student) => (
              <StudentsMatchingListRow
                key={student.id}
                student={student}
                checkboxToggle={checkboxToggle}
                checkboxValue={checkboxValue}
              />
            ))}
          </TableBody>
        </Table>
        {(isIndexStudentsError || !studentsRes || !studentsRes.data) && (
          <Box
            sx={{
              background: theme.palette.grey[100],
              width: '100%',
              textAlign: 'center',
              py: 4,
            }}
          >
            <Typography
              component="h3"
              variant="body2"
              color="text.secondary"
              sx={{
                fontWeight: 'bold',
              }}
            >
              No data available
            </Typography>
          </Box>
        )}
      </TableContainer>
    </LoadingWrapper>
  );
}

interface IStudentsMatchingListRowProps {
  student: IStudent;
  checkboxValue: (id: string) => boolean;
  checkboxToggle: (id: string) => void;
}

export function StudentsMatchingListRow({
  student,
  checkboxToggle,
  checkboxValue,
}: IStudentsMatchingListRowProps) {
  return <div></div>;
}

interface IStudentsMatchingListActionBarProps {
  selected: string[];
  resetSelected: () => void;
}

export function StudentsMatchingListActionBar({
  selected,
  resetSelected,
}: IStudentsMatchingListActionBarProps) {
  return <div></div>;
}
