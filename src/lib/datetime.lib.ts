import { DateTime } from 'luxon';

export const formatDateTime = (datetime: string) => {
  return DateTime.fromISO(datetime).toLocaleString(DateTime.DATETIME_SHORT);
};
