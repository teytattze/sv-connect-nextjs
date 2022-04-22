import { Box, Grid, Typography, useMediaQuery } from '@mui/material';
import { EmptyDataBox } from 'src/components/empty-data-box';
import { ErrorWrapper } from 'src/components/error-wrapper';
import { LoadingWrapper } from 'src/components/loading-wrapper';
import { IProject } from 'src/shared/interfaces/projects.interface';
import { Nullable } from 'src/shared/types/common.type';
import { theme } from 'src/styles/theme.style';

interface IProjectDetailsCardProps {
  disabledTitle?: boolean;
  loading?: boolean;
  error?: boolean;
  project: Nullable<IProject>;
}

export function ProjectDetailsCard({
  disabledTitle = false,
  loading = false,
  error = false,
  project,
}: IProjectDetailsCardProps) {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('lg'));
  return (
    <Box>
      {!disabledTitle && (
        <Typography
          variant="h6"
          component="h3"
          sx={{ mb: isSmallScreen ? 2 : 1 }}
        >
          Project
        </Typography>
      )}
      <LoadingWrapper type="skeleton" loading={loading}>
        <ErrorWrapper error={error}>
          {!!project ? (
            <Grid container rowGap={isSmallScreen ? 2 : 1}>
              <Grid container item xs={12}>
                <Grid item xs={12} lg={3}>
                  <Typography
                    color="text.secondary"
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                      textTransform: 'uppercase',
                    }}
                  >
                    Title
                  </Typography>
                </Grid>
                <Grid item xs={12} lg={9}>
                  <Typography>{project.title || ' - '}</Typography>
                </Grid>
              </Grid>
              <Grid container item xs={12}>
                <Grid item xs={12} lg={3}>
                  <Typography
                    color="text.secondary"
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                      textTransform: 'uppercase',
                    }}
                  >
                    Summary
                  </Typography>
                </Grid>
                <Grid item xs={12} lg={9}>
                  <Typography>{project.summary || ' - '}</Typography>
                </Grid>
              </Grid>
              <Grid container item xs={12}>
                <Grid item xs={12} lg={3}>
                  <Typography
                    color="text.secondary"
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                      textTransform: 'uppercase',
                    }}
                  >
                    Field
                  </Typography>
                </Grid>
                <Grid item xs={12} lg={9}>
                  <Typography>{project.field?.title || ' - '}</Typography>
                </Grid>
              </Grid>
              <Grid container item xs={12}>
                <Grid item xs={12} lg={3}>
                  <Typography
                    color="text.secondary"
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                      textTransform: 'uppercase',
                    }}
                  >
                    Specializations
                  </Typography>
                </Grid>
                <Grid item xs={12} lg={9}>
                  {project.specializations.length ? (
                    project.specializations?.map((specialization) => (
                      <Typography key={specialization.id}>
                        - {specialization.title}
                      </Typography>
                    ))
                  ) : (
                    <Typography> - </Typography>
                  )}
                </Grid>
              </Grid>
            </Grid>
          ) : (
            <EmptyDataBox />
          )}
        </ErrorWrapper>
      </LoadingWrapper>
    </Box>
  );
}
