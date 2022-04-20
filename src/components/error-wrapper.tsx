import { Alert } from '@mui/material';

interface IErrorWrapperProps {
  children: React.ReactNode;
  error: boolean;
  message?: string;
}

export function ErrorWrapper({ children, error, message }: IErrorWrapperProps) {
  return (
    <>
      {error ? (
        <Alert severity="error">{message || 'There is something wrong'}</Alert>
      ) : (
        children
      )}
    </>
  );
}
