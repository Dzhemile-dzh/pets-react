import { useState, useCallback, FC } from 'react';
import classnames from 'classnames';

import useEffectAfterMount from '@components/custom-hooks/useEffectAfterMount';

import { Actions } from '@project/common';

import { Header, IconTitle, RightSideContent } from '@components/Layouts/Header';
import Container from '@components/Layouts/Container';
import { getRaceNavigationDates, getDateName } from '@components/Race/utils';
import RPLoader from '@components/shared/RPLoader';
import SlideToggle from '@components/shared/SlideToggle';

import { useDispatch, useSelector } from 'react-redux';
import { StateInterface } from '@components/interfaces/Store.types';
import RaceMatrix from './components/RaceMatrix';
import LatestRaces from './components/LatestRaces';
import { isRaceCardsLoaded } from './utils';

import styles from './RaceIndex.module.scss';

const {
    today: todayFormatted,
    tomorrow: tomorrowFormatted,
    saturday: saturdayFormatted,
    sunday: sundayFormatted,
    mondayNextWeek: mondayFormatted,
} = getRaceNavigationDates();

const lastFilterItem = () => {
    if (saturdayFormatted) {
        return {
            label: 'Saturday',
            value: saturdayFormatted,
        }
    }
    if (sundayFormatted) {
        return {
            label: 'Sunday',
            value: sundayFormatted,
        }
    }
    if (mondayFormatted) {
        return {
            label: 'Monday',
            value: mondayFormatted,
        }
    }
};

const toggleItems = [
    {
        label: 'Latest',
        value: 'latest',
    },
    {
        label: 'Today',
        value: todayFormatted,
        isActive: true,
    },
    {
        label: 'Tomorrow',
        value: tomorrowFormatted,
    },
    {
        ...lastFilterItem(),
    },
]

export const DesktopRaceIndex : FC = () => {
    const dispatch = useDispatch();

    const [raceDate, setRaceDate] = useState(todayFormatted);
    const [isLatest, setLatest] = useState(false);
    const raceCardsForDate = useSelector((state: StateInterface) => state.raceCards[raceDate]);

    useEffectAfterMount(() => {
        if (raceDate !== 'latest') {
            dispatch(Actions.fetchRaceCards(raceDate, true))
            dispatch(Actions.getRaceOffersByDate(raceDate))
        }
    }, [raceDate])

    const handleToggleChange = useCallback((value) => {
        if (value !== raceDate && value !== 'latest') {
            setRaceDate(value);
        }

        if (value !== 'latest' && isLatest) {
            setLatest(false);
        }

        if (value === 'latest' && !isLatest) {
            if (raceDate !== todayFormatted) {
                setRaceDate(todayFormatted)
            }
            setLatest(true);
        }
    }, [isLatest, raceDate])

    const headerTitle = isLatest ? 'Latest\'s racing' : `${getDateName(raceDate)}'s racing`

    return (
        <Container className = {styles['race-index']}>
            <Header
                purpose = "RaceIndex"
                paddingTop
                paddingBottom
            >
                <IconTitle text = {headerTitle} />
                <RightSideContent>
                    <SlideToggle
                        onChange = {handleToggleChange}
                        className = {styles['race-index__slide-toggle']}
                    >
                        {toggleItems.map((item) => (
                            <SlideToggle.Button
                                key = {item.value}
                                value = {item.value}
                                isActive = {item.isActive}
                                className = {styles['race-index__slide-toggle-button']}
                            >
                                {
                                    (isActive : boolean) => (
                                        <span
                                            className = {classnames(
                                                styles['race-index__button-label'],
                                                {
                                                    [styles['race-index__button-label--active']]:
                                                        isActive,
                                                },
                                            )}
                                        >
                                            {item.label}
                                        </span>
                                    )
                                }
                            </SlideToggle.Button>
                        ))}
                    </SlideToggle>
                </RightSideContent>
            </Header>
            {
                isRaceCardsLoaded(raceCardsForDate) ? (
                    <Container paddingBottom>
                        {
                            isLatest ? (
                                <LatestRaces
                                    races = {raceCardsForDate.raceCardsData.allRaces}
                                />
                            ) : (
                                <RaceMatrix
                                    meetings = {raceCardsForDate.raceCardsData.allMeetings}
                                    races = {raceCardsForDate.raceCardsData.allRaces}
                                />
                            )
                        }
                    </Container>
                ) : (
                    <RPLoader />
                )
            }
        </Container>
    )
}
