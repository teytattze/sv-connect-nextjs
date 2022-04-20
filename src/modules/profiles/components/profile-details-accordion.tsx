import { Button, Grid, Typography } from '@mui/material';
import {
  Accordion,
  AccordionDetails,
  AccordionEmptyDataBox,
  AccordionSummary,
} from 'src/components/accordion';
import { useToggle } from 'src/hooks/use-toggle.hook';
import { useGetProfileByAccountId } from '../profiles.query';
import { UpdateProfileModal } from './update-profile-modal';

interface IProfileDetailsAccordionProps {
  accountId: string;
}

export function ProfileDetailsAccordion({
  accountId,
}: IProfileDetailsAccordionProps) {
  const { isOpen: isAccordionOpen, toggle: handleAccordionToggle } =
    useToggle(true);
  const { isOpen: isUpdateModalOpen, toggle: handleUpdateModalToggle } =
    useToggle();

  const {
    data: profileRes,
    isLoading: isGetProfileLoading,
    isError: isGetProfileError,
  } = useGetProfileByAccountId(accountId, {
    enabled: !!accountId && isAccordionOpen,
  });

  return (
    <>
      <Accordion expanded={isAccordionOpen} onChange={handleAccordionToggle}>
        <AccordionSummary title="Profile">
          <Button
            size="small"
            onClick={(ev: React.SyntheticEvent) => {
              ev.stopPropagation();
              handleUpdateModalToggle();
            }}
          >
            Edit
          </Button>
        </AccordionSummary>
        <AccordionDetails
          loading={isGetProfileLoading}
          error={isGetProfileError}
        >
          {profileRes && profileRes.data ? (
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={3}>
                <Typography
                  color="text.secondary"
                  variant="body2"
                  sx={{
                    fontWeight: 500,
                    textTransform: 'uppercase',
                  }}
                >
                  First Name
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography>{profileRes?.data?.firstName || ' - '}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography
                  color="text.secondary"
                  variant="body2"
                  sx={{
                    fontWeight: 500,
                    textTransform: 'uppercase',
                  }}
                >
                  Last Name
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography>{profileRes?.data?.lastName || ' - '}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography
                  color="text.secondary"
                  variant="body2"
                  sx={{
                    fontWeight: 500,
                    textTransform: 'uppercase',
                  }}
                >
                  Headline
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography>{profileRes?.data?.headline || ' - '}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography
                  color="text.secondary"
                  variant="body2"
                  sx={{
                    fontWeight: 500,
                    textTransform: 'uppercase',
                  }}
                >
                  Summary
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography>{profileRes?.data?.summary || ' - '}</Typography>
              </Grid>
            </Grid>
          ) : (
            <AccordionEmptyDataBox />
          )}
        </AccordionDetails>
      </Accordion>
      {profileRes && profileRes.data && (
        <UpdateProfileModal
          profile={profileRes.data}
          open={isUpdateModalOpen}
          handleToggle={handleUpdateModalToggle}
        />
      )}
    </>
  );
}
