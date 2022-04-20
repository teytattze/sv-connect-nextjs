import {
  Accordion as MuiAccordion,
  AccordionProps as MuiAccordionProps,
} from '@mui/material';

interface IAccordionProps extends MuiAccordionProps {}

export function Accordion({ children, ...props }: IAccordionProps) {
  return <MuiAccordion {...props}>{children}</MuiAccordion>;
}
