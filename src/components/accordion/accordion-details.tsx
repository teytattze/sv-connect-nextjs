import {
  AccordionDetails as MuiAccordionDetails,
  AccordionDetailsProps as MuiAccordionDetailsProps,
} from '@mui/material';
import { ErrorWrapper } from '../error-wrapper';
import { LoadingWrapper } from '../loading-wrapper';

interface IAccordionDetailsProps
  extends Omit<MuiAccordionDetailsProps, 'children'> {
  children: React.ReactNode;
  loading?: boolean;
  error?: boolean;
}

export function AccordionDetails({
  children,
  loading = false,
  error = false,
  ...props
}: IAccordionDetailsProps) {
  return (
    <MuiAccordionDetails sx={{ p: 2 }} {...props}>
      <LoadingWrapper type="skeleton" loading={loading}>
        <ErrorWrapper error={error}>{children}</ErrorWrapper>
      </LoadingWrapper>
    </MuiAccordionDetails>
  );
}
