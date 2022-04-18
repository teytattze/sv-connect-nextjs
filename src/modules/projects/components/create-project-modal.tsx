import { LoadingButton } from '@mui/lab';
import {
  Alert,
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
import { Box } from '@mui/system';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import { FormTitle } from '../../../components/form-title';
import { LoadingWrapper } from '../../../components/loading-wrapper';
import { ICreateProjectPayload } from '../../../shared/interfaces/projects.interface';
import { theme } from '../../../styles/theme.style';
import { useIndexFields } from '../../fields';
import { useIndexSpecializations } from '../../specializations';
import {
  createProjectValidation,
  createProjectValue,
  ICreateProjectForm,
} from '../projects.form';
import {
  GET_PROJECT_BY_STUDENT_ID_QUERY_KEY,
  useCreateProject,
} from '../projects.query';

export interface ICreateProjectModalProps {
  studentId: string;
  open: boolean;
  handleToggle: () => void;
}

export function CreateProjectModal({
  studentId,
  open,
  handleToggle,
}: ICreateProjectModalProps) {
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
  } = useForm<ICreateProjectForm>();

  const queryClient = useQueryClient();
  const { mutate: createProject, isLoading: isSubmitLoading } =
    useCreateProject({
      onError: ({ response }) => {
        if (response?.data.message) setErrorMsg(response?.data.message);
        else setErrorMsg('There is something unexpected happened');
      },
      onSuccess: () => {
        queryClient.invalidateQueries([
          GET_PROJECT_BY_STUDENT_ID_QUERY_KEY,
          studentId,
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
          <FormTitle title="Create Project" />
          <form
            onSubmit={handleSubmit((payload) => {
              const formattedPayload: ICreateProjectPayload = {
                title: payload.title,
                summary: payload.summary,
                field: { id: payload.fieldId },
                specializations: payload.specializationIds.map((id) => ({
                  id,
                })),
                student: { id: studentId },
              };
              createProject(formattedPayload);
            })}
          >
            <Box sx={{ my: 5 }}>
              <Stack direction="column" spacing={2.5}>
                {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}
                <Controller
                  name="title"
                  control={control}
                  defaultValue={createProjectValue.title}
                  rules={createProjectValidation.title}
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
                  defaultValue={createProjectValue.summary}
                  rules={createProjectValidation.summary}
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
                  defaultValue={createProjectValue.fieldId}
                  rules={createProjectValidation.fieldId}
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
                  defaultValue={createProjectValue.specializationIds}
                  rules={createProjectValidation.fieldId}
                  render={({ field }) => (
                    <FormControl
                      fullWidth
                      error={!!formErrors.specializationIds}
                    >
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
