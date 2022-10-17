import { useCallback, useState, useMemo } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import useEffectOnce from '@components/custom-hooks/useEffectOnce';
import { Actions } from '@project/common';
import { Constants } from '../../project/constants';
import { setAppCookie } from '../../project/utils/helpers';
import Loader from '../base/Loader';
import ErrorMessage from '../base/ErrorMessage';
import WarningMessage from '../base/WarningMessage';
import Title from '../base/meta/Title';
import MetaDescription from '../base/meta/MetaDescription';
import RaceIndexHeader from './components/RaceIndexHeader';
import Filters from './components/Filters';
import IndexView from './components/RaceViewTypes/IndexView';
import useEffectAfterMount from '../custom-hooks/useEffectAfterMount';
import { NoRacesIcon } from '../base/Icons/NoRacesIcon';
import {
    ConstantsInterface,
    RaceCardsWrapperInterface,
    RaceCardsProviderInterface,
    FiltersProviderInterface,
    FirstThreeWinnersProviderInterface,
    FavouriteRunnerProviderInterface,
    RacePageProviderInterface,
    StateInterface,
} from '../interfaces';
import {
    generateMetaDescription,
    generatePageTitle,
    getFilteredRacesAndMeetings,
    getPageType,
    getHeaderText,
} from './utils';
import { useBreakPoint } from '../contexts/BreakPointContext';

import styles from './RaceCards.module.scss';

const {
    RACE_FILTERS: {
        VIEW,
    },
    RACE_INDEX_FILTERS_COOKIE,
    PAGES,
} : ConstantsInterface = Constants;

export interface RaceCardsInterface extends RaceCardsWrapperInterface,
    RaceCardsProviderInterface,
    FiltersProviderInterface,
    FirstThreeWinnersProviderInterface,
    FavouriteRunnerProviderInterface,
    RacePageProviderInterface {}

export const RaceCards = ({
    filters,
    date,
    shouldDisplayTimeline,
    route,
}: RaceCardsInterface) : React.ReactElement => {
    const router = useRouter();
    const dispatch = useDispatch();

    const [indexView, setIndexView] =
        useState<string>(
            router.query?.view === VIEW.TIME.toLocaleLowerCase() ?
                VIEW.TIME : VIEW.COURSE,
        );

    const {
        races,
        meetings,
        isLoading,
        error,
    } = useSelector((state: StateInterface) => {
        const raceCardsData = state.raceCards[date];

        if (!raceCardsData) return {};

        const {
            raceCardsData: {
                allMeetings,
                allRaces,
            },
            isRaceCardsLoading,
            raceCardsError,
        } = raceCardsData;

        const {
            filteredRaces,
            filteredMeetings,
        } = getFilteredRacesAndMeetings(allRaces, allMeetings, filters)

        return {
            races: filteredRaces,
            meetings: filteredMeetings,
            isLoading: isRaceCardsLoading,
            error: raceCardsError,
        }
    })

    const firstThreeWinners = useSelector((state: StateInterface) => state.firstThreeWinners);
    const favouriteRunners = useSelector((state: StateInterface) => state.favouriteRunners);
    const cardCustomization = useSelector((state: StateInterface) => state.cardCustomization);

    const pageType = getPageType(route);
    const headerTitle = getHeaderText({ date, pageType });

    const { isMobile } = useBreakPoint();

    useEffectAfterMount(() => {
        const {
            courses,
            date: filterDate,
            isHandicap,
            raceStatus,
            raceType,
        } = filters;

        // We want to store the filters in a cookie
        // For us to be able to get the filters on the server side
        // And apply the filters there, not after it is rendered, to have blinking races
        setAppCookie(
            RACE_INDEX_FILTERS_COOKIE,
            JSON.stringify({
                courses, date: filterDate, isHandicap, raceStatus, raceType,
            }),
        )
    }, [filters]);

    useEffectOnce(() => {
        dispatch(Actions.subscribeForFastResult());
        return () => dispatch(Actions.stopFastResults());
    })

    const setRaceAsNow = useCallback(
        (raceDate, raceId) => dispatch(Actions.setRaceAsNow(raceDate, raceId)),
        [dispatch],
    );

    const onSortMeetingsClick = useCallback((value: string) => {
        if (indexView === value) {
            return;
        }

        setIndexView(value);
    }, [indexView])

    const indexViewToggleItems = useMemo(() => {
        const items = [
            {
                label: 'By Course',
                value: VIEW.COURSE,
                className: 'race-order--course',
            },
            {
                label: 'By Time',
                value: VIEW.TIME,
                className: 'race-order--time',
            },
        ];

        return pageType === PAGES.RESULTS ?
            items :
            [
                ...items,
                {
                    label: 'By Runner',
                    value: VIEW.RUNNER,
                    className: 'race-order--runner',
                },
            ];
    }, [pageType]);

    const warningMessage = useMemo(() => {
        if (races && races.length) {
            return '';
        }
        if (pageType === '/racing-results') {
            return 'No results are available';
        }
        if (pageType === '/today') {
            return 'No racing scheduled for today';
        }

        return 'Races not scheduled for this day';
    }, [pageType, races])

    return (
        <>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            {isLoading && meetings?.length === 0 && <Loader />}
            {!isLoading && (
                <>
                    <Title title = {generatePageTitle(route, date)} />
                    <MetaDescription
                        metaDescription = {generateMetaDescription(route, date)}
                    />
                    {!isMobile && (
                        <RaceIndexHeader
                            headerTitle = {headerTitle}
                        />
                    )}
                    <Filters
                        from = {date}
                        sortMeetings = {onSortMeetingsClick}
                        sortMeetingsFilterValue = {indexView}
                        indexViewToggleItems = {indexViewToggleItems}
                        filters = {filters}
                        meetings = {meetings}
                    />
                    {isMobile && (
                        <RaceIndexHeader
                            // Note:
                            // Due to new mobile designs for Today's index page
                            // title should be on second line after "Today's"
                            headerTitle = {pageType === '/today' ?
                                headerTitle.replace("today's ", "today's\n") : headerTitle}
                            pageType = {pageType}
                        />
                    )}
                    <div className = {styles['race-cards']}>
                        {races?.length ? (
                            <IndexView
                                date = {date}
                                meetings = {meetings}
                                races = {races}
                                firstThreeWinners = {firstThreeWinners}
                                favouriteRunners = {favouriteRunners}
                                shouldDisplayTimeline = {shouldDisplayTimeline}
                                indexView = {indexView}
                                showOdds = {cardCustomization.showOdds}
                                setRaceAsNow = {setRaceAsNow}
                            />
                        ) : (
                            <WarningMessage
                                icon = {<NoRacesIcon />}
                                message = {warningMessage}
                                className = {styles['race-cards__no-races-message']}
                            />
                        )}
                    </div>
                </>
            )}
        </>
    );
}

RaceCards.displayName = 'RaceCards';
