import { Stack, Typography } from '@mui/material';
import { ComponentGuard } from 'src/modules/auth';
import { IRoute } from '../../lib/routes.lib';
import {
  SidebarSectionButton,
  SidebarSectionButtonMinimize,
} from './sidebar-section-button';

export interface SidebarSectionProps {
  route: IRoute;
}

export function SidebarSection({ route }: SidebarSectionProps) {
  return (
    <Stack
      direction="column"
      alignItems="justify-start"
      spacing={1}
      sx={{
        width: '100%',
        px: 1,
      }}
    >
      <Typography
        variant="caption"
        component="h2"
        noWrap
        sx={{
          color: 'text.secondary',
          fontWeight: 700,
          textTransform: 'uppercase',
        }}
      >
        {route.group}
      </Typography>
      <Stack direction="column" alignItems="justify-start" spacing={0.5}>
        {route.paths.map((path) => (
          <ComponentGuard key={path.name} roles={path.roles}>
            <SidebarSectionButton key={path.name} path={path} />
          </ComponentGuard>
        ))}
      </Stack>
    </Stack>
  );
}

export function SidebarSectionMinimize({ route }: SidebarSectionProps) {
  return (
    <Stack
      direction="column"
      alignItems="justify-start"
      spacing={1}
      sx={{
        width: '100%',
        px: 1,
      }}
    >
      <Typography
        variant="caption"
        component="h2"
        noWrap
        sx={{
          color: 'text.secondary',
          fontWeight: 700,
          textTransform: 'uppercase',
        }}
      >
        {route.group}
      </Typography>
      <Stack direction="column" alignItems="justify-start" spacing={0.5}>
        {route.paths.map((path) => (
          <ComponentGuard key={path.name} roles={path.roles}>
            <SidebarSectionButtonMinimize path={path} />
          </ComponentGuard>
        ))}
      </Stack>
    </Stack>
  );
}
