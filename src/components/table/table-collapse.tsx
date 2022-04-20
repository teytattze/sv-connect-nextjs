import { Collapse, CollapseProps } from '@mui/material';
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
    <Collapse in={open} timeout="auto" unmountOnExit {...muiProps}>
      <LoadingWrapper type="skeleton" loading={loading}>
        <ErrorWrapper error={error}>{children}</ErrorWrapper>
      </LoadingWrapper>
    </Collapse>
  );
}
