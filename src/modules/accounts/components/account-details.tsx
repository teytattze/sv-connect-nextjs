import { useRouter } from 'next/router';
import { ErrorWrapper } from 'src/components/error-wrapper';
import { LoadingWrapper } from 'src/components/loading-wrapper';
import { ProfileDetailsAccordion } from 'src/modules/profiles';
import { ProjectDetailsAccordion } from 'src/modules/projects';
import { SupervisorDetailsAccordion } from 'src/modules/supervisors';
import { AccountRole } from 'src/shared/enums/accounts.enum';
import { useGetAccountById } from '../accounts.query';

export function AccountDetails() {
  const { query } = useRouter();

  const accountId = (query['accountId'] as string) || '';
  const {
    data: accountRes,
    isLoading: isGetAccountLoading,
    isError: isGetAccountError,
  } = useGetAccountById(accountId);

  return (
    <LoadingWrapper type="skeleton" loading={isGetAccountLoading}>
      <ErrorWrapper error={isGetAccountError}>
        {accountRes && accountRes.data && (
          <>
            <ProfileDetailsAccordion accountId={accountId} />
            {accountRes!.data!.role === AccountRole.STUDENT && (
              <ProjectDetailsAccordion accountId={accountId} />
            )}
            {accountRes!.data!.role === AccountRole.SUPERVISOR && (
              <SupervisorDetailsAccordion accountId={accountId} />
            )}
          </>
        )}
      </ErrorWrapper>
    </LoadingWrapper>
  );
}
