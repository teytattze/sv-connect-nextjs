import { LoadingButton } from '@mui/lab';
import { Alert, Box, Stack, TextField } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import { InvitationStatus } from 'src/shared/enums/invitations.enum';
import { ICreateInvitationPayload } from 'src/shared/interfaces/invitations.interface';
import { useAuth } from 'src/modules/auth';
import { useGetStudentByAccountId } from 'src/modules/students';
import {
  createInvitationValidation,
  createInvitationValue,
  ICreateInvitationForm,
} from '../invitations.form';
import {
  INDEX_INVITATIONS_QUERY_KEY,
  useCreateInvitation,
} from '../invitations.query';
import { FormModal } from 'src/components/form-modal';

interface ICreateInvitationModalProps {
  supervisorId: string;
  open: boolean;
  handleToggle: () => void;
}

export function CreateInvitationModal({
  supervisorId,
  open,
  handleToggle,
}: ICreateInvitationModalProps) {
  const [errorMsg, setErrorMsg] = useState<string>('');
  const { enqueueSnackbar } = useSnackbar();

  const { account, isLoading } = useAuth();
  const {
    data: studentRes,
    isLoading: isGetStudentLoading,
    isError: isGetStudentError,
  } = useGetStudentByAccountId(account!.id, {
    enabled: !isLoading && !!account,
  });

  const {
    handleSubmit,
    control,
    formState: { errors: formErrors },
    reset,
  } = useForm<ICreateInvitationForm>();

  const queryClient = useQueryClient();
  const { mutate: updateProfile, isLoading: isSubmitLoading } =
    useCreateInvitation({
      onError: ({ response }) => {
        if (response?.data.message) setErrorMsg(response?.data.message);
        else setErrorMsg('There is something unexpected happened');
      },
      onSuccess: () => {
        queryClient.invalidateQueries(INDEX_INVITATIONS_QUERY_KEY);
        enqueueSnackbar('Invitation created successfully', {
          variant: 'success',
        });
        handleClose();
      },
    });

  const handleClose = () => {
    handleToggle();
    setErrorMsg('');
    reset();
  };

  return (
    <FormModal
      title="New Invitation"
      fetchLoading={isGetStudentLoading}
      submitLoading={isSubmitLoading}
      error={isGetStudentError}
      open={open}
      handleClose={handleClose}
    >
      <form
        onSubmit={handleSubmit((payload) => {
          const formattedPayload: ICreateInvitationPayload = {
            message: payload.message,
            status: InvitationStatus.PENDING,
            student: { id: studentRes!.data!.id },
            supervisor: { id: supervisorId },
          };
          updateProfile(formattedPayload);
        })}
      >
        <Box sx={{ my: 5 }}>
          <Stack direction="column" spacing={2.5}>
            {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}
            <Controller
              name="message"
              control={control}
              defaultValue={createInvitationValue.message}
              rules={createInvitationValidation.message}
              render={({ field }) => (
                <TextField
                  {...field}
                  id="message"
                  label="Message"
                  variant="outlined"
                  multiline
                  rows={4}
                  helperText={formErrors.message?.message}
                  error={!!formErrors.message}
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
          Submit
        </LoadingButton>
      </form>
    </FormModal>
  );
}
