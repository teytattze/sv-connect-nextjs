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
import { theme } from '../../../styles/theme.style';
import { useIndexFields } from '../../fields';
import { useIndexSpecializations } from '../../specializations';
import { IUpdateProjectForm, updateProjectValidation } from '../projects.form';
import {
  GET_PROJECT_BY_STUDENT_ID_QUERY_KEY,
  useUpdateProjectById,
} from '../projects.query';

export interface IUpdateProjectModalProps {
  project: IProject;
  open: boolean;
  handleToggle: () => void;
}

export function UpdateProjectModal({
  project,
  open,
  handleToggle,
}: IUpdateProjectModalProps) {
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
  } = useForm<IUpdateProjectForm>();

  const queryClient = useQueryClient();
  const { mutate: updateProject, isLoading: isSubmitLoading } =
    useUpdateProjectById(project.id, {
      onError: ({ response }) => {
        if (response?.data.message) setErrorMsg(response?.data.message);
        else setErrorMsg('There is something unexpected happened');
      },
      onSuccess: () => {
        queryClient.invalidateQueries([
          GET_PROJECT_BY_STUDENT_ID_QUERY_KEY,
          project.studentId,
        ]);
        enqueueSnackbar('Project updated successfully', { variant: 'success' });
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
          <FormTitle title="Edit Project" />
          <form
            onSubmit={handleSubmit((payload) => {
              const formattedPayload: IUpdateProjectPayload = {
                title: payload.title,
                summary: payload.summary,
                field: { id: payload.fieldId },
                specializations: payload.specializationIds.map((id) => ({
                  id,
                })),
              };
              updateProject(formattedPayload);
            })}
          >
            <Box sx={{ my: 5 }}>
              <Stack direction="column" spacing={2.5}>
                {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}
                <Controller
                  name="title"
                  control={control}
                  defaultValue={project.title}
                  rules={updateProjectValidation.title}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="title"
                      label="Title"
                      variant="outlined"
                      helperText={formErrors.title?.message}
                      error={!!formErrors.title}
                    />
                  )}
                />
                <Controller
                  name="summary"
                  control={control}
                  defaultValue={project.summary}
                  rules={updateProjectValidation.summary}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="summary"
                      label="Summary"
                      variant="outlined"
                      multiline
                      rows={4}
                      helperText={formErrors.summary?.message}
                      error={!!formErrors.summary}
                    />
                  )}
                />
                <Controller
                  name="fieldId"
                  control={control}
                  defaultValue={project.field.id}
                  rules={updateProjectValidation.fieldId}
                  render={({ field }) => (
                    <FormControl fullWidth>
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
                      {!!formErrors.fieldId && (
                        <FormHelperText color="error">
                          {formErrors.fieldId?.message}
                        </FormHelperText>
                      )}
                    </FormControl>
                  )}
                />
                <Controller
                  name="specializationIds"
                  control={control}
                  defaultValue={project.specializations.map(({ id }) => id)}
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
