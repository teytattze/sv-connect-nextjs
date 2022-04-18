import { Box, Typography } from '@mui/material';
import { DashboardLayout } from '../../layouts/dashboard.layout';
import { RouteGuard } from '../../modules/auth/components/route-guard';
import { AccountRole } from '../../shared/enums/accounts.enum';

export default function DashboardPage() {
  return (
    <Box sx={{ py: 2, px: 4 }}>
      <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
        Welcome to SV Connect
      </Typography>
    </Box>
  );
}

DashboardPage.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <RouteGuard
      roles={[AccountRole.ADMIN, AccountRole.STUDENT, AccountRole.SUPERVISOR]}
    >
      <DashboardLayout>{page}</DashboardLayout>
    </RouteGuard>
  );
};
