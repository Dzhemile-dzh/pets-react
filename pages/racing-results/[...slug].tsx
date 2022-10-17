import React, { useEffect, useMemo, useCallback } from 'react';
// import cookies from 'next-cookies'
import { useRouter } from 'next/router';

import { wrapper } from '@project/init';
import { END } from 'redux-saga';

// @ts-ignore Actions is not exported from common
// eslint-disable-next-line import/named
import { SagaStore } from '@components/interfaces';
import useEffectOnce from '@components/custom-hooks/useEffectOnce';
import { Actions } from '../../project/common';
import { Console } from '../../project/utils/console';
import { Constants } from '../../project/constants';
import {
    getDateFromUrlQuery, isValidDate,
    compareDates,
    generateUrlDate,
    getUrlDateWithPrefix,
} from '../../project/utils/dateUtils';
import { setCurrentPageName } from '../../project/utils/storage';

import { generateNavigationDates } from '../../project/utils/generateNavigationDates';

// import { FiltersInterface } from '../../components/interfaces';
import { NavigationRenderPropsInterface } from '../../components/Navigation/interfaces';
import RaceCards from '../../components/RaceCards';
import { Navigation, NavigationLink, CalendarLink } from '../../components/Navigation';
import Betslip from '../../components/Betslip';
import Race from '../../components/Race';

const {
    RACE_FILTERS: {
        RACE_STATUS,
    },
    DEFAULT_RACE_INDEX_FILTERS,
    PAGE_NAMES: {
        RESULTS_INDEX,
        RESULT,
    },
} = Constants;

export const RacingResultsPage = (): React.ReactElement => {
    Console.log('RacingResults.render()');

    const router = useRouter();

    const { slug } = router.query;
    const isOnRaceResultsPage = slug.length === 1;
    const from = getDateFromUrlQuery(slug?.[isOnRaceResultsPage ? 0 : 1]);
    const { asPath: url } = router;

    useEffectOnce(() => {
        setCurrentPageName(isOnRaceResultsPage ? RESULTS_INDEX : RESULT);
    })

    // Secondary Navigation links
    const type = 'racing-results';
    const links = useMemo(() => {
        return type && generateNavigationDates(type);
    }, [type]);

    const onSelectedDate = useCallback((customDate) => {
        const customDateTransformed = getUrlDateWithPrefix(generateUrlDate(customDate), type);

        if (customDateTransformed) {
            router.push(customDateTransformed);
        }
    }, [router, type]);

    useEffect(() => {
        // We hit Racecards home page with invalid date
        if (slug.length === 1 && !isValidDate(slug[0])) {
            router.push(
                '/error',
                '/error',
            );
        }
    }, [router, slug])

    const changeUrl = useCallback(() => {
        window.history.pushState(
            'routePath',
            'racing-results',
            `/racing-results/${slug?.[0]}/${slug?.[1]}/${slug?.[2]}/${slug?.[3]}`,
        );
    }, [slug])

    const showErrorPage = useCallback(() => {
        router.push(
            '/error',
            '/error',
        );
    }, [router])

    return (
        <>
            <Betslip />
            <Navigation>
                {
                    (props : NavigationRenderPropsInterface) => (
                        <>
                            <Navigation.MobileNavigation {...props} />
                            <Navigation.DesktopNavigation {...props} />
                            <Navigation.SecondaryNavigation {...props}>
                                {links.map((link, index) => (
                                    <NavigationLink
                                        {...link}
                                        key = {index}
                                        isActive = {compareDates(from, link.date) === 0}
                                    />
                                ))}
                                <CalendarLink
                                    onSelectedDate = {onSelectedDate}
                                />
                            </Navigation.SecondaryNavigation>
                        </>
                    )
                }
            </Navigation>
            {
                isOnRaceResultsPage ? (
                    <RaceCards
                        date = {from}
                        route = {router.pathname}
                    />
                ) : (
                    <Race
                        url = {url}
                        changeUrl = {changeUrl}
                        showErrorPage = {showErrorPage}
                    />
                )
            }
        </>
    );
}

RacingResultsPage.displayName = 'RacingResultsPage';

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ query }) => {
    const { slug } = query;

    if (slug.length === 1 && isValidDate(slug[0])) {
        // Commented for now
        // Until we know what we should do with the filters from cookies/local storage
        // const { race_index_filters }: { race_index_filters?: FiltersInterface } = cookies(ctx);

        const date = getDateFromUrlQuery(slug?.[0]);

        store.dispatch(Actions.setAllFilters({
            ...DEFAULT_RACE_INDEX_FILTERS,
            date,
            raceStatus: RACE_STATUS.RESULTS,
        }));

        store.dispatch(Actions.fetchRaceCards(date))
    } else {
        store.dispatch(Actions.getRacePage(slug))
    }
    store.dispatch(END);

    await (store as SagaStore).sagaTask.toPromise();

    return { props: {} };
});

export default RacingResultsPage;
RacingResultsPage.displayName = 'RacingResultsPage';
RacingResultsPage.isHavingSSR = true;
