import { EmptyDataBox } from '../empty-data-box';

interface ITableEmptyBoxProps {
  children?: React.ReactNode;
  message?: string;
}

export function TableEmptyBox({ children, message }: ITableEmptyBoxProps) {
  return (
    <EmptyDataBox backgroundColor="grey" message={message}>
      {children}
    </EmptyDataBox>
  );
}
