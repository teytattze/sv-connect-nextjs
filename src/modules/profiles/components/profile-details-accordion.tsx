import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Grid,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useGetProfileByAccountId } from '../profiles.query';
import { UpdateProfileModal } from './update-profile-modal';
import { useToggle } from '../../../hooks/use-toggle.hook';

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

  const { data: profileRes, isLoading } = useGetProfileByAccountId(accountId, {
    enabled: !!accountId && isAccordionOpen,
  });

  return (
    <>
      <Accordion expanded={isAccordionOpen} onChange={handleAccordionToggle}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography sx={{ fontWeight: 500, textTransform: 'uppercase' }}>
              Profile
            </Typography>
            <Button
              size="small"
              onClick={(ev: React.SyntheticEvent) => {
                ev.stopPropagation();
                handleUpdateModalToggle();
              }}
            >
              Edit
            </Button>
          </Stack>
        </AccordionSummary>
        <AccordionDetails>
          {isLoading ? (
            <>
              <Skeleton />
              <Skeleton />
              <Skeleton />
            </>
          ) : (
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
