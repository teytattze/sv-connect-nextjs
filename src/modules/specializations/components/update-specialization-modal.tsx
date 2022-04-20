import { LoadingButton } from '@mui/lab';
import { Alert, Box, Stack, TextField } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import { FormModal } from 'src/components/form-modal';
import {
  ICreateSpecializationPayload,
  ISpecialization,
} from 'src/shared/interfaces/specializations.interface';
import { useIndexFields } from 'src/modules/fields';
import {
  IUpdateSpecializationForm,
  updateSpecializationValidation,
} from '../specializations.form';
import {
  INDEX_SPECIALIZATIONS_QUERY_KEY,
  useUpdateSpecialization,
} from '../specializations.query';
import { Select, SelectItem } from 'src/components/select';

interface IUpdateSpecializationModalProps {
  specialization: ISpecialization;
  open: boolean;
  handleToggle: () => void;
}

export function UpdateSpecializationModal({
  specialization,
  open,
  handleToggle,
}: IUpdateSpecializationModalProps) {
  const [errorMsg, setErrorMsg] = useState<string>('');
  const { enqueueSnackbar } = useSnackbar();

  const { data: fieldsRes, isLoading: isIndexFieldsLoading } = useIndexFields();

  const {
    handleSubmit,
    control,
    formState: { errors: formErrors },
    reset,
  } = useForm<IUpdateSpecializationForm>();

  const queryClient = useQueryClient();
  const { mutate: updateSpecialization, isLoading: isSubmitLoading } =
    useUpdateSpecialization(specialization.id, {
      onError: ({ response }) => {
        if (response?.data.message) setErrorMsg(response?.data.message);
        else setErrorMsg('There is something unexpected happened');
      },
      onSuccess: () => {
        queryClient.invalidateQueries(INDEX_SPECIALIZATIONS_QUERY_KEY);
        enqueueSnackbar('Specialization created successfully', {
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
      title="Update Specialization"
      submitLoading={isSubmitLoading}
      open={open}
      handleClose={handleClose}
    >
      <form
        onSubmit={handleSubmit((payload) => {
          const formattedPayload: ICreateSpecializationPayload = {
            title: payload.title,
            fields: payload.fieldIds.map((id) => ({ id })),
          };
          updateSpecialization(formattedPayload);
        })}
      >
        <Box sx={{ my: 5 }}>
          <Stack direction="column" spacing={2.5}>
            {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}
            <Controller
              name="title"
              control={control}
              defaultValue={specialization.title}
              rules={updateSpecializationValidation.title}
              render={({ field }) => (
                <TextField
                  {...field}
                  id="title"
                  label="Specialization Title"
                  variant="outlined"
                  helperText={formErrors.title?.message}
                  error={!!formErrors.title}
                />
              )}
            />
            <Controller
              name="fieldIds"
              control={control}
              defaultValue={specialization.fields.map((field) => field.id)}
              rules={updateSpecializationValidation.fieldIds}
              render={({ field }) => (
                <Select
                  {...field}
                  id="fields"
                  label="Fields"
                  loading={isIndexFieldsLoading}
                  empty={!fieldsRes?.data?.length}
                  multiple
                >
                  {fieldsRes?.data?.map(({ id, title }) => (
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
