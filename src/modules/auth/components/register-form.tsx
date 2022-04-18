import { LoadingButton } from '@mui/lab';
import {
  Alert,
  Box,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Link,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import NextLink from 'next/link';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { IRegisterPayload } from '../../../shared/interfaces/auth.interface';
import { useRegister } from '../auth.query';
import { LoadingWrapper } from '../../../components/loading-wrapper';
import { FormTitle } from '../../../components/form-title';
import { registerValidation, registerValue } from '../auth.form';
import { AccountRole } from '../../../shared/enums/accounts.enum';
import { useRouter } from 'next/router';

export function RegisterForm() {
  const [errorMsg, setErrorMsg] = useState<string>('');
  const { enqueueSnackbar } = useSnackbar();
  const { push } = useRouter();

  const {
    handleSubmit,
    control,
    formState: { errors: formErrors },
  } = useForm<IRegisterPayload>();

  const { isLoading, mutate: register } = useRegister({
    onError: ({ response }) => {
      if (response?.data.message) setErrorMsg(response?.data.message);
      else setErrorMsg('There is something unexpected happened');
    },
    onSuccess: () => {
      enqueueSnackbar('Register successfully', { variant: 'success' });
      push('/dashboard', undefined, {shallow: false});
    },
  });

  return (
    <Paper sx={{ p: 5, mx: 'auto', width: '100%', maxWidth: '500px' }}>
      <LoadingWrapper loading={isLoading}>
        <FormTitle title="Sign Up" />
        <form
          onSubmit={handleSubmit(
            ({
              firstName,
              lastName,
              email,
              password,
              role,
            }: IRegisterPayload) =>
              register({ firstName, lastName, email, password, role })
          )}
        >
          <Box sx={{ my: 5 }}>
            <Stack direction="column" spacing={2.5}>
              {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}
              <Controller
                name="firstName"
                control={control}
                defaultValue={registerValue.firstName}
                rules={registerValidation.firstName}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="First Name"
                    variant="outlined"
                    helperText={formErrors.firstName?.message}
                    error={!!formErrors.firstName}
                  />
                )}
              />
              <Controller
                name="lastName"
                control={control}
                defaultValue={registerValue.lastName}
                rules={registerValidation.lastName}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Last Name"
                    variant="outlined"
                    helperText={formErrors.lastName?.message}
                    error={!!formErrors.lastName}
                  />
                )}
              />
              <Controller
                name="email"
                control={control}
                defaultValue={registerValue.email}
                rules={registerValidation.email}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Email"
                    variant="outlined"
                    helperText={formErrors.email?.message}
                    error={!!formErrors.email}
                  />
                )}
              />
              <Controller
                name="password"
                control={control}
                defaultValue={registerValue.password}
                rules={registerValidation.password}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="password"
                    label="Password"
                    variant="outlined"
                    helperText={formErrors.password?.message}
                    error={!!formErrors.password}
                  />
                )}
              />
              <Controller
                name="role"
                control={control}
                defaultValue={registerValue.role}
                render={({ field }) => (
                  <FormControl sx={{ px: 0.5 }}>
                    <FormLabel>Role</FormLabel>
                    <RadioGroup {...field} row name="role">
                      <FormControlLabel
                        value={AccountRole.STUDENT}
                        control={<Radio />}
                        label="Student"
                      />
                      <FormControlLabel
                        value={AccountRole.SUPERVISOR}
                        control={<Radio />}
                        label="Supervisor"
                      />
                    </RadioGroup>
                  </FormControl>
                )}
              />
            </Stack>
          </Box>
          <LoadingButton
            type="submit"
            variant="contained"
            loading={false}
            fullWidth
            disableElevation
          >
            Sign Up
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
          HAVE ACCOUNT?
        </Divider>
        <NextLink passHref href="/">
          <Button
            component={Link}
            variant="text"
            endIcon={<ArrowForwardIcon />}
            fullWidth
            disableElevation
          >
            Sign In Now
          </Button>
        </NextLink>
      </LoadingWrapper>
    </Paper>
  );
}
