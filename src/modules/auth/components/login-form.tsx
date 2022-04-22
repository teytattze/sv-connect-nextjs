import { LoadingButton } from '@mui/lab';
import {
  Alert,
  Box,
  Button,
  Divider,
  Link,
  Paper,
  Stack,
  TextField,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { ILoginPayload } from 'src/shared/interfaces/auth.interface';
import { LoadingWrapper } from 'src/components/loading-wrapper';
import { FormTitle } from 'src/components/form-title';
import { loginValidation, loginValue } from '../auth.form';
import { useLogin } from '../auth.query';
import { useAuth } from '../auth.provider';

export function LoginForm() {
  const { revalidateAccount } = useAuth();
  const [errorMsg, setErrorMsg] = useState<string>('');
  const { enqueueSnackbar } = useSnackbar();
  const { push } = useRouter();

  const {
    handleSubmit,
    control,
    formState: { errors: formErrors },
  } = useForm<ILoginPayload>();

  const { isLoading, mutate: login } = useLogin({
    onError: ({ response }) => {
      if (response?.data.message) setErrorMsg(response?.data.message);
      else setErrorMsg('There is something unexpected happened');
    },
    onSuccess: () => {
      revalidateAccount();
      enqueueSnackbar('Login successfully', { variant: 'success' });
      push('/dashboard');
    },
  });

  return (
    <Paper
      sx={{
        p: 5,
        mx: 'auto',
        width: '100%',
        maxWidth: '520px',
      }}
    >
      <LoadingWrapper loading={isLoading}>
        <FormTitle title="Login" />
        <form onSubmit={handleSubmit((payload) => login(payload))}>
          <Box sx={{ my: 5 }}>
            <Stack direction="column" spacing={2.5}>
              {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}
              <Controller
                name="email"
                control={control}
                defaultValue={loginValue.email}
                rules={loginValidation.email}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="email"
                    label="E-mail"
                    variant="outlined"
                    helperText={formErrors.email?.message}
                    error={!!formErrors.email}
                  />
                )}
              />
              <Controller
                name="password"
                control={control}
                defaultValue={loginValue.password}
                rules={loginValidation.password}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="password"
                    type="password"
                    label="Password"
                    variant="outlined"
                    helperText={formErrors.password?.message}
                    error={!!formErrors.password}
                  />
                )}
              />
            </Stack>
            <Box sx={{ textAlign: 'right' }}>
              <NextLink passHref href="/forgot-password">
                <Link
                  variant="caption"
                  sx={{
                    color: 'text.secondary',
                    p: 0.5,
                    cursor: 'pointer',
                    ':hover': {
                      color: 'text.primary',
                    },
                    textDecoration: 'none',
                  }}
                >
                  Forgot Password?
                </Link>
              </NextLink>
            </Box>
          </Box>
          <LoadingButton
            type="submit"
            variant="contained"
            loading={isLoading}
            fullWidth
            disableElevation
          >
            Sign In
          </LoadingButton>
        </form>
        <Divider
          sx={{
            my: 2.5,
            color: 'text.disabled',
            fontWeight: 500,
            fontSize: 'caption.fontSize',
          }}
        >
          NO ACCOUNT?
        </Divider>
        <NextLink passHref href="/register">
          <Button
            component={Link}
            variant="text"
            endIcon={<ArrowForwardIcon />}
            fullWidth
            disableElevation
          >
            Sign Up Now
          </Button>
        </NextLink>
      </LoadingWrapper>
    </Paper>
  );
}
