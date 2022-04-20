import { LoadingButton } from '@mui/lab';
import { Alert, Stack, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import { FormModal } from 'src/components/form-modal';
import { Select, SelectItem } from 'src/components/select';
import { useIndexFields } from 'src/modules/fields';
import { useIndexSpecializations } from 'src/modules/specializations';
import { ICreateProjectPayload } from 'src/shared/interfaces/projects.interface';
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
    <FormModal
      title="New Project"
      submitLoading={isSubmitLoading}
      open={open}
      handleClose={handleClose}
    >
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
                <Select
                  {...field}
                  id="field"
                  label="Field"
                  loading={isIndexFieldsLoading}
                  empty={!fieldsRes?.data?.length}
                  error={!!formErrors.fieldId}
                  helperText={formErrors.fieldId?.message}
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
            <Controller
              name="specializationIds"
              control={control}
              defaultValue={createProjectValue.specializationIds}
              rules={createProjectValidation.fieldId}
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
