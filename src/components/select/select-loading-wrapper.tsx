import { Box, CircularProgress } from '@mui/material';
import { LoadingWrapper } from '../loading-wrapper';

interface ISelectLoadingProps {
  loading: boolean;
}

export function SelectLoading({ loading }: ISelectLoadingProps) {
  return (
    <LoadingWrapper
      type="skeleton"
      loading={loading}
      renderSkeleton={() => (
        <Box
          sx={{
            width: '100%',
            textAlign: 'center',
            pt: 2,
            pb: 1,
          }}
        >
          <CircularProgress size={24} />
        </Box>
      )}
    >
      {null}
    </LoadingWrapper>
  );
}
