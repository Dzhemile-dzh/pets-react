import { END } from 'redux-saga';
import { wrapper } from '@project/init';

import { Actions } from '../project/common';
import { Constants } from '../project/constants';
import { setCurrentPageName } from '../project/utils/storage';

import { BookmakerAccountsWith } from '../components/BookmakerAccounts';
import Betslip from '../components/Betslip';
import { Navigation } from '../components/Navigation';
import useEffectOnce from '../components/custom-hooks/useEffectOnce';

const {
    PAGE_NAMES: {
        BOOKMAKER_ACCOUNT,
    },
} = Constants;

const MyBookmakerAccountsPage = () => {
    useEffectOnce(() => {
        setCurrentPageName(BOOKMAKER_ACCOUNT);
    })

    return (
        <>
            <Betslip />
            <Navigation>
                {
                    (navProps) => <Navigation.DesktopNavigation {...navProps} />
                }
            </Navigation>
            <BookmakerAccountsWith />
        </>
    );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
    store.dispatch(Actions.getBookmakerConfigurations())

    store.dispatch(END);

    await store.sagaTask.toPromise();

    return { props: {} };
});

MyBookmakerAccountsPage.displayName = 'BookmakerAccountsWith';

export default MyBookmakerAccountsPage;
MyBookmakerAccountsPage.displayName = 'MyBookmakerAccountsPage';
MyBookmakerAccountsPage.isHavingSSR = true;
