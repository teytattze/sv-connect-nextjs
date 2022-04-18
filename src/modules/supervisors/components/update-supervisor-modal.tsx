import { LoadingButton } from '@mui/lab';
import {
  Alert,
  Box,
  CircularProgress,
  FormControl,
  FormHelperText,
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
  IProject,
  IUpdateProjectPayload,
} from '../../../shared/interfaces/projects.interface';
import {
  ISupervisor,
  IUpdateSupervisorPayload,
} from '../../../shared/interfaces/supervisors.interface';
import { theme } from '../../../styles/theme.style';
import { useIndexFields } from '../../fields';
import { useIndexSpecializations } from '../../specializations';
import {
  IUpdateSupervisorForm,
  updateSupervisorValidation,
} from '../supervisors.form';
import {
  GET_SUPERVISOR_BY_ACCUONT_ID_QUERY_KEY,
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
          GET_SUPERVISOR_BY_ACCUONT_ID_QUERY_KEY,
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
          <FormTitle title="Edit Supervisor" />
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
                    <FormControl fullWidth error={!!formErrors.fieldId}>
                      <InputLabel>Field</InputLabel>
                      <Select {...field} id="field" label="Field">
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
                      <FormHelperText error={!!formErrors.fieldId}>
                        {formErrors.fieldId?.message}
                      </FormHelperText>
                    </FormControl>
                  )}
                />
                <Controller
                  name="specializationIds"
                  control={control}
                  defaultValue={supervisor.specializations.map(({ id }) => id)}
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
