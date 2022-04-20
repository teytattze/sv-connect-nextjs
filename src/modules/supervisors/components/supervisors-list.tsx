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
import { useIndexAccounts } from 'src/modules/accounts';
import { AccountRole } from 'src/shared/enums/accounts.enum';

export function SupervisorsList() {
  const {
    data: accountsRes,
    isLoading: isIndexAccountsLoading,
    isError: isIndexAccountsError,
  } = useIndexAccounts({ role: AccountRole.SUPERVISOR });

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
              <TableCell>{account.createdAt}</TableCell>
              <TableCell>{account.updatedAt}</TableCell>
            </TableBodyRow>
          ))}
        </TableBody>
      </Table>
      {!accountsRes?.data?.length && <TableEmptyBox />}
    </TableContainer>
  );
}
