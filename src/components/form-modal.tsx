import { Paper, Modal as MuiModal } from '@mui/material';
import { theme } from 'src/styles/theme.style';
import { ErrorWrapper } from './error-wrapper';
import { FormTitle } from './form-title';
import { LoadingWrapper } from './loading-wrapper';

export interface IFormModalProps {
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  fetchLoading?: boolean;
  submitLoading?: boolean;
  error?: boolean;
  open: boolean;
  title: string;
  handleClose: () => void;
}

export function FormModal({
  children,
  size = 'small',
  fetchLoading = false,
  submitLoading = false,
  error = false,
  open,
  title,
  handleClose,
}: IFormModalProps) {
  return (
    <MuiModal
      open={open}
      onClose={handleClose}
      sx={{ px: 2, overflow: 'scroll' }}
    >
      <Paper
        sx={{
          p: 5,
          my: 12,
          mx: 'auto',
          width: '100%',
          maxWidth: sizeMap[size],
          background: theme.palette.background.default,
        }}
      >
        <LoadingWrapper loading={submitLoading}>
          <FormTitle title={title} />
          <LoadingWrapper loading={fetchLoading}>
            <ErrorWrapper error={error}>{children}</ErrorWrapper>
          </LoadingWrapper>
        </LoadingWrapper>
      </Paper>
    </MuiModal>
  );
}

const sizeMap: Record<NonNullable<IFormModalProps['size']>, string> = {
  small: '640px',
  medium: '768px',
  large: '1024px',
};
