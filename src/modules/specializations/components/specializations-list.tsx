import {
  Box,
  Checkbox,
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
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { DateTime } from 'luxon';
import { LoadingWrapper } from '../../../components/loading-wrapper';
import { theme } from '../../../styles/theme.style';
import { useQueryClient } from 'react-query';
import { useSnackbar } from 'notistack';
import {
  INDEX_SPECIALIZATIONS_QUERY_KEY,
  useBulkDeleteSpecializationsById,
  useIndexSpecializations,
} from '../specializations.query';
import { UpdateSpecializationModal } from './update-specialization-modal';
import { ISpecialization } from '../../../shared/interfaces/specializations.interface';
import { useTableCheckbox } from '../../../hooks/use-table-checkbox.hook';
import { useToggle } from '../../../hooks/use-toggle.hook';

export function SpecializationsList() {
  const {
    data: specializationsRes,
    isLoading: isIndexSpecializationsLoading,
    isError: isIndexSpecializationsError,
  } = useIndexSpecializations();

  const {
    allCheckboxToggle,
    allCheckboxValue,
    allInterminateValue,
    checkboxToggle,
    checkboxValue,
    resetSelected,
    selected,
  } = useTableCheckbox(specializationsRes?.data || []);

  return (
    <LoadingWrapper
      loading={isIndexSpecializationsLoading}
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
        <SpecializationsListActionsBar
          selected={selected}
          resetSelected={resetSelected}
        />
        <Table stickyHeader sx={{ width: '100%' }}>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  indeterminate={allInterminateValue()}
                  checked={allCheckboxValue()}
                  onChange={allCheckboxToggle}
                />
              </TableCell>
              <TableCell padding="checkbox"></TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Updated At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {specializationsRes?.data?.map((specialization) => (
              <SpecializationsListRow
                key={specialization.id}
                specialization={specialization}
                checkboxToggle={checkboxToggle}
                checkboxValue={checkboxValue}
              />
            ))}
          </TableBody>
        </Table>
        {(isIndexSpecializationsError ||
          !specializationsRes ||
          !specializationsRes.data) && (
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

interface ISpecializationsListRowProps {
  specialization: ISpecialization;
  checkboxValue: (id: string) => boolean;
  checkboxToggle: (id: string) => void;
}

export function SpecializationsListRow({
  specialization,
  checkboxToggle,
  checkboxValue,
}: ISpecializationsListRowProps) {
  const { isOpen, toggle } = useToggle();

  return (
    <>
      <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            checked={checkboxValue(specialization.id)}
            onChange={() => checkboxToggle(specialization.id)}
          />
        </TableCell>
        <TableCell padding="checkbox" sx={{ textAlign: 'center' }}>
          <IconButton size="small" onClick={toggle}>
            <EditRoundedIcon />
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {specialization.title}
        </TableCell>
        <TableCell component="th" scope="row">
          {DateTime.fromISO(specialization.createdAt).toHTTP()}
        </TableCell>
        <TableCell component="th" scope="row">
          {DateTime.fromISO(specialization.updatedAt).toHTTP()}
        </TableCell>
      </TableRow>
      <UpdateSpecializationModal
        specialization={specialization}
        open={isOpen}
        handleToggle={toggle}
      />
    </>
  );
}

interface ISpecializationsListActionBarProps {
  selected: string[];
  resetSelected: () => void;
}

export function SpecializationsListActionsBar({
  selected,
  resetSelected,
}: ISpecializationsListActionBarProps) {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const { mutate: bulkDeleteSpecializations, isLoading } =
    useBulkDeleteSpecializationsById({
      onSuccess: () => {
        queryClient.invalidateQueries(INDEX_SPECIALIZATIONS_QUERY_KEY);
        enqueueSnackbar('Specializations deleted successfully', {
          variant: 'success',
        });
        resetSelected();
      },
    });

  if (selected.length === 0) return null;
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{
        p: 2,
        background: theme.palette.grey[100],
      }}
    >
      <Typography>{selected.length} Item Selected</Typography>
      <IconButton
        color="error"
        onClick={() => bulkDeleteSpecializations({ ids: selected })}
      >
        <DeleteRoundedIcon color="error" />
      </IconButton>
    </Stack>
  );
}
