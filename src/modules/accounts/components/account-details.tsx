import { Alert, Box, Skeleton } from '@mui/material';
import { ProfileDetailsAccordion } from '../../profiles';
import { ProjectDetailsAccordion } from '../../projects';
import { SupervisorDetailsAccordion } from '../../supervisors';
import { AccountRole } from '../../../shared/enums/accounts.enum';
import { useRouter } from 'next/router';
import { useGetAccountById } from '../accounts.query';

export function AccountDetails() {
  const { query } = useRouter();

  const accountId = (query['accountId'] as string) || '';
  const { data: account, isLoading, isError } = useGetAccountById(accountId);

  return (
    <Box>
      {isLoading ? (
        <>
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </>
      ) : isError || !account || !account.data ? (
        <>
          <Alert severity="error">There is something wrong</Alert>
        </>
      ) : (
        <>
          <ProfileDetailsAccordion accountId={accountId} />
          {account!.data!.role === AccountRole.STUDENT && (
            <ProjectDetailsAccordion accountId={accountId} />
          )}
          {account!.data!.role === AccountRole.SUPERVISOR && (
            <SupervisorDetailsAccordion accountId={accountId} />
          )}
        </>
      )}
    </Box>
  );
}
