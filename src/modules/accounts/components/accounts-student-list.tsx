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
import { useIndexAccounts } from 'src/modules/accounts';
import { AccountRole } from 'src/shared/enums/accounts.enum';

export function AccountsStudentList() {
  const {
    data: accountsRes,
    isLoading: isIndexAccountsLoading,
    isError: isIndexAccountsError,
  } = useIndexAccounts({ role: AccountRole.STUDENT });

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
          {accountsRes?.data?.map((account) => (
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
      {!accountsRes?.data?.length && <TableEmptyBox />}
    </TableContainer>
  );
}
