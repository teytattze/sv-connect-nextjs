import { Stack, Typography, TypographyProps } from '@mui/material';
import { theme } from 'src/styles/theme.style';

interface EmptyDataBoxProps {
  children?: React.ReactNode;
  message?: string;
  backgroundColor?: 'white' | 'grey';
  textVariant?: TypographyProps['variant'];
  textUppercase?: boolean;
}

export function EmptyDataBox({
  children,
  message,
  backgroundColor = 'white',
  textVariant = 'body2',
  textUppercase = true,
}: EmptyDataBoxProps) {
  return (
    <Stack
      direction="column"
      alignItems="center"
      justifyContent="center"
      spacing={children ? 0.5 : 0}
      sx={{
        borderRadius: 1,
        background: backgroundColorMap[backgroundColor],
        width: '100%',
        py: 4,
        px: 2,
      }}
    >
      <Typography
        color="text.secondary"
        variant={textVariant}
        sx={{
          fontWeight: 500,
          textTransform: textUppercase ? 'uppercase' : 'none',
        }}
      >
        {message || 'No data available'}
      </Typography>
      {children}
    </Stack>
  );
}

const backgroundColorMap: Record<
  NonNullable<EmptyDataBoxProps['backgroundColor']>,
  string
> = {
  white: theme.palette.background.paper,
  grey: theme.palette.grey[100],
};
