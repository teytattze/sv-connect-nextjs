import {
  Box,
  Paper,
  Skeleton,
  TableContainer as MuiTableContainer,
  TableContainerProps as MuiTableContainerProps,
} from '@mui/material';
import { ErrorWrapper } from '../error-wrapper';
import { LoadingWrapper } from '../loading-wrapper';

interface ITableContainerProps
  extends Omit<MuiTableContainerProps, 'component'> {
  children: React.ReactNode;
  loading: boolean;
  error?: boolean;
}

export function TableContainer({
  children,
  loading,
  error = false,
  ...muiProps
}: ITableContainerProps) {
  return (
    <LoadingWrapper
      loading={loading}
      type="skeleton"
      renderSkeleton={() => (
        <Box sx={{ width: '100%', px: 1 }}>
          <Skeleton animation="wave" height={32} />
          <Skeleton animation="wave" height={32} />
          <Skeleton animation="wave" height={32} />
          <Skeleton animation="wave" height={32} />
          <Skeleton animation="wave" height={32} />
        </Box>
      )}
    >
      <ErrorWrapper error={error}>
        <MuiTableContainer component={Paper} {...muiProps}>
          {children}
        </MuiTableContainer>
      </ErrorWrapper>
    </LoadingWrapper>
  );
}
