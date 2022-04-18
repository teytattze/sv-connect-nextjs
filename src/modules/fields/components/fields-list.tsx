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
import {
  INDEX_FIELDS_QUERY_KEY,
  useBulkDeleteFieldsById,
  useIndexFields,
} from '../fields.query';
import { useQueryClient } from 'react-query';
import { useSnackbar } from 'notistack';
import { IField } from '../../../shared/interfaces/fields.interface';
import { UpdateFieldModal } from './update-field-modal';
import { useTableCheckbox } from '../../../hooks/use-table-checkbox.hook';
import { useToggle } from '../../../hooks/use-toggle.hook';

export function FieldsList() {
  const {
    data: fieldsRes,
    isLoading: isIndexFieldsLoading,
    isError: isIndexFieldsError,
  } = useIndexFields();
  const {
    allCheckboxToggle,
    allCheckboxValue,
    allInterminateValue,
    checkboxToggle,
    checkboxValue,
    resetSelected,
    selected,
  } = useTableCheckbox(fieldsRes?.data || []);

  return (
    <LoadingWrapper
      loading={isIndexFieldsLoading}
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
        <FieldsListActionsBar
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
            {fieldsRes?.data?.map((field) => (
              <FieldsListRow
                key={field.id}
                field={field}
                checkboxToggle={checkboxToggle}
                checkboxValue={checkboxValue}
              />
            ))}
          </TableBody>
        </Table>
        {(isIndexFieldsError || !fieldsRes || !fieldsRes.data) && (
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

interface IFieldsListRowProps {
  field: IField;
  checkboxValue: (id: string) => boolean;
  checkboxToggle: (id: string) => void;
}

export function FieldsListRow({
  field,
  checkboxToggle,
  checkboxValue,
}: IFieldsListRowProps) {
  const { isOpen, toggle: handleToggle } = useToggle();

  return (
    <>
      <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            checked={checkboxValue(field.id)}
            onChange={() => checkboxToggle(field.id)}
          />
        </TableCell>
        <TableCell padding="checkbox" sx={{ textAlign: 'center' }}>
          <IconButton size="small" onClick={handleToggle}>
            <EditRoundedIcon />
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {field.title}
        </TableCell>
        <TableCell component="th" scope="row">
          {DateTime.fromISO(field.createdAt).toHTTP()}
        </TableCell>
        <TableCell component="th" scope="row">
          {DateTime.fromISO(field.updatedAt).toHTTP()}
        </TableCell>
      </TableRow>
      <UpdateFieldModal
        field={field}
        open={isOpen}
        handleToggle={handleToggle}
      />
    </>
  );
}

interface IFieldsListActionBarProps {
  selected: string[];
  resetSelected: () => void;
}

export function FieldsListActionsBar({
  selected,
  resetSelected,
}: IFieldsListActionBarProps) {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const { mutate: bulkDeleteFields, isLoading } = useBulkDeleteFieldsById({
    onSuccess: () => {
      queryClient.invalidateQueries(INDEX_FIELDS_QUERY_KEY);
      enqueueSnackbar('Fields deleted successfully', { variant: 'success' });
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
        onClick={() => bulkDeleteFields({ ids: selected })}
      >
        <DeleteRoundedIcon color="error" />
      </IconButton>
    </Stack>
  );
}
