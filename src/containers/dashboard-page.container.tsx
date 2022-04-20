import { Box, IconButton, Stack, Typography } from '@mui/material';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { useRouter } from 'next/router';

export interface IDashboardPageContainerProps {
  title: string;
  sideButton?: React.ReactNode;
  children: React.ReactNode;
}

export function DashboardPageContainer({
  title,
  sideButton,
  children,
}: IDashboardPageContainerProps) {
  const { back } = useRouter();

  return (
    <Stack direction="column" spacing={2} sx={{ p: 2 }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ px: 1 }}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <IconButton onClick={() => back()}>
            <ArrowBackRoundedIcon />
          </IconButton>
          <Typography
            variant="h5"
            component="h1"
            sx={{
              fontWeight: 'bold',
            }}
          >
            {title}
          </Typography>
        </Stack>
        {sideButton}
      </Stack>
      <Box>{children}</Box>
    </Stack>
  );
}
