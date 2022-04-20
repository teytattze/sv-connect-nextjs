import { Stack, Typography } from '@mui/material';
import { EmptyDataBox } from '../empty-data-box';

interface IAccordionEmptyDataBoxProps {
  children?: React.ReactNode;
  message?: string;
}

export function AccordionEmptyDataBox({
  children,
  message,
}: IAccordionEmptyDataBoxProps) {
  return <EmptyDataBox message={message}>{children}</EmptyDataBox>;
}
