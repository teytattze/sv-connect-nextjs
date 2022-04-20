import {
  TableHead as MuiTableHead,
  TableHeadProps as MuiTableHeadProps,
} from '@mui/material';

interface ITableHeadProps extends MuiTableHeadProps {
  children: React.ReactNode;
}

export function TableHead({ children, ...muiProps }: ITableHeadProps) {
  return <MuiTableHead {...muiProps}>{children}</MuiTableHead>;
}
