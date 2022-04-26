import { Button } from '@mui/material';
import {
  Accordion,
  AccordionDetails,
  AccordionEmptyDataBox,
  AccordionSummary,
} from 'src/components/accordion';
import { useToggle } from 'src/hooks/use-toggle.hook';
import { ComponentGuard } from 'src/modules/auth';
import { AccountRole } from 'src/shared/enums/accounts.enum';
import { useGetProfileByAccountId } from '../profiles.query';
import { ProfileDetailsCard } from './profile-details-card';
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
          <ComponentGuard
            roles={[
              AccountRole.STUDENT,
              AccountRole.SUPERVISOR,
              AccountRole.ADMIN,
            ]}
            id={accountId}
          >
            <Button
              size="small"
              onClick={(ev: React.SyntheticEvent) => {
                ev.stopPropagation();
                handleUpdateModalToggle();
              }}
            >
              Edit
            </Button>
          </ComponentGuard>
        </AccordionSummary>
        <AccordionDetails
          loading={isGetProfileLoading}
          error={isGetProfileError}
        >
          {profileRes && profileRes.data ? (
            <ProfileDetailsCard disabledTitle profile={profileRes.data} />
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
