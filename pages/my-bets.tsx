import useEffectOnce from '@components/custom-hooks/useEffectOnce';
import { wrapper } from '@project/init';
import { END } from 'redux-saga';
import { SagaStore } from '@components/interfaces/Store.types';
import { Actions } from '../project/common';
import { Constants } from '../project/constants';
import { setCurrentPageName } from '../project/utils/storage';

import MyBets from '../components/MyBets';

const {
    PAGE_NAMES: {
        MY_BETS,
    },
} = Constants;

const MyBetsPage = (): JSX.Element => {
    useEffectOnce(() => {
        setCurrentPageName(MY_BETS);
    })

    return (
        <MyBets />
    );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
    store.dispatch(Actions.getBookmakerConfigurations());

    store.dispatch(END);

    await (store as SagaStore).sagaTask.toPromise();

    return { props: {} };
});

MyBetsPage.displayName = 'MyBetsPage';

export default MyBetsPage;
MyBetsPage.displayName = 'MyBetsPage';
MyBetsPage.isHavingSSR = true;
