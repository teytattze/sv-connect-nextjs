import { Box, Collapse, CollapseProps } from '@mui/material';
import { theme } from 'src/styles/theme.style';
import { ErrorWrapper } from '../error-wrapper';
import { LoadingWrapper } from '../loading-wrapper';

interface ITableCollapseProps
  extends Omit<CollapseProps, 'in' | 'timeout' | 'unmountOnExit'> {
  children: React.ReactNode;
  open: boolean;
  loading?: boolean;
  error?: boolean;
}

export function TableCollapse({
  children,
  open,
  loading = false,
  error = false,
  ...muiProps
}: ITableCollapseProps) {
  return (
    <Collapse
      sx={{
        borderTop: `1px solid ${theme.palette.grey[100]}`,
      }}
      in={open}
      timeout="auto"
      unmountOnExit
      {...muiProps}
    >
      <Box sx={{ width: '100%', py: 1 }}>
        <LoadingWrapper type="skeleton" loading={loading}>
          <ErrorWrapper error={error}>{children}</ErrorWrapper>
        </LoadingWrapper>
      </Box>
    </Collapse>
  );
}
