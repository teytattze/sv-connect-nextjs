import { LoadingButton } from '@mui/lab';
import { Alert, Box, Stack, TextField } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import { FormModal } from 'src/components/form-modal';
import { Select, SelectItem } from 'src/components/select';
import {
  ISupervisor,
  IUpdateSupervisorPayload,
} from 'src/shared/interfaces/supervisors.interface';
import { useIndexFields } from 'src/modules/fields';
import { useIndexSpecializations } from 'src/modules/specializations';
import {
  IUpdateSupervisorForm,
  updateSupervisorValidation,
} from '../supervisors.form';
import {
  GET_SUPERVISOR_BY_ACCOUNT_ID_QUERY_KEY,
  useUpdateSupervisorById,
} from '../supervisors.query';

export interface IUpdateSupervisorModalProps {
  supervisor: ISupervisor;
  open: boolean;
  handleToggle: () => void;
}

export function UpdateSupervisorModal({
  supervisor,
  open,
  handleToggle,
}: IUpdateSupervisorModalProps) {
  const [errorMsg, setErrorMsg] = useState<string>('');
  const { enqueueSnackbar } = useSnackbar();

  const { data: fieldsRes, isLoading: isIndexFieldsLoading } = useIndexFields();
  const { data: specializationsRes, isLoading: isIndexSpecializationsLoading } =
    useIndexSpecializations();

  const {
    handleSubmit,
    control,
    formState: { errors: formErrors },
    reset,
  } = useForm<IUpdateSupervisorForm>();

  const queryClient = useQueryClient();
  const { mutate: updateSupervisor, isLoading: isSubmitLoading } =
    useUpdateSupervisorById(supervisor.id, {
      onError: ({ response }) => {
        if (response?.data.message) setErrorMsg(response?.data.message);
        else setErrorMsg('There is something unexpected happened');
      },
      onSuccess: () => {
        queryClient.invalidateQueries([
          GET_SUPERVISOR_BY_ACCOUNT_ID_QUERY_KEY,
          supervisor.accountId,
        ]);
        enqueueSnackbar('Supervisor updated successfully', {
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
      title="Edit Supervisor"
      submitLoading={isSubmitLoading}
      open={open}
      handleClose={handleClose}
    >
      <form
        onSubmit={handleSubmit((payload) => {
          const formattedPayload: IUpdateSupervisorPayload = {
            capacity: payload.capacity,
            field: { id: payload.fieldId },
            specializations: payload.specializationIds.map((id) => ({
              id,
            })),
          };
          updateSupervisor(formattedPayload);
        })}
      >
        <Box sx={{ my: 5 }}>
          <Stack direction="column" spacing={2.5}>
            {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}
            <Controller
              name="capacity"
              control={control}
              defaultValue={supervisor.capacity}
              rules={updateSupervisorValidation.capacity}
              render={({ field }) => (
                <TextField
                  {...field}
                  id="capacity"
                  label="Capacity"
                  variant="outlined"
                  helperText={formErrors.capacity?.message}
                  error={!!formErrors.capacity}
                />
              )}
            />
            <Controller
              name="fieldId"
              control={control}
              defaultValue={supervisor.field?.id || ''}
              rules={updateSupervisorValidation.fieldId}
              render={({ field }) => (
                <Select
                  {...field}
                  id="field"
                  label="Field"
                  loading={isIndexFieldsLoading}
                  empty={!fieldsRes?.data?.length}
                  error={!!formErrors.fieldId}
                  helperText={formErrors.fieldId?.message}
                >
                  {fieldsRes?.data?.map(({ id, title }) => (
                    <SelectItem key={id} value={id}>
                      {title}
                    </SelectItem>
                  ))}
                </Select>
              )}
            />
            <Controller
              name="specializationIds"
              control={control}
              defaultValue={supervisor.specializations.map(({ id }) => id)}
              render={({ field }) => (
                <Select
                  {...field}
                  id="specializations"
                  label="Specializations"
                  loading={isIndexSpecializationsLoading}
                  empty={!specializationsRes?.data?.length}
                  multiple
                >
                  {specializationsRes?.data?.map(({ id, title }) => (
                    <SelectItem key={id} value={id}>
                      {title}
                    </SelectItem>
                  ))}
                </Select>
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
    </FormModal>
  );
}
