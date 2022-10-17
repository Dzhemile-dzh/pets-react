// import cookies from 'next-cookies'
import { useRouter } from 'next/router';
import { wrapper } from '@project/init';
import { END } from 'redux-saga';

import { Console } from '../project/utils/console';
import { dateFormatter } from '../project/utils';
import { Constants } from '../project/constants';
import { Actions } from '../project/common';
import { setCurrentPageName } from '../project/utils/storage';

import RaceCards from '../components/RaceCards';
import { Navigation } from '../components/Navigation';
import Betslip from '../components/Betslip';

import LinkHead from '../components/base/meta/Link'
import useEffectOnce from '../components/custom-hooks/useEffectOnce';

const {
    RACE_FILTERS: {
        RACE_STATUS,
    },
    DEFAULT_RACE_INDEX_FILTERS,
    PAGE_NAMES: {
        TODAYS_INDEX,
    },
} = Constants;

export const TodayPage = () => {
    Console.log('TodayPage.render()');
    useEffectOnce(() => {
        setCurrentPageName(TODAYS_INDEX);
    })

    const router = useRouter();
    const today = dateFormatter().dateFormat;

    return (
        <>
            <LinkHead
                href = "https://www.racingpost.com/racing-results/"
                rel = "canonical"
            />
            <Betslip />
            <Navigation>
                {
                    (props) => (
                        <>
                            <Navigation.MobileNavigation {...props} />
                            <Navigation.DesktopNavigation {...props} />
                        </>
                    )
                }
            </Navigation>
            <RaceCards
                date = {today}
                shouldDisplayTimeline
                route = {router.pathname}
            />
        </>
    );
}

TodayPage.displayName = 'TodayPage';

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
    const date = dateFormatter().dateFormat;

    store.dispatch(Actions.setAllFilters({
        ...DEFAULT_RACE_INDEX_FILTERS,
        date,
        raceStatus: RACE_STATUS.ALL,
    }));

    store.dispatch(Actions.fetchRaceCards(date))

    store.dispatch(END);

    await store.sagaTask.toPromise();

    return { props: {} };
});

export default TodayPage;
TodayPage.displayName = 'TodayPage';
TodayPage.isHavingSSR = true;
