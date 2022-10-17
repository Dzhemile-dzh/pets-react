import React, { useEffect, useCallback, useMemo } from 'react';
// import cookies from 'next-cookies'
import { useRouter } from 'next/router';
import { wrapper } from '@project/init';

import { END } from 'redux-saga';
// eslint-disable-next-line import/named
import { SagaStore } from '@components/interfaces/Store.types';
import useEffectOnce from '@components/custom-hooks/useEffectOnce';
import { Actions } from '../../project/common';
import { Constants } from '../../project/constants';

import { Console } from '../../project/utils/console';
import {
    getDateFromUrlQuery,
    isValidDate,
    compareDates,
    generateUrlDate,
    getUrlDateWithPrefix,
} from '../../project/utils/dateUtils';
import { generateNavigationDates } from '../../project/utils/generateNavigationDates';
import { setCurrentPageName } from '../../project/utils/storage';

import RaceCards from '../../components/RaceCards';
import { Navigation, NavigationLink, CalendarLink } from '../../components/Navigation';
import Betslip from '../../components/Betslip';
import RaceWith from '../../components/Race';
import { NavigationRenderPropsInterface } from '../../components/Navigation/interfaces';

const {
    RACE_FILTERS: {
        RACE_STATUS,
    },
    DEFAULT_RACE_INDEX_FILTERS,
    PAGE_NAMES: {
        RACECARDS_INDEX,
        RACECARD,
    },
} = Constants;

export const RacecardsPage = (): React.ReactElement => {
    Console.log('Racecards.render()');

    const router = useRouter();
    const { asPath: url } = router;
    const { slug } = router.query;
    const isOnRaceCardsPage = slug.length === 1;
    const from = getDateFromUrlQuery(slug?.[isOnRaceCardsPage ? 0 : 1]);

    useEffectOnce(() => {
        setCurrentPageName(isOnRaceCardsPage ? RACECARDS_INDEX : RACECARD);
    })

    // We might change this to be used for Race pages as well
    // Instead showErrorPage
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
            'results',
            `/results/${slug?.[0]}/${slug?.[1]}/${slug?.[2]}/${slug?.[3]}/${slug?.[4]}`,
        );
    }, [slug])

    const showErrorPage = useCallback(() => {
        router.push(
            '/error',
            '/error',
        );
    }, [router])

    // Secondary Navigation links
    const type = 'racecards';
    const links = useMemo(() => {
        return type && generateNavigationDates(type);
    }, [type]);
    const onSelectedDate = useCallback((customDate) => {
        const customDateTransformed = getUrlDateWithPrefix(generateUrlDate(customDate), type);

        if (customDateTransformed) {
            router.push(customDateTransformed);
        }
    }, [router, type]);

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
                isOnRaceCardsPage ? (
                    <RaceCards
                        date = {from}
                        route = {router.pathname}
                    />
                ) : (
                    <RaceWith
                        url = {url}
                        changeUrl = {changeUrl}
                        showErrorPage = {showErrorPage}
                    />
                )
            }
        </>
    );
}

RacecardsPage.displayName = 'RacecardsPage';

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ query }) => {
    const { slug } = query;

    // We hit Racecards home page
    if (slug.length === 1 && isValidDate(slug[0])) {
        // Commented for now
        // Until we know what we should do with the filters from cookies/local storage
        // const { race_index_filters }: { race_index_filters?: FiltersInterface } = cookies(ctx);

        const date = getDateFromUrlQuery(slug[0]);

        store.dispatch(Actions.setAllFilters({
            ...DEFAULT_RACE_INDEX_FILTERS,
            date,
            raceStatus: RACE_STATUS.RACES,
        }));
        store.dispatch(Actions.fetchRaceCards(date));
    } else {
        store.dispatch(Actions.getRacePage(slug));
    }
    store.dispatch(END);

    await (store as SagaStore).sagaTask.toPromise();

    return { props: {} };
});

export default RacecardsPage;
RacecardsPage.displayName = 'RacecardsPage';
RacecardsPage.isHavingSSR = true;
