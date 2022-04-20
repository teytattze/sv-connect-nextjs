import { Table as MuiTable, TableProps as MuiTableProps } from '@mui/material';

interface ITableProps extends MuiTableProps {
  children: React.ReactNode;
}

export function Table({ children, ...muiProps }: ITableProps) {
  return (
    <MuiTable stickyHeader sx={{ width: '100%' }} {...muiProps}>
      {children}
    </MuiTable>
  );
}
