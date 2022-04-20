import { Stack, Typography } from '@mui/material';
import { theme } from 'src/styles/theme.style';

interface ITableActionBarProps {
  children: React.ReactNode;
  items: string[];
}

export function TableActionBar({ children, items }: ITableActionBarProps) {
  return (
    <>
      {items.length ? (
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            p: 2,
            background: theme.palette.grey[100],
          }}
        >
          <Typography>{items.length} Item Selected</Typography>
          {children}
        </Stack>
      ) : null}
    </>
  );
}
