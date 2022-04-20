import { IconButton, ListItemButton, ListItemText, Stack } from '@mui/material';
import NextLink from 'next/link';
import { IPath } from '../../lib/routes.lib';

export interface SidebarSectionButtonProps {
  path: IPath;
}

export function SidebarSectionButton({ path }: SidebarSectionButtonProps) {
  return (
    <NextLink passHref href={path.path}>
      <ListItemButton
        sx={{
          borderRadius: 1,
          p: 0,
        }}
      >
        <Stack
          sx={{
            p: 1,
            mr: 1,
          }}
        >
          {path.Icon}
        </Stack>
        <ListItemText primary={path.name} />
      </ListItemButton>
    </NextLink>
  );
}

export function SidebarSectionButtonMinimize({
  path,
}: SidebarSectionButtonProps) {
  return <IconButton>{path.Icon}</IconButton>;
}
