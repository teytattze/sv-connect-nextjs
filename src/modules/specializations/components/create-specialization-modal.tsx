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
import { ICreateSpecializationPayload } from '../../../shared/interfaces/specializations.interface';
import { theme } from '../../../styles/theme.style';
import { useIndexFields } from '../../fields';
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
          <FormTitle title="Create Specialization" />
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
                    <FormControl fullWidth>
                      <InputLabel>Fields</InputLabel>
                      <Select {...field} id="field" label="Fields" multiple>
                        {isIndexFieldsLoading && (
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
                        {fieldsRes?.data?.map(({ id, title }) => (
                          <MenuItem key={id} value={id}>
                            {title}
                          </MenuItem>
                        ))}
                        {fieldsRes?.data?.length === 0 && (
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
                              No Field Available
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
