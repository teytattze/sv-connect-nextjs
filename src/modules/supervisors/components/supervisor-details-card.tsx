import { Box, Grid, Stack, Typography, useMediaQuery } from '@mui/material';
import { EmptyDataBox } from 'src/components/empty-data-box';
import { ErrorWrapper } from 'src/components/error-wrapper';
import { LoadingWrapper } from 'src/components/loading-wrapper';
import { ISupervisor } from 'src/shared/interfaces/supervisors.interface';
import { Nullable } from 'src/shared/types/common.type';
import { theme } from 'src/styles/theme.style';

interface ISupervisorDetailsCardProps {
  disabledTitle?: boolean;
  loading?: boolean;
  error?: boolean;
  supervisor: Nullable<ISupervisor>;
}

export function SupervisorDetailsCard({
  disabledTitle = false,
  loading = false,
  error = false,
  supervisor,
}: ISupervisorDetailsCardProps) {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('lg'));
  return (
    <Box>
      {!disabledTitle && (
        <Typography
          variant="h6"
          component="h3"
          sx={{ mb: isSmallScreen ? 2 : 1 }}
        >
          Supervisor
        </Typography>
      )}
      <LoadingWrapper type="skeleton" loading={loading}>
        <ErrorWrapper error={error}>
          {!!supervisor ? (
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
                    Capacity
                  </Typography>
                </Grid>
                <Grid item xs={12} lg={9}>
                  <Typography>{supervisor.capacity}</Typography>
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
                  <Typography>{supervisor.field?.title || ' - '}</Typography>
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
                  {supervisor.specializations.length ? (
                    supervisor.specializations.map((specialization) => (
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
