import {
  FormControl,
  FormHelperText,
  InputLabel,
  Select as MuiSelect,
  SelectProps as MuiSelectProps,
} from '@mui/material';
import { EmptyDataBox } from '../empty-data-box';
import { SelectLoading } from './select-loading-wrapper';

interface ISelectProps extends Omit<MuiSelectProps, 'error' | 'helperText'> {
  loading?: boolean;
  empty?: boolean;
  error?: boolean;
  helperText?: string;
}

export function Select({
  children,
  empty = true,
  loading = false,
  error = false,
  helperText,
  id,
  label,
  ...props
}: ISelectProps) {
  return (
    <FormControl fullWidth error={error}>
      <InputLabel>{label}</InputLabel>
      <MuiSelect id={id} label={label} {...props}>
        <SelectLoading loading={loading} />
        {!loading && empty && <EmptyDataBox backgroundColor="grey" />}
        {children}
      </MuiSelect>
      {helperText && (
        <FormHelperText error={error}>{helperText}</FormHelperText>
      )}
    </FormControl>
  );
}
