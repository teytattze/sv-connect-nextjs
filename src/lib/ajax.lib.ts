import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export const apiClient = axios.create();

export interface AjaxOptions<Result = any> extends AxiosRequestConfig {
  select?: (res: AxiosResponse) => Result | Promise<Result>;
}

const defaultSelect: AjaxOptions['select'] = (res) => res.data;

const ajaxFn = <Result = any>({
  select = defaultSelect,
  ...config
}: AjaxOptions<Result>) => {
  const cancelSource = axios.CancelToken.source();

  const requestPromise = new Promise<Result>((fulfill, reject) => {
    apiClient({
      cancelToken: cancelSource.token,
      ...config,
    })
      .then((res) => fulfill(select(res)))
      .catch((err) => {
        if (!err || !axios.isCancel(err)) {
          reject(err);
        }
      });
  });

  return Object.assign(requestPromise, {
    cancel: () => cancelSource.cancel(),
  });
};

const ajaxAll = <Result = any>(ajaxs: Array<ReturnType<typeof ajaxFn>>) => {
  const result = Promise.all(ajaxs as Array<Promise<Result>>);

  return Object.assign(result, {
    cancel: () => ajaxs.forEach((aj) => aj.cancel()),
  });
};

type AjaxHelperOptions = Omit<AjaxOptions, 'url' | 'method'>;

export const ajax = Object.assign(ajaxFn, {
  get: <Result = any>(url: string, options: AjaxHelperOptions = {}) =>
    ajaxFn<Result>({ url, ...options }),
  post: <Result = any>(
    url: string,
    data?: any,
    options: AjaxHelperOptions = {}
  ) => ajaxFn<Result>({ url, data, method: 'post', ...options }),
  put: <Result = any>(
    url: string,
    data?: any,
    options: AjaxHelperOptions = {}
  ) => ajaxFn<Result>({ url, data, method: 'put', ...options }),
  patch: <Result = any>(
    url: string,
    data?: any,
    options: AjaxHelperOptions = {}
  ) => ajaxFn<Result>({ url, data, method: 'patch', ...options }),
  delete: <Result = any>(url: string, options: AjaxHelperOptions = {}) =>
    ajaxFn<Result>({ url, method: 'delete', ...options }),
  all: ajaxAll,
});

export const filterParamsEmptyString = (
  params: Record<string, any>
): Record<string, any> => {
  const result: Record<string, any> = {};
  Object.entries(params).forEach(([key, value]) => {
    if (value !== '') result[key] = value;
  });
  return result;
};
