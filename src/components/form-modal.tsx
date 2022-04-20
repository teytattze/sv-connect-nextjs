import { Paper, Modal as MuiModal } from '@mui/material';
import { ErrorWrapper } from './error-wrapper';
import { FormTitle } from './form-title';
import { LoadingWrapper } from './loading-wrapper';

export interface IFormModalProps {
  children: React.ReactNode;
  fetchLoading?: boolean;
  submitLoading?: boolean;
  error?: boolean;
  open: boolean;
  title: string;
  handleClose: () => void;
}

export function FormModal({
  children,
  fetchLoading = false,
  submitLoading = false,
  error = false,
  open,
  title,
  handleClose,
}: IFormModalProps) {
  return (
    <MuiModal open={open} onClose={handleClose}>
      <Paper
        sx={{
          p: 5,
          my: 12,
          mx: 'auto',
          width: '100%',
          maxWidth: '520px',
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
