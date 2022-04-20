import { LoadingButton } from '@mui/lab';
import { Alert, Box, Stack, TextField } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import { FormModal } from 'src/components/form-modal';
import { Select, SelectItem } from 'src/components/select';
import {
  IField,
  IUpdateFieldPayload,
} from 'src/shared/interfaces/fields.interface';
import { useIndexSpecializations } from 'src/modules/specializations';
import { IUpdateFieldForm, updateFieldValidation } from '../fields.form';
import { INDEX_FIELDS_QUERY_KEY, useUpdateFieldById } from '../fields.query';

interface IUpdateFieldModalProps {
  field: IField;
  open: boolean;
  handleToggle: () => void;
}

export function UpdateFieldModal({
  field,
  open,
  handleToggle,
}: IUpdateFieldModalProps) {
  const [errorMsg, setErrorMsg] = useState<string>('');
  const { enqueueSnackbar } = useSnackbar();

  const { data: specializationsRes, isLoading: isIndexSpecializationsLoading } =
    useIndexSpecializations();

  const {
    handleSubmit,
    control,
    formState: { errors: formErrors },
    reset,
  } = useForm<IUpdateFieldForm>();

  const queryClient = useQueryClient();
  const { mutate: updateField, isLoading: isSubmitLoading } =
    useUpdateFieldById(field.id, {
      onError: ({ response }) => {
        if (response?.data.message) setErrorMsg(response?.data.message);
        else setErrorMsg('There is something unexpected happened');
      },
      onSuccess: () => {
        queryClient.invalidateQueries(INDEX_FIELDS_QUERY_KEY);
        enqueueSnackbar('Field updated successfully', { variant: 'success' });
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
      title="Update Field"
      submitLoading={isSubmitLoading}
      open={open}
      handleClose={handleClose}
    >
      <form
        onSubmit={handleSubmit((payload) => {
          const formattedPayload: IUpdateFieldPayload = {
            title: payload.title,
            specializations: payload.specializationIds.map((id) => ({
              id,
            })),
          };
          updateField(formattedPayload);
        })}
      >
        <Box sx={{ my: 5 }}>
          <Stack direction="column" spacing={2.5}>
            {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}
            <Controller
              name="title"
              control={control}
              defaultValue={field.title}
              rules={updateFieldValidation.title}
              render={({ field }) => (
                <TextField
                  {...field}
                  id="title"
                  label="Field Title"
                  variant="outlined"
                  helperText={formErrors.title?.message}
                  error={!!formErrors.title}
                />
              )}
            />
            <Controller
              name="specializationIds"
              control={control}
              defaultValue={field.specializations.map(({ id }) => id)}
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
