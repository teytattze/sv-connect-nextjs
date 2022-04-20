import { LoadingButton } from '@mui/lab';
import { Alert, Box, Stack, TextField } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import { FormModal } from 'src/components/form-modal';
import { Select, SelectItem } from 'src/components/select';
import { ICreateSpecializationPayload } from 'src/shared/interfaces/specializations.interface';
import { useIndexFields } from 'src/modules/fields';
import {
  createSpecializationValidation,
  createSpecializationValue,
  ICreateSpecializationForm,
} from '../specializations.form';
import {
  INDEX_SPECIALIZATIONS_QUERY_KEY,
  useCreateSpecialization,
} from '../specializations.query';

interface ICreateSpecializationModalProps {
  open: boolean;
  handleToggle: () => void;
}

export function CreateSpecializationModal({
  open,
  handleToggle,
}: ICreateSpecializationModalProps) {
  const [errorMsg, setErrorMsg] = useState<string>('');
  const { enqueueSnackbar } = useSnackbar();

  const { data: fieldsRes, isLoading: isIndexFieldsLoading } = useIndexFields();

  const {
    handleSubmit,
    control,
    formState: { errors: formErrors },
    reset,
  } = useForm<ICreateSpecializationForm>();

  const queryClient = useQueryClient();
  const { mutate: createSpecialization, isLoading: isSubmitLoading } =
    useCreateSpecialization({
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
      title="New Specialization"
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
          createSpecialization(formattedPayload);
        })}
      >
        <Box sx={{ my: 5 }}>
          <Stack direction="column" spacing={2.5}>
            {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}
            <Controller
              name="title"
              control={control}
              defaultValue={createSpecializationValue.title}
              rules={createSpecializationValidation.title}
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
              defaultValue={createSpecializationValue.fieldIds}
              rules={createSpecializationValidation.fieldIds}
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
          Create
        </LoadingButton>
      </form>
    </FormModal>
  );
}
