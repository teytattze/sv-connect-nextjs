import { LoadingButton } from '@mui/lab';
import {
  Alert,
  Box,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import { FormTitle } from '../../../components/form-title';
import { LoadingWrapper } from '../../../components/loading-wrapper';
import {
  IField,
  IUpdateFieldPayload,
} from '../../../shared/interfaces/fields.interface';
import { theme } from '../../../styles/theme.style';
import { useIndexSpecializations } from '../../specializations';
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
          <FormTitle title="Update Field" />
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
                    <FormControl fullWidth>
                      <InputLabel>Specializations</InputLabel>
                      <Select
                        {...field}
                        id="specializations"
                        label="Specializations"
                        multiple
                      >
                        {isIndexSpecializationsLoading && (
                          <Box
                            sx={{
                              width: '100%',
                              textAlign: 'center',
                              pt: 2,
                              pb: 1,
                            }}
                          >
                            <CircularProgress size={24} />
                          </Box>
                        )}
                        {specializationsRes?.data?.map(({ id, title }) => (
                          <MenuItem key={id} value={id}>
                            {title}
                          </MenuItem>
                        ))}
                        {specializationsRes?.data?.length === 0 && (
                          <Box
                            sx={{
                              background: theme.palette.grey[100],
                              py: 4,
                              textAlign: 'center',
                            }}
                          >
                            <Typography
                              color="text.secondary"
                              variant="body2"
                              sx={{
                                fontWeight: 500,
                                textTransform: 'uppercase',
                              }}
                            >
                              No Specialization Available
                            </Typography>
                          </Box>
                        )}
                      </Select>
                    </FormControl>
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
