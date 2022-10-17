import { useCallback, useState } from 'react';
import Image from 'next/image';

import NavigationCalendar from '../../../../../base/NavigationCalendar';

import styles from './CalendarLink.module.scss';
import SecondaryNavigationStyles from '../../SecondaryNavigation.module.scss';

interface CalendarProps {
    onSelectedDate?: (fieldValue: string) => void,
}

export const CalendarLink = ({ onSelectedDate }: CalendarProps) => {
    const [isCalendarOpened, setIsCalendarOpened] = useState(false);
    const toggleCalendar = useCallback(() => {
        setIsCalendarOpened((prevIsCalendarOpened) => !prevIsCalendarOpened);
    }, []);

    return (
        <li className = {SecondaryNavigationStyles['secondary-navigation__list-item']}>
            <div
                onClick = {toggleCalendar}
                className = {styles.calendar}
            >
                <div className = {styles.calendar__icon}>
                    <Image
                        src = "/svgs/calendar_white.svg"
                        width = {18}
                        height = {18}
                    />
                </div>
                <span>
                    choose date
                </span>
            </div>
            {isCalendarOpened && (
                <div
                    className = {
                        styles['calendar--opened']
                    }
                    data-testid = "Container__SecondaryNavigationCalendar"
                >
                    <NavigationCalendar
                        onSelectedDate = {onSelectedDate}
                        toggleCalendar = {toggleCalendar}
                    />
                </div>
            ) }
        </li>
    )
}
