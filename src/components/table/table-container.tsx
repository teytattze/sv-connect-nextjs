import { Paper, TableContainer as MuiTableContainer } from '@mui/material';

interface ITableContainerProps {
  children: React.ReactNode;
}

export function TableContainer({ children }: ITableContainerProps) {
  return <MuiTableContainer component={Paper}>{children}</MuiTableContainer>;
}
