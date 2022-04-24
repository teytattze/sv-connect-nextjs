import NextLink from 'next/link';
import {
  Table,
  TableBody,
  TableBodyRow,
  TableCell,
  TableHead,
  TableHeadRow,
  TableContainer,
  TableEmptyBox,
} from 'src/components/table';
import { formatDateTime } from 'src/lib/datetime.lib';
import { useIndexAccounts } from '../accounts.query';

export function AccountsList() {
  const {
    data: accounts,
    isLoading: isIndexAccountsLoading,
    isError: isIndexAccountsError,
  } = useIndexAccounts();

  return (
    <TableContainer
      loading={isIndexAccountsLoading}
      error={isIndexAccountsError}
    >
      <Table>
        <TableHead>
          <TableHeadRow>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Created At</TableCell>
            <TableCell>Updated At</TableCell>
          </TableHeadRow>
        </TableHead>
        <TableBody>
          {accounts?.data?.map((account) => (
            <TableBodyRow key={account.id}>
              <NextLink passHref href={`/dashboard/accounts/${account.id}`}>
                <TableCell scope="row" sx={{ cursor: 'pointer' }}>
                  {account.email}
                </TableCell>
              </NextLink>
              <TableCell>{account.role}</TableCell>
              <TableCell>
                {account.emailVerified ? 'Verified' : 'Not Verified'}
              </TableCell>
              <TableCell>{formatDateTime(account.createdAt)}</TableCell>
              <TableCell>{formatDateTime(account.updatedAt)}</TableCell>
            </TableBodyRow>
          ))}
        </TableBody>
      </Table>
      {!accounts?.data?.length && <TableEmptyBox />}
    </TableContainer>
  );
}
