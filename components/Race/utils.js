/* eslint-disable max-len */
import moment from 'moment/min/moment.min';
import { addDays } from 'date-fns/fp';
import { Constants } from '../../project/constants';
import { getDateFromUrlQuery } from '../../project/utils/dateUtils';
import { dateFormatter } from '../../project/utils';

export function getDate(formattedDate) {
    const date = new Date(formattedDate);
    return moment(date)
        .format(Constants.urlDateFormat);
}

export function getNextSaturday() {
    const dayINeed = 6;
    const today = moment().isoWeekday();

    if (today <= dayINeed) return moment().isoWeekday(dayINeed);

    return moment().add(1, 'weeks').isoWeekday(dayINeed);
}

const formatDate = (dateToFormat) => {
    return dateFormatter(dateToFormat).dateFormat;
}

export function getRaceNavigationDates(date) {
    const today = date || new Date();
    const todayDate = formatDate(today);
    const yesterdayDate = formatDate(addDays(-1)(new Date(today)));
    const tomorrowDate = formatDate(addDays(1)(new Date(today)));
    const saturdayDate = formatDate(addDays(6 - today.getDay())(new Date(today)));
    const sundayDate = formatDate(addDays(7 - today.getDay())(new Date(today)));
    const mondayDate = formatDate(addDays(8 - today.getDay())(new Date(today)));

    const sunday = today.getDay() === 5 ? sundayDate : null;
    const mondayNextWeek = today.getDay() === 6 ? mondayDate : null;

    return {
        yesterday: yesterdayDate,
        today: todayDate,
        tomorrow: tomorrowDate,
        saturday: !sunday && !mondayNextWeek && saturdayDate,
        sunday,
        mondayNextWeek,
    };
}

export function generatePageTitle(data) {
    const {
        startTime,
        date,
        meetingName,
        isResult,
        isCompareOddsTabActive,
    } = data;

    if (isCompareOddsTabActive) {
        return `${startTime} ${meetingName} ${(isCompareOddsTabActive && !isResult) ?
            'Odds' : ''} - ${date} - Racing Post`;
    }

    return `${startTime} ${meetingName} ${isResult ? 'Result' :
        'Racecard'} - ${date} - Racing Post`;
}

export function generateMetaDescription(data) {
    const {
        startTime,
        raceTitle,
        dateWithOrdinal,
        meetingName,
        isResult,
        isCompareOddsTabActive,
    } = data;

    if (isCompareOddsTabActive) {
        return `Quickly compare the ${raceTitle} Odds and betting at ${meetingName} on ${dateWithOrdinal}.`;
    }

    const details = isResult ? 'results for the full result' :
        'racecard for the latest betting, odds, form and tips';

    return `${startTime} ${raceTitle}, ${dateWithOrdinal}. View the ${meetingName} ${details} from Racing Post.`;
}

export function generateFullDataBtnText(name, date) {
    const now = moment().format(Constants.dateRequestFormat);
    const fullDataBtnText =
            `VIEW FULL ${
                date < now ? 'RESULTS' : 'DETAILS'
            } FOR ${
                name.toUpperCase()
            }'S RACES`;

    return fullDataBtnText;
}

export function transformDate(date, customDate) {
    return customDate ? moment(date, 'YYYY-MM-DD').format('D MMMM YYYY') :
        getDateFromUrlQuery(date);
}

export function getDateName(date) {
    const {
        yesterday, today, tomorrow, saturday,
    } = getRaceNavigationDates();
    switch (date) {
        case yesterday:
            return 'Yesterday';
        case today:
        case undefined:
            return 'Today';
        case tomorrow:
            return 'Tomorrow';
        case saturday:
            return 'Saturday';
        default:
            return transformDate(date, true);
    }
}

export function isSaturdayActive() {
    const tomorrowDate = moment().add(1, 'days').format(Constants.dateRequestFormat);
    const saturdayDate = getNextSaturday().format(Constants.dateRequestFormat);
    return saturdayDate !== tomorrowDate;
}
