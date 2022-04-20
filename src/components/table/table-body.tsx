import {
  TableBody as MuiTableBody,
  TableBodyProps as MuiTableBodyProps,
} from '@mui/material';

interface ITableBodyProps extends MuiTableBodyProps {
  children: React.ReactNode;
}

export function TableBody({ children, ...muiProps }: ITableBodyProps) {
  return <MuiTableBody {...muiProps}>{children}</MuiTableBody>;
}
