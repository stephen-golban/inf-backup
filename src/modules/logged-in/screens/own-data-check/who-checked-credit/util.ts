import { format } from 'date-fns';

export const getFormattedCheckDate = (
  checkDateTime: Date | [number, number, number, number, number, number, number],
  isDateTime = false,
) => {
  const dateTime = Array.isArray(checkDateTime) ? new Date(...checkDateTime) : new Date(checkDateTime);
  return isDateTime ? format(dateTime, 'HH:mm:ssXXX') : format(dateTime, 'yyyy-MM-dd');
};
