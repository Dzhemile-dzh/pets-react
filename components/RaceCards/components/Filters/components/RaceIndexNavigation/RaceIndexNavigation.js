import React, {
    useState, useMemo, useCallback, memo,
} from 'react';
import { useRouter } from 'next/router';
import propTypes from 'prop-types';
import Link from 'next/link';

import NavigationCalendar from '../../../../../base/NavigationCalendar';
import Button from '../../../../../base/inputs/Button/index.tsx';

import { getRaceNavigationDates, transformDate } from '../../../../../Race/utils';
import {
    generateUrlDate,
    generateDate,
    compareDates,
    getUrlDateWithPrefix,
} from '../../../../../../project/utils/dateUtils';
import { Constants } from '../../../../../../project/constants';

import styles from './RaceIndexNavigation.module.scss';
import { useBreakPoint } from '../../../../../contexts/BreakPointContext';

const { PAGES } = Constants;

export const RaceIndexNavigation = memo(({ date }) => {
    const [isCalendarOpened, setIsCalendarOpened] = useState(false);

    const {
        yesterday,
        today,
        tomorrow,
        saturday,
        sunday,
        mondayNextWeek,
    } = getRaceNavigationDates();

    const ref = React.createRef();

    const { isMobile } = useBreakPoint();

    const router = useRouter();
    const { route } = router;

    const pageType = [PAGES.RESULTS, PAGES.RACECARDS].find((page) => {
        return route.includes(page);
    })?.slice(1);

    const links = useMemo(() => {
        const defaultLinks = [{
            label: 'today',
            href: getUrlDateWithPrefix(today, pageType),
            isActive: !date || compareDates(date, today) === 0,
        }];

        const yesterdayLink = {
            label: 'yesterday',
            href: getUrlDateWithPrefix(yesterday),
            isActive: date && compareDates(date, yesterday) === 0,
        };

        const tomorrowLink = {
            label: 'tomorrow',
            href: getUrlDateWithPrefix(tomorrow),
            isActive: date && compareDates(date, tomorrow) === 0,
        };

        if (route.includes(PAGES.RESULTS) && isMobile) {
            const { date: previousDate, dayName } = generateDate(yesterday, -1)
            defaultLinks.push(
                yesterdayLink,
                {
                    label: dayName,
                    href: getUrlDateWithPrefix(previousDate),
                    isActive: date && compareDates(date, previousDate) === 0,
                },
            );
        } else {
            if (route.includes(PAGES.RACECARDS) && isMobile) {
                defaultLinks.push(tomorrowLink);
            } else {
                defaultLinks.push(yesterdayLink, tomorrowLink);
            }

            if (saturday) {
                defaultLinks.push({
                    label: 'saturday',
                    href: getUrlDateWithPrefix(saturday),
                    isActive: date && compareDates(date, saturday) === 0,
                });
            }
            if (sunday) {
                defaultLinks.push({
                    label: 'sunday',
                    href: getUrlDateWithPrefix(sunday),
                    isActive: date && compareDates(date, sunday) === 0,
                });
            }
            if (mondayNextWeek) {
                defaultLinks.push({
                    label: 'monday',
                    href: getUrlDateWithPrefix(mondayNextWeek),
                    isActive: date && compareDates(date, mondayNextWeek) === 0,
                });
            }
        }

        const shouldAddLink = defaultLinks.findIndex((link) => link.isActive) < 0;

        if (shouldAddLink) {
            const name = transformDate(date, true);

            defaultLinks.push({
                label: name,
                href: getUrlDateWithPrefix(date),
                isActive: true,
            });
        }

        return defaultLinks;
    }, [today, pageType, date, yesterday, tomorrow,
        route, isMobile, saturday, sunday, mondayNextWeek]);

    const onSelectedDate = useCallback((customDate) => {
        const urlDate = generateUrlDate(customDate);
        const customDateTransformed = getUrlDateWithPrefix(urlDate, pageType);

        if (urlDate === 'today') {
            router.push('/my-bookmakers');
        } else {
            router.push(customDateTransformed);
        }
    }, [pageType, router]);

    const toggleCalendar = useCallback(() => {
        setIsCalendarOpened((prevIsCalendarOpened) => !prevIsCalendarOpened);
    }, []);

    const renderChooseDateAndCalendar = useCallback((btnText) => {
        return isCalendarOpened ? (
            <NavigationCalendar
                onSelectedDate = {onSelectedDate}
                toggleCalendar = {toggleCalendar}
            />
        ) : (
            <Button
                styleType = "filter"
                onClick = {toggleCalendar}
                className = {styles['race-index-navigation__choose-date']}
            >
                {btnText}
            </Button>
        )
    }, [isCalendarOpened, onSelectedDate, toggleCalendar]);

    return (
        <div className = {styles['race-index-navigation']}>
            <div className = {styles['race-index-navigation__list']}>
                {links.map((link, index) => (
                    <Link
                        key = {link.label + index}
                        href = {link.href}
                    >
                        <a className = {styles['race-index-navigation__item']}>
                            <Button
                                styleType = "filter"
                                isActive = {link.isActive}
                                ref = {ref}
                            >
                                {link.label}
                            </Button>
                        </a>
                    </Link>
                ))}
                {!isMobile && renderChooseDateAndCalendar('CHOOSE DATE...')}
            </div>
            {isMobile && renderChooseDateAndCalendar('CHOOSE ANOTHER DATE...')}
        </div>
    )
})

RaceIndexNavigation.propTypes = {
    date: propTypes.string,
}
RaceIndexNavigation.displayName = 'RaceIndexNavigation';
