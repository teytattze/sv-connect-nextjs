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
  paddingSize?: 'default' | 'none';
}

export function AccordionDetails({
  children,
  paddingSize = 'default',
  loading = false,
  error = false,
  ...props
}: IAccordionDetailsProps) {
  return (
    <MuiAccordionDetails sx={{ p: paddingMap[paddingSize] }} {...props}>
      <LoadingWrapper type="skeleton" loading={loading}>
        <ErrorWrapper error={error}>{children}</ErrorWrapper>
      </LoadingWrapper>
    </MuiAccordionDetails>
  );
}

const paddingMap: Record<
  NonNullable<IAccordionDetailsProps['paddingSize']>,
  number
> = {
  default: 2,
  none: 0,
};
