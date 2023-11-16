import moment from 'moment';

export const setUpLocale = (locale: string) => moment.locale(locale);

export const formatDate = (date: Date, format: string): string => {
  return moment(date).format(format);
};

export const parseDate = (dateString: string, format: string): Date | null => {
  const parsedDate = moment(dateString, format);
  return parsedDate.isValid() ? parsedDate.toDate() : null;
};