import { IconButton, Paper, Stack, Typography } from '@mui/material';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import NotesRoundedIcon from '@mui/icons-material/NotesRounded';
import { useLogout } from '../modules/auth/auth.query';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useAuth } from 'src/modules/auth';

export interface INavbarProps {
  title: string;
  handleToggle?: () => void;
}

export function Navbar({ title, handleToggle }: INavbarProps) {
  const { revalidateAccount } = useAuth();
  const { push } = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { mutate: logout } = useLogout({
    onSettled: () => {
      revalidateAccount();
      enqueueSnackbar('Logout successfully', { variant: 'success' });
      push('/');
    },
  });

  return (
    <nav>
      <Paper
        elevation={1}
        sx={{
          m: 2,
          p: 2,
        }}
      >
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
        >
          <Stack alignItems="center" direction="row" spacing={2}>
            <IconButton size="small" onClick={handleToggle}>
              <NotesRoundedIcon />
            </IconButton>
            <Typography variant="h6" component="h1" fontWeight={600}>
              {title}
            </Typography>
          </Stack>
          <Stack alignItems="center" direction="row" spacing={1}>
            <IconButton
              size="small"
              onClick={() => push('/dashboard/accounts/me')}
            >
              <AccountCircleRoundedIcon />
            </IconButton>
            <IconButton size="small" onClick={() => logout()}>
              <LogoutRoundedIcon />
            </IconButton>
          </Stack>
        </Stack>
      </Paper>
    </nav>
  );
}
