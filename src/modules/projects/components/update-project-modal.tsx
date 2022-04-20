import { LoadingButton } from '@mui/lab';
import { Alert, Box, Stack, TextField } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import { FormModal } from 'src/components/form-modal';
import { Select, SelectItem } from 'src/components/select';
import { useIndexFields } from 'src/modules/fields';
import { useIndexSpecializations } from 'src/modules/specializations';
import {
  IProject,
  IUpdateProjectPayload,
} from 'src/shared/interfaces/projects.interface';
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
    <FormModal
      title="Edit Project"
      submitLoading={isSubmitLoading}
      open={open}
      handleClose={handleClose}
    >
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
              defaultValue={project.specializations.map(({ id }) => id)}
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
