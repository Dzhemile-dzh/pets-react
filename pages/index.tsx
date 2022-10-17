import { memo } from 'react';
import { useRouter } from 'next/router';
import { END } from 'redux-saga';
import { useDispatch } from 'react-redux';

import { Actions } from '@project/common';
import { dateFormatter } from '@project/utils';
import { Constants } from '@project/constants';
import { wrapper } from '@project/init';

import { useBreakPoint } from '@components/contexts/BreakPointContext';
import { usePageTracker } from '@components/custom-hooks/usePageTracker';
import useEffectOnce from '@components/custom-hooks/useEffectOnce';
import {
    IndexContent,
    LeftSideContent,
    RightSideContent,
} from '@components/base/IndexContent';
import { Navigation } from '@components/Navigation';
import Betslip from '@components/Betslip';
import BookmakerOffers from '@components/BookmakerOffers'
import { NavigationRenderPropsInterface } from '@components/Navigation/interfaces';
import GlideContent from '@components/Glide';
import RaceIndex from '@components/RaceIndex';
import Container from '@components/Layouts/Container';
import { SagaStore } from '@components/interfaces';
import Title from '@components/base/meta/Title';
import MetaDescription from '@components/base/meta/MetaDescription';

const { PAGE_NAMES: { HOME }, PAGE_META: { INDEX } } = Constants;

const HomePageNavigation = memo((props : NavigationRenderPropsInterface) => (
    <>
        <Navigation.MobileNavigation {...props} />
        <Navigation.DesktopNavigation {...props} />
    </>
))

HomePageNavigation.displayName = 'HomePageNavigation';

const HomePage = () => {
    const { asPath } = useRouter();
    const { isMobile, isDesktop, isTablet } = useBreakPoint();

    const dispatch = useDispatch();

    useEffectOnce(() => {
        dispatch(Actions.subscribeForFastResult());

        return () => dispatch(Actions.stopFastResults());
    })

    usePageTracker(HOME);

    return (
        <div>
            <Title title = {INDEX.TITLE} />
            <MetaDescription metaDescription = {INDEX.META_DESCRIPTION} />
            <Betslip />
            <Navigation>
                {
                    (props : NavigationRenderPropsInterface) => <HomePageNavigation {...props} />
                }
            </Navigation>

            <Container
                padding
                className = "linear-background"
            >
                <IndexContent>
                    <LeftSideContent>
                        <RaceIndex />
                        {!isDesktop && <BookmakerOffers />}
                    </LeftSideContent>

                    <RightSideContent>
                        {isDesktop && <BookmakerOffers />}
                    </RightSideContent>
                </IndexContent>
                {
                    (isTablet || isMobile) && <GlideContent path = {asPath} />
                }
            </Container>
            {
                isDesktop && (
                    <Container paddingLeft paddingRight>
                        <GlideContent path = {asPath} />
                    </Container>
                )
            }
        </div>
    );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
    const today = dateFormatter().dateFormat;

    store.dispatch(Actions.fetchRaceCards(today, true))
    store.dispatch(Actions.getRaceOffersByDate(today))

    store.dispatch(END);

    await (store as SagaStore).sagaTask.toPromise();

    return { props: {} };
});

export default HomePage;

HomePage.displayName = 'HomePage';
HomePage.isHavingSSR = true;
