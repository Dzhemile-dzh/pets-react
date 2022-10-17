import React, { useRef, useCallback, useEffect } from 'react';
import Calendar from 'react-calendar';
import propTypes from 'prop-types';

import { ChevronIcon } from '../Icons/ChevronIcon';
import { CrossIcon } from '../Icons/CrossIcon';
import { isClickOutside } from '../../../project/utils/helpers'
import Button from '../inputs/Button'

import styles from './NavigationCalendar.module.scss';

export const NavigationCalendar = ({ onSelectedDate, toggleCalendar }) => {
    const currentElement = useRef(null);

    useEffect(() => {
        document.addEventListener('mouseup', handleClickOutside);

        return () => {
            document.removeEventListener('mouseup', handleClickOutside);
        }
    });

    const handleSelectedDate = useCallback(
        (data) => {
            toggleCalendar();
            return onSelectedDate(data);
        },
        [onSelectedDate, toggleCalendar],
    )

    const handleClickOutside = useCallback((event) => {
        if (isClickOutside(event, currentElement) ||
        event.target.closest('.race-navigation__filter-container')) {
            toggleCalendar();
        }
    }, [toggleCalendar]);

    const todayDate = new Date();
    const minDate = new Date();

    todayDate.setMonth(todayDate.getMonth() + 2);
    todayDate.setDate(0);
    minDate.setFullYear(1988, 0, 1);

    return (
        <div
            className = {styles['navigation-calendar']}
            ref = {currentElement}
            data-testid = "Container__NavigationCalendar"
        >
            <Calendar
                maxDate = {todayDate}
                minDate = {minDate}
                next2Label = {null}
                prev2Label = {null}
                nextLabel = {(
                    <ChevronIcon
                        className = {styles['navigation-calendar__next-label']}
                        color = "black"
                        size = "small"
                    />
                    )}
                prevLabel = {(
                    <ChevronIcon
                        className = {styles['navigation-calendar__prev-label']}
                        color = "black"
                        size = "small"
                    />
                    )}
                onChange = {handleSelectedDate}
                className = {styles['navigation-calendar__react-calendar']}
                showNeighboringMonth = {false}
                minDetail = "month"
            />
            <Button
                className = {styles['navigation-calendar__close-calendar']}
                onClick = {toggleCalendar}
                data-testid = "Button__CloseCalendar"
            >
                <CrossIcon
                    className = {styles['navigation-calendar__close-calendar-icon']}
                    color = "black"
                    size = "small"
                    dataTestId = "Icon__CloseCalendar"
                />
            </Button>

        </div>
    )
}

NavigationCalendar.propTypes = {
    onSelectedDate: propTypes.func,
    toggleCalendar: propTypes.func,
}
