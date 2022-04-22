import { Box, Grid, Typography, useMediaQuery } from '@mui/material';
import { EmptyDataBox } from 'src/components/empty-data-box';
import { ErrorWrapper } from 'src/components/error-wrapper';
import { LoadingWrapper } from 'src/components/loading-wrapper';
import { IProfile } from 'src/shared/interfaces/profiles.interface';
import { Nullable } from 'src/shared/types/common.type';
import { theme } from 'src/styles/theme.style';

interface IProfileDetailsCardProps {
  disabledTitle?: boolean;
  loading?: boolean;
  error?: boolean;
  profile: Nullable<IProfile>;
}

export function ProfileDetailsCard({
  profile,
  disabledTitle = false,
  error = false,
  loading = false,
}: IProfileDetailsCardProps) {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('lg'));

  return (
    <Box>
      {!disabledTitle && (
        <Typography variant="h6" component="h3" sx={{ mb: 1 }}>
          Profile
        </Typography>
      )}
      <LoadingWrapper type="skeleton" loading={loading}>
        <ErrorWrapper error={error}>
          {!!profile ? (
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
                    First Name
                  </Typography>
                </Grid>
                <Grid item xs={12} lg={9}>
                  <Typography>{profile.firstName || ' - '}</Typography>
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
                    Last Name
                  </Typography>
                </Grid>
                <Grid item xs={12} lg={9}>
                  <Typography>{profile.lastName || ' - '}</Typography>
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
                    Headline
                  </Typography>
                </Grid>
                <Grid item xs={12} lg={9}>
                  <Typography>{profile.headline || ' - '}</Typography>
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
                  <Typography>{profile.summary || ' - '}</Typography>
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
