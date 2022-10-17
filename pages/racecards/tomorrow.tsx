import { useMemo, useCallback } from 'react';
// import cookies from 'next-cookies'
import { useRouter } from 'next/router';

import { wrapper } from '@project/init';
import { END } from 'redux-saga';

import { SagaStore } from '@components/interfaces';
import useEffectOnce from '@components/custom-hooks/useEffectOnce';
import { Console } from '../../project/utils/console';
import { dateFormatter } from '../../project/utils';
import {
    compareDates,
    generateUrlDate,
    getUrlDateWithPrefix,
} from '../../project/utils/dateUtils';
import { generateNavigationDates } from '../../project/utils/generateNavigationDates';
import { setCurrentPageName } from '../../project/utils/storage';

// @ts-ignore Actions is not exported from common
// eslint-disable-next-line import/named
import { Actions } from '../../project/common';
import { Constants } from '../../project/constants';

import RaceCards from '../../components/RaceCards';
import { Navigation, NavigationLink, CalendarLink } from '../../components/Navigation';
import Betslip from '../../components/Betslip';
import { NavigationRenderPropsInterface } from '../../components/Navigation/interfaces';

const {
    RACE_FILTERS: {
        RACE_STATUS,
    },
    DEFAULT_RACE_INDEX_FILTERS,
    PAGE_NAMES: {
        RACECARDS_INDEX,
    },
} = Constants;

const TomorrowHomePage = () => {
    Console.log('TomorrowHomePage.render()');
    useEffectOnce(() => {
        setCurrentPageName(RACECARDS_INDEX);
    })

    const router = useRouter();

    const from = dateFormatter().tomorrow;

    // Secondary Navigation links
    const type = 'racecards';
    const links = useMemo(() => {
        return type && generateNavigationDates(type);
    }, [type])
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
            <RaceCards
                date = {from}
                route = {router.pathname}
            />
        </>
    );
}

TomorrowHomePage.displayName = 'TomorrowHomePage';

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
    const date = dateFormatter().tomorrow;
    store.dispatch(Actions.setAllFilters({
        ...DEFAULT_RACE_INDEX_FILTERS,
        date,
        raceStatus: RACE_STATUS.RACES,
    }));

    store.dispatch(Actions.fetchRaceCards(date));
    store.dispatch(END);

    await (store as SagaStore).sagaTask.toPromise();

    return { props: {} };
});

export default TomorrowHomePage;
TomorrowHomePage.displayName = 'TomorrowHomePage';
TomorrowHomePage.isHavingSSR = true;
