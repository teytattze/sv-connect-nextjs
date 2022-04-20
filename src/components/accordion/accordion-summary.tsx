import {
  AccordionSummary as MuiAccordionSummary,
  AccordionSummaryProps as MuiAccordionSummaryProps,
  Stack,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface IAccordionSummaryProps
  extends Omit<MuiAccordionSummaryProps, 'children' | 'expandIcon'> {
  children?: React.ReactNode;
  title: string;
}

export function AccordionSummary({
  children,
  title,
  ...props
}: IAccordionSummaryProps) {
  return (
    <MuiAccordionSummary expandIcon={<ExpandMoreIcon />} {...props}>
      <Stack direction="row" alignItems="center" spacing={children ? 1 : 0}>
        <Typography sx={{ fontWeight: 500, textTransform: 'uppercase' }}>
          {title}
        </Typography>
        {children}
      </Stack>
    </MuiAccordionSummary>
  );
}
