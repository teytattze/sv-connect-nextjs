import React from 'react';
import { Box, Skeleton } from '@mui/material';

export interface LoadingWrapperProps {
  loading?: boolean;
  type?: 'skeleton' | 'disable';
  renderSkeleton?: () => React.ReactElement | null;
  children: React.ReactNode;
}

export function LoadingWrapper({
  loading = false,
  type = 'disable',
  renderSkeleton = defaultSkeleton,
  children,
}: LoadingWrapperProps) {
  if (type === 'skeleton' && renderSkeleton && loading) {
    return renderSkeleton();
  }

  return (
    <Box
      sx={{
        pointerEvents: loading ? 'none' : 'auto',
        opacity: loading ? 0.74 : 1,
      }}
    >
      {children}
    </Box>
  );
}

function defaultSkeleton() {
  return (
    <Box sx={{ width: '100%', px: 1 }}>
      <Skeleton animation="wave" height={32} />
      <Skeleton animation="wave" height={32} />
      <Skeleton animation="wave" height={32} />
    </Box>
  );
}
