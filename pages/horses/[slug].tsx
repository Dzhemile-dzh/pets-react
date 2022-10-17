/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { wrapper } from '@project/init';

import { END } from 'redux-saga';

// @ts-ignore Actions is not exported from common
import { SagaStore } from '@components/interfaces/Store.types';
import useEffectOnce from '@components/custom-hooks/useEffectOnce';
import { Actions } from '../../project/common';
import { Constants } from '../../project/constants';
import { setCurrentPageName } from '../../project/utils/storage';

import HorseProfile from '../../components/HorseProfile';
import { Navigation } from '../../components/Navigation';
import { NavigationRenderPropsInterface } from '../../components/Navigation/interfaces';

interface HorseProfilePageProps {
    horseId: string;
    horsePageError: string;
    isHorsePageLoading: boolean;
}

interface Query {
    'race-id'?: string;
    slug?: string;
}

const {
    PAGE_NAMES: {
        HORSE_PROFILE,
    },
} = Constants;

interface HorseProfilePageInterface {
    horsePage: HorseProfilePageProps
}

const HorseProfilePage = ({ horsePage } : HorseProfilePageInterface) => {
    const router = useRouter();
    const {
        horseId,
        horsePageError,
        isHorsePageLoading,
    } = horsePage;
    const { 'race-id': raceId } : Query = router.query || {};

    useEffectOnce(() => {
        setCurrentPageName(HORSE_PROFILE);
    })

    useEffect(() => {
        if (horsePageError) {
            router.push('/error');
        }
    }, [horsePageError, router])

    return (
        <>
            <Navigation>
                {
                    (props : NavigationRenderPropsInterface) => (
                        <>
                            <Navigation.MobileNavigation {...props} />
                            <Navigation.DesktopNavigation {...props} />
                        </>
                    )
                }
            </Navigation>
            {
                !isHorsePageLoading && horseId && (
                    <HorseProfile
                        raceId = {raceId}
                        horseId = {horseId}
                    />
                )
            }
        </>
    );
}

HorseProfilePage.displayName = 'HorseProfilePage';

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ query }) => {
    store.dispatch(Actions.getHorsePage({
        slug: query.slug,
        raceId: query['race-id'],
    }))

    store.dispatch(END);

    await (store as SagaStore).sagaTask.toPromise();

    return {
        props: {
            horsePage: store.getState().horsePage,
        },
    };
});

export default HorseProfilePage;
HorseProfilePage.displayName = 'HorseProfilePage';
HorseProfilePage.isHavingSSR = true;
