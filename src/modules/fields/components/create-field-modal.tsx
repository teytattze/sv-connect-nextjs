import { LoadingButton } from '@mui/lab';
import { Alert, Box, Stack, TextField } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import { FormModal } from 'src/components/form-modal';
import { Select, SelectItem } from 'src/components/select';
import { ICreateFieldPayload } from 'src/shared/interfaces/fields.interface';
import { useIndexSpecializations } from 'src/modules/specializations';
import {
  createFieldValidation,
  createFieldValue,
  ICreateFieldForm,
} from '../fields.form';
import { INDEX_FIELDS_QUERY_KEY, useCreateField } from '../fields.query';

interface ICreateFieldModalProps {
  open: boolean;
  handleToggle: () => void;
}

export function CreateFieldModal({
  open,
  handleToggle,
}: ICreateFieldModalProps) {
  const [errorMsg, setErrorMsg] = useState<string>('');
  const { enqueueSnackbar } = useSnackbar();

  const { data: specializationsRes, isLoading: isIndexSpecializationsLoading } =
    useIndexSpecializations();

  const {
    handleSubmit,
    control,
    formState: { errors: formErrors },
    reset,
  } = useForm<ICreateFieldForm>();

  const queryClient = useQueryClient();
  const { mutate: createField, isLoading: isSubmitLoading } = useCreateField({
    onError: ({ response }) => {
      if (response?.data.message) setErrorMsg(response?.data.message);
      else setErrorMsg('There is something unexpected happened');
    },
    onSuccess: () => {
      queryClient.invalidateQueries(INDEX_FIELDS_QUERY_KEY);
      enqueueSnackbar('Field created successfully', { variant: 'success' });
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
      title="New Field"
      submitLoading={isSubmitLoading}
      open={open}
      handleClose={handleClose}
    >
      <form
        onSubmit={handleSubmit((payload) => {
          const formattedPayload: ICreateFieldPayload = {
            title: payload.title,
            specializations: payload.specializationIds.map((id) => ({
              id,
            })),
          };
          createField(formattedPayload);
        })}
      >
        <Box sx={{ my: 5 }}>
          <Stack direction="column" spacing={2.5}>
            {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}
            <Controller
              name="title"
              control={control}
              defaultValue={createFieldValue.title}
              rules={createFieldValidation.title}
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
              defaultValue={createFieldValue.specializationIds}
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
          Create
        </LoadingButton>
      </form>
    </FormModal>
  );
}
