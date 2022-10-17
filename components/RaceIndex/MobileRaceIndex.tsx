/* eslint-disable max-len */
import {
    useState, useCallback, useRef, FC,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addDaysToDate, isDateToday } from '@project/utils/dateUtils';
import { Actions } from '@project/common';
import useEffectAfterMount from '@components/custom-hooks/useEffectAfterMount';
import { getRaceNavigationDates, getDateName } from '@components/Race/utils';

import Container from '@components/Layouts/Container';
import {
    Header, Title, ChevronLink, HybridChevronLink,
} from '@components/Layouts/Header';
import RPLoader from '@components/shared/RPLoader';
import { StateInterface } from '@components/interfaces/Store.types';

import { IS_REDIRECT_TO_RP1_ENABLED } from '@project/featureFlags';
import RaceAccordions from './components/RaceAccordions';
import UpcomingRaces from './components/UpcomingRaces';
import LatestResults from './components/LatestResults';
import RaceStatusDetector from './components/RaceStatusDetector';
import NoRacingMessage from './components/NoRacingMessage';
import RacingWillResumeMessage from './components/RacingWillResumeMessage';
import { isRaceCardsLoaded } from './utils';
import { Constants } from '../../project/constants';

const {
    today: todayFormatted,
    tomorrow: tomorrowFormatted,
} = getRaceNavigationDates();

const MAX_FETCHED_RACECARDS = 7;

const {
    HYBRID_LINKS: {
        ALL_RACES_UPCOMING,
        ALL_RACES_TODAY,
        ALL_RACES_TOMORROW,
        ALL_RESULTS,
    },
} = Constants;

export const MobileRaceIndex : FC = () => {
    const dispatch = useDispatch();
    const [raceDate, setRaceDate] = useState(todayFormatted);
    const fetchedRaceCardsCount = useRef(0);

    const raceCards = useSelector((state: StateInterface) => state.raceCards);

    const raceCardsForDate = raceCards[raceDate];

    const upcomingRaces = raceCards[todayFormatted]?.raceCardsData?.allRaces.filter(
        (race) => race.isUpcoming,
    ).slice(0, 10)

    const latest10Results = raceCards[todayFormatted]?.raceCardsData?.allRaces
        .filter((race) => race.isResult || race.isFastResult)
        .reverse()
        .slice(0, 10);

    const addDayToRaceDate = useCallback(() => {
        if (fetchedRaceCardsCount.current < MAX_FETCHED_RACECARDS) {
            setRaceDate(addDaysToDate(raceDate, 1))
        }
    }, [raceDate])

    useEffectAfterMount(() => {
        if (fetchedRaceCardsCount.current < MAX_FETCHED_RACECARDS) {
            dispatch(Actions.fetchRaceCards(raceDate, true))
            dispatch(Actions.getRaceOffersByDate(raceDate))

            fetchedRaceCardsCount.current++;
        }
    }, [raceDate])

    const shouldShowNoRacingMessage = fetchedRaceCardsCount.current === MAX_FETCHED_RACECARDS &&
        isRaceCardsLoaded(raceCardsForDate) &&
        raceCardsForDate?.raceCardsData?.allRaces.length === 0;

    const shouldDisplayRacingInFuture = fetchedRaceCardsCount.current > 2 &&
        fetchedRaceCardsCount.current < MAX_FETCHED_RACECARDS &&
        isRaceCardsLoaded(raceCards[todayFormatted]) &&
        raceCards[todayFormatted]?.raceCardsData?.allRaces.length === 0 &&
        isRaceCardsLoaded(raceCards[tomorrowFormatted]) &&
        raceCards[tomorrowFormatted]?.raceCardsData?.allRaces.length === 0;

    return (
        <Container>
            {
                shouldShowNoRacingMessage ? <NoRacingMessage /> :
                    !isRaceCardsLoaded(raceCardsForDate) ? <RPLoader /> : (
                        <>
                            {
                                upcomingRaces.length > 0 && (
                                    <Container paddingTop paddingBottom>
                                        <Header paddingTop paddingBottom>
                                            <Title text = "Upcoming races" />
                                            {
                                                IS_REDIRECT_TO_RP1_ENABLED ?
                                                    <HybridChevronLink url = {ALL_RACES_UPCOMING} text = "All races" /> :
                                                    <ChevronLink url = "#" text = "All races" />
                                            }
                                        </Header>
                                        <UpcomingRaces races = {upcomingRaces} />
                                    </Container>
                                )
                            }
                            {
                                isDateToday(raceDate) && (
                                    <Container paddingTop paddingBottom>
                                        <Header paddingTop paddingBottom>
                                            <Title text = "Today's racecards" />
                                            {
                                                IS_REDIRECT_TO_RP1_ENABLED ?
                                                    <HybridChevronLink url = {ALL_RACES_TODAY} text = "All racecards" /> :
                                                    <ChevronLink url = "/today" text = "All racecards" />
                                            }
                                        </Header>
                                        <RaceStatusDetector
                                            onAllResultsChange = {addDayToRaceDate}
                                            races = {raceCardsForDate.raceCardsData.allRaces}
                                            isLoaded = {isRaceCardsLoaded(raceCardsForDate)}
                                        >
                                            <RaceAccordions
                                                meetings = {raceCardsForDate.raceCardsData.allMeetings}
                                                races = {raceCardsForDate.raceCardsData.allRaces}
                                            />
                                        </RaceStatusDetector>
                                    </Container>
                                )
                            }
                            {
                                latest10Results.length > 0 && (
                                    <Container paddingTop paddingBottom>
                                        <Header paddingTop paddingBottom>
                                            <Title text = "TODAY'S LATEST RESULTS" />
                                            {
                                                IS_REDIRECT_TO_RP1_ENABLED ? (
                                                    <HybridChevronLink
                                                        url = {ALL_RESULTS}
                                                        text = "All results"
                                                    />
                                                ) : (
                                                    <ChevronLink
                                                        url = "/racing-results?view=time"
                                                        text = "All results"
                                                    />
                                                )
                                            }

                                        </Header>
                                        <LatestResults allRaces = {latest10Results} />
                                    </Container>
                                )
                            }
                            {
                                shouldDisplayRacingInFuture && (
                                    <RacingWillResumeMessage raceDate = {raceDate} />
                                )
                            }
                            {!isDateToday(raceDate) && (
                                <Container paddingTop paddingBottom>
                                    <Header paddingTop paddingBottom>
                                        <Title text = {`${getDateName(raceDate)}'s racecards`} />
                                        {
                                            IS_REDIRECT_TO_RP1_ENABLED ?
                                                <HybridChevronLink url = {ALL_RACES_TOMORROW} text = "All racecards" /> :
                                                <ChevronLink url = "/today" text = "All racecards" />
                                        }
                                    </Header>
                                    <RaceStatusDetector
                                        onAllResultsChange = {addDayToRaceDate}
                                        races = {raceCardsForDate.raceCardsData.allRaces}
                                        isLoaded = {isRaceCardsLoaded(raceCardsForDate)}
                                    >
                                        <RaceAccordions
                                            meetings = {raceCardsForDate.raceCardsData.allMeetings}
                                            races = {raceCardsForDate.raceCardsData.allRaces}
                                        />
                                    </RaceStatusDetector>
                                </Container>
                            )}
                        </>
                    )
            }
        </Container>
    )
}
