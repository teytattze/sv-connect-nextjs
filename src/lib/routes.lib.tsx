import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import AutoFixNormalRoundedIcon from '@mui/icons-material/AutoFixNormalRounded';
import AutoFixHighRoundedIcon from '@mui/icons-material/AutoFixHighRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import AssignmentIndRoundedIcon from '@mui/icons-material/AssignmentIndRounded';
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded';
import CasesRoundedIcon from '@mui/icons-material/CasesRounded';
import ManageAccountsRoundedIcon from '@mui/icons-material/ManageAccountsRounded';
import SummarizeRoundedIcon from '@mui/icons-material/SummarizeRounded';
import SupervisorAccountRoundedIcon from '@mui/icons-material/SupervisorAccountRounded';
import { AccountRole } from '../shared/enums/accounts.enum';

export interface IRoute {
  group: string;
  paths: IPath[];
  roles: AccountRole[];
}

export interface IPath {
  name: string;
  path: string;
  roles: AccountRole[];
  Icon: React.ReactNode;
}

export interface IRoute {
  group: string;
  paths: IPath[];
  roles: AccountRole[];
}

export interface IPath {
  name: string;
  path: string;
  roles: AccountRole[];
  Icon: React.ReactNode;
}

export const routes: IRoute[] = [
  {
    group: 'Accounts',
    roles: [AccountRole.STUDENT, AccountRole.SUPERVISOR, AccountRole.ADMIN],
    paths: [
      {
        name: 'Accounts',
        path: '/dashboard/accounts',
        roles: [AccountRole.STUDENT, AccountRole.SUPERVISOR, AccountRole.ADMIN],
        Icon: <AccountBoxRoundedIcon />,
      },
      {
        name: 'Students',
        path: '/dashboard/accounts/student',
        roles: [AccountRole.STUDENT, AccountRole.SUPERVISOR, AccountRole.ADMIN],
        Icon: <AssignmentRoundedIcon />,
      },
      {
        name: 'Supervisors',
        path: '/dashboard/accounts/supervisor',
        roles: [AccountRole.STUDENT, AccountRole.SUPERVISOR, AccountRole.ADMIN],
        Icon: <ManageAccountsRoundedIcon />,
      },
    ],
  },
  {
    group: 'Invitation',
    roles: [AccountRole.STUDENT, AccountRole.SUPERVISOR],
    paths: [
      {
        name: 'Incoming',
        path: '/dashboard/invitations/incoming',
        roles: [AccountRole.SUPERVISOR],
        Icon: <AssignmentIndRoundedIcon />,
      },
      {
        name: 'Outgoing',
        path: '/dashboard/invitations/outgoing',
        roles: [AccountRole.STUDENT],
        Icon: <SupervisorAccountRoundedIcon />,
      },
    ],
  },
  {
    group: 'Auto Matching',
    roles: [AccountRole.STUDENT, AccountRole.SUPERVISOR, AccountRole.ADMIN],
    paths: [
      {
        name: 'Students',
        path: '/dashboard/matches/students',
        roles: [AccountRole.ADMIN],
        Icon: <AutoFixNormalRoundedIcon />,
      },
      {
        name: 'Students & Supervisors',
        path: '/dashboard/matches/students-and-supervisors',
        roles: [AccountRole.ADMIN],
        Icon: <AutoFixHighRoundedIcon />,
      },
      {
        name: 'Report',
        path: '/dashboard/matches/report',
        roles: [AccountRole.STUDENT, AccountRole.SUPERVISOR, AccountRole.ADMIN],
        Icon: <SummarizeRoundedIcon />,
      },
    ],
  },
  {
    group: 'Others',
    roles: [AccountRole.STUDENT, AccountRole.SUPERVISOR, AccountRole.ADMIN],
    paths: [
      {
        name: 'Fields',
        path: '/dashboard/fields',
        roles: [AccountRole.STUDENT, AccountRole.SUPERVISOR, AccountRole.ADMIN],
        Icon: <CasesRoundedIcon />,
      },
      {
        name: 'Specializations',
        path: '/dashboard/specializations',
        roles: [AccountRole.STUDENT, AccountRole.SUPERVISOR, AccountRole.ADMIN],
        Icon: <CategoryRoundedIcon />,
      },
    ],
  },
];
