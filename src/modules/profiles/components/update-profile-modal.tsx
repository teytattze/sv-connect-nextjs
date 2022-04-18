import { LoadingButton } from '@mui/lab';
import { Alert, Box, Modal, Paper, Stack, TextField } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import { FormTitle } from '../../../components/form-title';
import { LoadingWrapper } from '../../../components/loading-wrapper';
import {
  IProfile,
  IUpdateProfilePayload,
} from '../../../shared/interfaces/profiles.interface';
import { IUpdateProfileForm, updateProfileValidation } from '../profiles.form';
import {
  GET_PROFILE_BY_ACCOUNT_ID_QUERY_KEY,
  useUpdateProfileById,
} from '../profiles.query';

interface IUpdateProfileModalProps {
  profile: IProfile;
  open: boolean;
  handleToggle: () => void;
}

export function UpdateProfileModal({
  profile,
  open,
  handleToggle,
}: IUpdateProfileModalProps) {
  const [errorMsg, setErrorMsg] = useState<string>('');
  const { enqueueSnackbar } = useSnackbar();

  const {
    handleSubmit,
    control,
    formState: { errors: formErrors },
    reset,
  } = useForm<IUpdateProfileForm>();

  const queryClient = useQueryClient();
  const { mutate: updateProfile, isLoading: isSubmitLoading } =
    useUpdateProfileById(profile.id, {
      onError: ({ response }) => {
        if (response?.data.message) setErrorMsg(response?.data.message);
        else setErrorMsg('There is something unexpected happened');
      },
      onSuccess: () => {
        queryClient.invalidateQueries([
          GET_PROFILE_BY_ACCOUNT_ID_QUERY_KEY,
          profile.accountId,
        ]);
        enqueueSnackbar('Profile updated successfully', { variant: 'success' });
        handleClose();
      },
    });

  const handleClose = () => {
    handleToggle();
    setErrorMsg('');
    reset();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Paper
        sx={{
          p: 5,
          my: 12,
          mx: 'auto',
          width: '100%',
          maxWidth: '520px',
        }}
      >
        <LoadingWrapper loading={isSubmitLoading}>
          <FormTitle title="Update Profile" />
          <form
            onSubmit={handleSubmit((payload) => {
              const formattedPayload: IUpdateProfilePayload = {
                firstName: payload.firstName,
                lastName: payload.lastName,
                headline: payload.headline,
                summary: payload.summary,
              };
              updateProfile(formattedPayload);
            })}
          >
            <Box sx={{ my: 5 }}>
              <Stack direction="column" spacing={2.5}>
                {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}
                <Controller
                  name="firstName"
                  control={control}
                  defaultValue={profile.firstName}
                  rules={updateProfileValidation.firstName}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="firstName"
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
                  defaultValue={profile.lastName}
                  rules={updateProfileValidation.lastName}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="lastName"
                      label="Last Name"
                      variant="outlined"
                      helperText={formErrors.lastName?.message}
                      error={!!formErrors.lastName}
                    />
                  )}
                />
                <Controller
                  name="headline"
                  control={control}
                  defaultValue={profile.headline || ''}
                  rules={updateProfileValidation.headline}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="headline"
                      label="Headline"
                      variant="outlined"
                      helperText={formErrors.headline?.message}
                      error={!!formErrors.headline}
                    />
                  )}
                />
                <Controller
                  name="summary"
                  control={control}
                  defaultValue={profile.summary || ''}
                  rules={updateProfileValidation.summary}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="summary"
                      label="Summary"
                      variant="outlined"
                      helperText={formErrors.summary?.message}
                      error={!!formErrors.summary}
                    />
                  )}
                />
              </Stack>
            </Box>
            <LoadingButton
              type="submit"
              variant="contained"
              loading={isSubmitLoading}
              fullWidth
            >
              Update
            </LoadingButton>
          </form>
        </LoadingWrapper>
      </Paper>
    </Modal>
  );
}
