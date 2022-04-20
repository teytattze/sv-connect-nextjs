import { Button } from '@mui/material';
import { DateTime } from 'luxon';
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
import { useQueryClient } from 'react-query';
import { useSnackbar } from 'notistack';
import { ISpecialization } from 'src/shared/interfaces/specializations.interface';
import { useTableCheckbox } from 'src/hooks/use-table-checkbox.hook';
import { useToggle } from 'src/hooks/use-toggle.hook';
import { UpdateSpecializationModal } from './update-specialization-modal';
import {
  INDEX_SPECIALIZATIONS_QUERY_KEY,
  useBulkDeleteSpecializationsById,
  useIndexSpecializations,
} from '../specializations.query';

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
    <TableContainer
      loading={isIndexSpecializationsLoading}
      error={isIndexSpecializationsError}
    >
      <SpecializationsListActionsBar
        selected={selected}
        resetSelected={resetSelected}
      />
      <Table>
        <TableHead>
          <TableHeadRow
            checkable
            editable
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
      {!specializationsRes?.data?.length && <TableEmptyBox />}
    </TableContainer>
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
  const { isOpen, toggle: handleToggle } = useToggle();

  return (
    <>
      <TableBodyRow
        checkable
        editable
        checked={checkboxValue(specialization.id)}
        handleCheckboxChange={() => checkboxToggle(specialization.id)}
        handleEditClick={handleToggle}
      >
        <TableCell component="th" scope="row">
          {specialization.title}
        </TableCell>
        <TableCell component="th" scope="row">
          {DateTime.fromISO(specialization.createdAt).toHTTP()}
        </TableCell>
        <TableCell component="th" scope="row">
          {DateTime.fromISO(specialization.updatedAt).toHTTP()}
        </TableCell>
      </TableBodyRow>
      <UpdateSpecializationModal
        specialization={specialization}
        open={isOpen}
        handleToggle={handleToggle}
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
  const { mutate: bulkDeleteSpecializations } =
    useBulkDeleteSpecializationsById({
      onSuccess: () => {
        queryClient.invalidateQueries(INDEX_SPECIALIZATIONS_QUERY_KEY);
        enqueueSnackbar('Specializations deleted successfully', {
          variant: 'success',
        });
        resetSelected();
      },
    });

  return (
    <TableActionBar items={selected}>
      <Button
        color="error"
        onClick={() => bulkDeleteSpecializations({ ids: selected })}
      >
        Delete
      </Button>
    </TableActionBar>
  );
}
