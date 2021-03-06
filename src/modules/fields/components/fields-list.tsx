import { Button } from '@mui/material';
import {
  Table,
  TableBody,
  TableBodyRow,
  TableCell,
  TableHead,
  TableHeadRow,
  TableActionBar,
  TableContainer,
  TableEmptyBox,
} from 'src/components/table';
import {
  INDEX_FIELDS_QUERY_KEY,
  useBulkDeleteFieldsById,
  useIndexFields,
} from '../fields.query';
import { useQueryClient } from 'react-query';
import { useSnackbar } from 'notistack';
import { IField } from 'src/shared/interfaces/fields.interface';
import { useTableCheckbox } from 'src/hooks/use-table-checkbox.hook';
import { useToggle } from 'src/hooks/use-toggle.hook';
import { UpdateFieldModal } from './update-field-modal';
import { useHasPermission } from 'src/hooks/use-has-permission.hook';
import { AccountRole } from 'src/shared/enums/accounts.enum';
import { formatDateTime } from 'src/lib/datetime.lib';

export function FieldsList() {
  const { hasPermission } = useHasPermission({
    roles: [AccountRole.ADMIN],
  });
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
    <TableContainer loading={isIndexFieldsLoading} error={isIndexFieldsError}>
      <FieldsListActionsBar selected={selected} resetSelected={resetSelected} />
      <Table>
        <TableHead>
          <TableHeadRow
            checkable={hasPermission()}
            editable={hasPermission()}
            indeterminate={allInterminateValue()}
            checked={allCheckboxValue()}
            handleAllCheckboxChange={allCheckboxToggle}
          >
            <TableCell>Title</TableCell>
            <TableCell>Created At</TableCell>
            <TableCell>Updated At</TableCell>
          </TableHeadRow>
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
      {!fieldsRes?.data?.length && <TableEmptyBox />}
    </TableContainer>
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
  const { hasPermission } = useHasPermission({
    roles: [AccountRole.ADMIN],
  });

  return (
    <>
      <TableBodyRow
        checkable={hasPermission()}
        editable={hasPermission()}
        checked={checkboxValue(field.id)}
        handleCheckboxChange={() => checkboxToggle(field.id)}
        handleEditClick={handleToggle}
      >
        <TableCell component="th" scope="row">
          {field.title}
        </TableCell>
        <TableCell component="th" scope="row">
          {formatDateTime(field.createdAt)}
        </TableCell>
        <TableCell component="th" scope="row">
          {formatDateTime(field.updatedAt)}
        </TableCell>
      </TableBodyRow>
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
  const { mutate: bulkDeleteFields } = useBulkDeleteFieldsById({
    onSuccess: () => {
      queryClient.invalidateQueries(INDEX_FIELDS_QUERY_KEY);
      enqueueSnackbar('Fields deleted successfully', { variant: 'success' });
      resetSelected();
    },
  });

  return (
    <TableActionBar items={selected}>
      <Button color="error" onClick={() => bulkDeleteFields({ ids: selected })}>
        Delete
      </Button>
    </TableActionBar>
  );
}
