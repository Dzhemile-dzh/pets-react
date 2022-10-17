import moment from 'moment';

import { Constants } from '../constants';

export const dates = {
    yesterday: moment().add(-1, 'days').format(Constants.urlDateFormat),
    today: moment().format(Constants.urlDateFormat),
    tomorrow: moment().add(1, 'days').format(Constants.urlDateFormat),
};

export const reverseDates = {
    [moment().add(-1, 'days').format(Constants.urlDateFormat)]: 'yesterday',
    [moment().add().format(Constants.urlDateFormat)]: 'today',
    [moment().add(1, 'days').format(Constants.urlDateFormat)]: 'tomorrow',
}

export const getDateName = (date) => {
    const existingDay = reverseDates[date];
    return existingDay || moment(date, 'YYYY-MM-DD').format('D MMMM YYYY');
}

export const compareDates = (date1, date2) => {
    const date1Transformed = dates[date1] || moment(date1).format(Constants.urlDateFormat);
    const date2Transformed = dates[date2] || moment(date2).format(Constants.urlDateFormat);

    return date1Transformed.localeCompare(date2Transformed);
}

export const generateDate = (date, daysToAdd, dateFormat = Constants.urlDateFormat) => {
    const newDate = moment(date).add(daysToAdd, 'days');

    return {
        date: newDate.format(dateFormat),
        dayName: newDate.format('dddd'),
    };
}

export const getDateFromUrlQuery = (route) => {
    if (!route) {
        return moment().format(Constants.urlDateFormat);
    }

    return dates[route] || moment(route).format(Constants.urlDateFormat);
}

export const generateUrlDate = (date) => {
    if (!date) {
        return 'today';
    }

    const transformedDate = moment(date).format(Constants.urlDateFormat);
    return reverseDates[transformedDate] || transformedDate;
}

export const isValidDate = (date) => {
    return !date || dates[date] || moment(date, 'YYYY-MM-DD', true).isValid();
}

export const getUrlDateWithPrefix = (date, type = '') => {
    if (!isValidDate(date)) return `/${type}`;

    const today = moment().format(Constants.urlDateFormat);
    const transformedDate = moment(date).format(Constants.urlDateFormat);

    if (date === 'yesterday' || reverseDates[transformedDate] === 'yesterday') {
        return '/racing-results/yesterday';
    }

    if (date === 'tomorrow' || reverseDates[transformedDate] === 'tomorrow') {
        return '/racecards/tomorrow';
    }

    if (date === 'today' || today === transformedDate) {
        return `/${type}`;
    }

    return (moment(date).isAfter(today) && `/racecards/${transformedDate}`) ||
        (moment(transformedDate).isBefore(today) && `/racing-results/${transformedDate}`);
}

export const compareDateAndTime = (date, comparer) => {
    return moment().diff(date, comparer);
}

export const addDaysToDate = (date, count, format = Constants.DATE_FORMATS['YYYY-MM-DD']) => {
    return moment(date).add(count, 'days').format(format);
}

export const isDateToday = (date) => {
    return moment(date).format(Constants.DATE_FORMATS['YYYY-MM-DD']) ===
        moment().format(Constants.DATE_FORMATS['YYYY-MM-DD']);
}
