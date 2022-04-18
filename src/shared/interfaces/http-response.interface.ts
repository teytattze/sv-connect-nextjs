import { Nullable } from '../types/common.type';

export interface ICoreHttpResponse<TData> {
  statusCode: number;
  errorCode: string;
  message: string;
  data: Nullable<TData>;
}
