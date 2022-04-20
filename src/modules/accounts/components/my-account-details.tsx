import { ErrorWrapper } from 'src/components/error-wrapper';
import { LoadingWrapper } from 'src/components/loading-wrapper';
import { useAuth } from 'src/modules/auth';
import { ProfileDetailsAccordion } from 'src/modules/profiles';
import { ProjectDetailsAccordion } from 'src/modules/projects';
import { SupervisorDetailsAccordion } from 'src/modules/supervisors';
import { AccountRole } from 'src/shared/enums/accounts.enum';

export function MyAccountDetails() {
  const { account, isLoading } = useAuth();

  return (
    <LoadingWrapper type="skeleton" loading={isLoading}>
      <ErrorWrapper error={!account || !account.id || !account.role}>
        {account && account.id && account.role && (
          <>
            <ProfileDetailsAccordion accountId={account!.id} />
            {account!.role === AccountRole.STUDENT && (
              <ProjectDetailsAccordion accountId={account!.id} />
            )}
            {account!.role === AccountRole.SUPERVISOR && (
              <SupervisorDetailsAccordion accountId={account!.id} />
            )}
          </>
        )}
      </ErrorWrapper>
    </LoadingWrapper>
  );
}
