import { TableCell as MuiTableCell, TableCellProps } from '@mui/material';

interface ITableCellProps extends TableCellProps {
  children: React.ReactNode;
}

export function TableCell({ children, ...muiProps }: ITableCellProps) {
  return <MuiTableCell {...muiProps}>{children}</MuiTableCell>;
}
