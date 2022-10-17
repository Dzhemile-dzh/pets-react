import { wrapper } from '@project/init';
import { END } from 'redux-saga';

import { Actions } from '../project/common';
import { Constants } from '../project/constants';
import { setCurrentPageName } from '../project/utils/storage';

import { MyRacingPostWith } from '../components/MyRacingPost';
import Betslip from '../components/Betslip';
import { Navigation } from '../components/Navigation';
import useEffectOnce from '../components/custom-hooks/useEffectOnce';

const {
    PAGE_NAMES: {
        ACCOUNTS,
    },
} = Constants;

const MyRacingPostPage = () => {
    useEffectOnce(() => {
        setCurrentPageName(ACCOUNTS);
    })

    return (
        <>
            <Betslip />
            <Navigation>
                {
                    (navigationProps) => (
                        <>
                            <Navigation.MobileNavigation {...navigationProps} />
                            <Navigation.DesktopNavigation {...navigationProps} />
                        </>
                    )
                }
            </Navigation>
            <MyRacingPostWith />
        </>
    );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
    store.dispatch(Actions.getBookmakerConfigurations());

    store.dispatch(END);

    await store.sagaTask.toPromise();

    return { props: {} };
});

MyRacingPostPage.displayName = 'MyRacingPostPage';

export default MyRacingPostPage;
MyRacingPostPage.displayName = 'MyRacingPostPage';
MyRacingPostPage.isHavingSSR = true;
