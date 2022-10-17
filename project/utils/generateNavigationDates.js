import moment from 'moment/min/moment.min';
import { generateUrlDate, dates } from './dateUtils';

const dateFormat = 'ddd ll';

export function generateNavigationDates(type) {
    const yesterdayDate = {
        href: '/racing-results/yesterday',
        date: dates.yesterday,
        label: 'yesterday',
    };
    const todayDate = {
        href: `/${type}`,
        date: dates.today,
        label: 'today',
    };

    const tomorrowDate = {
        href: '/racecards/tomorrow',
        date: dates.tomorrow,
        label: 'tomorrow',
    };

    switch (type) {
        case 'racing-results':
            return [
                todayDate,
                yesterdayDate,
                ...generatePastDates(),
            ]
        case 'racecards':
            return [
                todayDate,
                tomorrowDate,
                ...generateFutureDates(),
            ]
        default:
            break;
    }
}

const generateFutureDates = () => {
    const days = [];

    for (let i = 2; i < 7; i++) {
        days.push({
            href: `/racecards/${generateUrlDate(moment().add(i, 'days'))}`,
            date: generateUrlDate(moment().add(i, 'days')),
            label: moment().add(i, 'days').format(dateFormat).split(',')[0],
        })
    }

    return days;
}

const generatePastDates = () => {
    const days = [];

    for (let i = -2; i > -7; i--) {
        days.push({
            href: `/racing-results/${generateUrlDate(moment().add(i, 'days'))}`,
            date: generateUrlDate(moment().add(i, 'days')),
            label: moment().add(i, 'days').format(dateFormat).split(',')[0],
        })
    }

    return days;
}
