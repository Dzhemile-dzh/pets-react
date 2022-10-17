import { useMemo, useCallback } from 'react';
import { useRouter } from 'next/router';

import { wrapper } from '@project/init';
import { END } from 'redux-saga';
import { SagaStore } from '@components/interfaces';
import useEffectOnce from '@components/custom-hooks/useEffectOnce';
import { dateFormatter } from '../../project/utils';
import { Constants } from '../../project/constants';
import {
    compareDates,
    generateUrlDate,
    getUrlDateWithPrefix,
} from '../../project/utils/dateUtils';
import { setCurrentPageName } from '../../project/utils/storage';

import { generateNavigationDates } from '../../project/utils/generateNavigationDates';

// @ts-ignore Actions is not exported from common
import { Actions } from '../../project/common';

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
        RESULTS_INDEX,
    },
} = Constants;

export const YesterdayRacingResultsPage = (): React.ReactElement => {
    useEffectOnce(() => {
        setCurrentPageName(RESULTS_INDEX);
    })

    const router = useRouter();

    const from = dateFormatter().yesterday;

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

YesterdayRacingResultsPage.displayName = 'RacingResultsPage';

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
    const date = dateFormatter().yesterday;

    store.dispatch(Actions.setAllFilters({
        ...DEFAULT_RACE_INDEX_FILTERS,
        date,
        raceStatus: RACE_STATUS.RESULTS,
    }));

    store.dispatch(Actions.fetchRaceCards(date))
    store.dispatch(END);

    await (store as SagaStore).sagaTask.toPromise();

    return { props: {} };
});

export default YesterdayRacingResultsPage;
YesterdayRacingResultsPage.displayName = 'YesterdayRacingResultsPage';
YesterdayRacingResultsPage.isHavingSSR = true;
