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
import { ICreateFieldPayload } from '../../../shared/interfaces/fields.interface';
import { theme } from '../../../styles/theme.style';
import { useIndexSpecializations } from '../../specializations';
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
          <FormTitle title="Create Field" />
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
              Create
            </LoadingButton>
          </form>
        </LoadingWrapper>
      </Paper>
    </Modal>
  );
}
