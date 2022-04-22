import { DateTime } from 'luxon';

export const formateDateTime = (datetime: string) => {
  return DateTime.fromISO(datetime).toHTTP();
};
