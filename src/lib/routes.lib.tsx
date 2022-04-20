import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import AssignmentIndRoundedIcon from '@mui/icons-material/AssignmentIndRounded';
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
    roles: [],
    paths: [
      {
        name: 'Accounts',
        path: '/dashboard/accounts',
        roles: [],
        Icon: <AccountBoxRoundedIcon />,
      },
      {
        name: 'Students',
        path: '/dashboard/students',
        roles: [],
        Icon: <AssignmentRoundedIcon />,
      },
      {
        name: 'Supervisors',
        path: '/dashboard/supervisors',
        roles: [],
        Icon: <ManageAccountsRoundedIcon />,
      },
    ],
  },
  {
    group: 'Invitation',
    roles: [],
    paths: [
      {
        name: 'Incoming',
        path: '/dashboard/invitations/incoming',
        roles: [],
        Icon: <AssignmentIndRoundedIcon />,
      },
      {
        name: 'Outgoing',
        path: '/dashboard/invitations/outgoing',
        roles: [],
        Icon: <SupervisorAccountRoundedIcon />,
      },
    ],
  },
  {
    group: 'Auto Matching',
    roles: [],
    paths: [
      {
        name: 'Single',
        path: '/dashboard/matches/single',
        roles: [],
        Icon: <AutoAwesomeRoundedIcon />,
      },
      {
        name: 'Multiple',
        path: '/dashboard/matches/multiple',
        roles: [],
        Icon: <SummarizeRoundedIcon />,
      },
    ],
  },
];
