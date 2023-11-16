import moment from 'moment';
export const setUpLocale = (locale) => moment.locale(locale);
export const formatDate = (date, format) => {
    return moment(date).format(format);
};
export const parseDate = (dateString, format) => {
    const parsedDate = moment(dateString, format);
    return parsedDate.isValid() ? parsedDate.toDate() : null;
};
