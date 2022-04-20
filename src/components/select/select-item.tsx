import {
  MenuItem as MuiMenuItem,
  MenuItemProps as MuiMenuItemProps,
} from '@mui/material';

interface ISelectItemProps extends MuiMenuItemProps {}

export function SelectItem({ children, ...props }: ISelectItemProps) {
  return <MuiMenuItem {...props}>{children}</MuiMenuItem>;
}
