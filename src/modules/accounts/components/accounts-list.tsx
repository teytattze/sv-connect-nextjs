import {
  Box,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import NextLink from 'next/link';
import { LoadingWrapper } from '../../../components/loading-wrapper';
import { theme } from '../../../styles/theme.style';
import { useIndexAccounts } from '../accounts.query';

export function AccountsList() {
  const { data: accounts, isLoading, isError } = useIndexAccounts();

  return (
    <LoadingWrapper
      loading={isLoading}
      type="skeleton"
      renderSkeleton={() => (
        <Box sx={{ width: '100%', px: 1 }}>
          <Skeleton animation="wave" height={32} />
          <Skeleton animation="wave" height={32} />
          <Skeleton animation="wave" height={32} />
          <Skeleton animation="wave" height={32} />
          <Skeleton animation="wave" height={32} />
        </Box>
      )}
    >
      <TableContainer component={Paper}>
        <Table stickyHeader sx={{ width: '100%' }}>
          <TableHead>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Updated At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {accounts?.data?.map((account) => (
              <TableRow
                key={account.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <NextLink href={`/dashboard/accounts/${account.id}`}>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ cursor: 'pointer' }}
                  >
                    {account.email}
                  </TableCell>
                </NextLink>
                <TableCell>{account.role}</TableCell>
                <TableCell>
                  {account.emailVerified ? 'Verified' : 'Not Verified'}
                </TableCell>
                <TableCell>{account.createdAt}</TableCell>
                <TableCell>{account.updatedAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {(isError || !accounts || accounts?.data?.length === 0) && (
          <Box
            sx={{
              background: theme.palette.grey[100],
              width: '100%',
              textAlign: 'center',
              py: 4,
            }}
          >
            <Typography
              component="h3"
              variant="body2"
              color="text.secondary"
              sx={{
                fontWeight: 'bold',
              }}
            >
              No data available
            </Typography>
          </Box>
        )}
      </TableContainer>
    </LoadingWrapper>
  );
}
