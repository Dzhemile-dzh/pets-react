import dynamic from 'next/dynamic'
import { useSelector, useDispatch } from 'react-redux';
import { Actions } from '@project/common';
import useEffectOnce from '@components/custom-hooks/useEffectOnce';

import { StateInterface } from '@components/interfaces';
import TaxonomyCollection from '@components/Glide/components/TaxonomyCollection';
import { Constants } from '../../../../project/constants';
import Loader from '../../../base/Loader';

import styles from './Collection.module.scss';

const TopStoriesCollection = dynamic(() => import('./components/TopStoriesCollection'));
const SecondaryNewsCollection = dynamic(() => import('./components/SecondaryNewsCollection'));
const TipsAndNapsCollection = dynamic(() => import('./components/TipsAndNapsCollection'));

const {
    COLLECTION_TYPES: {
        HERO_3_ARTICLES,
        STANDART,
        TIPS_AND_NAPS,
        FEATURES,
    },
} = Constants;

export function Collection({ id } : { id: number }) : JSX.Element {
    const dispatch = useDispatch()

    const collection = useSelector((state: StateInterface) => state.glide.collections[id])

    useEffectOnce(() => {
        dispatch(Actions.getGlideCollection(id));
    })

    return !collection || collection.isLoading ? (
        <div
            className = {styles.collection__loader}
            data-testid = {`Container__${id}__CollectionLoader`}
        >
            <Loader />
        </div>
    ) : (
        <>
            {/* This check will be changed soon */}
            {collection.data.collectionDesktopLayoutType === HERO_3_ARTICLES && (
                <TopStoriesCollection collection = {collection.data} />
            )}
            {
                collection.data.collectionDesktopLayoutType === STANDART &&
                collection.data.name !== TIPS_AND_NAPS && (
                    <SecondaryNewsCollection collection = {collection.data} />
                )
            }
            {collection.data.name === TIPS_AND_NAPS && (
                <TipsAndNapsCollection collection = {collection.data} />
            )}
            {collection.data.name === FEATURES && (
                <TaxonomyCollection configuration = {collection.data.widgets[0].configuration} />
            )}
        </>
    )
}
