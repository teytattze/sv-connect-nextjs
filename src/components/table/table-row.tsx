import {
  TableRow as MuiTableRow,
  TableCell as MuiTableCell,
  TableRowProps as MuiTableRowProps,
  Checkbox,
  IconButton,
} from '@mui/material';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';

interface IRowCheckboxProps {
  checked?: boolean;
  indeterminate?: boolean;
  handleAllCheckboxChange?: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleCheckboxChange?: () => void;
}

interface IRowEditProps {
  handleEditClick?: () => void;
}

interface IRowExpandProps {
  expanded?: boolean;
  handleExpandClick?: () => void;
}

interface ITableHeadRowProps extends IRowCheckboxProps, MuiTableRowProps {
  children: React.ReactNode;
  checkable?: boolean;
  editable?: boolean;
  expandable?: boolean;
}

export function TableHeadRow({
  children,
  checkable,
  editable,
  expandable,
  checked,
  indeterminate,
  handleAllCheckboxChange,
  handleCheckboxChange,
  ...muiProps
}: ITableHeadRowProps) {
  return (
    <MuiTableRow {...muiProps}>
      {expandable && <MuiTableCell padding="checkbox"></MuiTableCell>}
      {checkable && (
        <MuiTableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={indeterminate}
            checked={checked}
            onChange={handleAllCheckboxChange}
          />
        </MuiTableCell>
      )}
      {editable && <MuiTableCell padding="checkbox"></MuiTableCell>}
      {children}
    </MuiTableRow>
  );
}

interface ITableBodyRowProps
  extends IRowCheckboxProps,
    IRowEditProps,
    IRowExpandProps,
    MuiTableRowProps {
  children: React.ReactNode;
  checkable?: boolean;
  editable?: boolean;
  expandable?: boolean;
}

export function TableBodyRow({
  children,
  checkable,
  checked,
  editable,
  expandable,
  expanded,
  indeterminate,
  handleAllCheckboxChange,
  handleCheckboxChange,
  handleEditClick,
  handleExpandClick,
  ...muiProps
}: ITableBodyRowProps) {
  return (
    <MuiTableRow
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      {...muiProps}
    >
      {expandable && (
        <MuiTableCell padding="checkbox" sx={{ textAlign: 'center' }}>
          <IconButton size="small" onClick={handleExpandClick}>
            {expanded ? (
              <KeyboardArrowUpRoundedIcon />
            ) : (
              <KeyboardArrowDownRoundedIcon />
            )}
          </IconButton>
        </MuiTableCell>
      )}
      {checkable && (
        <MuiTableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={indeterminate}
            checked={checked}
            onChange={handleCheckboxChange}
          />
        </MuiTableCell>
      )}
      {editable && (
        <MuiTableCell padding="checkbox">
          <IconButton size="small" onClick={handleEditClick}>
            <EditRoundedIcon />
          </IconButton>
        </MuiTableCell>
      )}
      {children}
    </MuiTableRow>
  );
}
