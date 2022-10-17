import { FC } from 'react';
import dynamic from 'next/dynamic';
import {
    TaxonomyCollectionBodyInterface,
    HeaderInterface,
} from '../../../interfaces';
import { Constants } from '../../../../project/constants';

const FourArticlesCollection = dynamic(
    () => import('./components/FourArticlesCollection'),
);
const RacePreviewsCollection = dynamic(
    () => import('./components/RacePreviewsCollection'),
);
const RaceReportsCollection = dynamic(
    () => import('./components/RaceReportsCollection'),
);
const TenArticlesCollection = dynamic(
    () => import('./components/TenArticlesCollection'),
);

const FeaturesCollection = dynamic(
    () => import('./components/FeaturesCollection'),
);

const {
    TAXONOMY_COLLECTION_TYPES: {
        PREVIEWS,
        TEN_ARTICLES,
        FOUR_ARTICLES,
        REPORTS,
        FEATURES,
    },
} = Constants;

interface TaxonomyCollectionInterface extends
    HeaderInterface, TaxonomyCollectionBodyInterface {
    taxonomyType: string;
}

const TaxonomyContainer: FC<TaxonomyCollectionInterface> = ({
    taxonomyType,
    ...rest
}) => {
    switch (taxonomyType) {
        case (FOUR_ARTICLES):
            return (<FourArticlesCollection {...rest} />);

        case (TEN_ARTICLES):
            return (<TenArticlesCollection {...rest} />);

        case (REPORTS):
            return (<RaceReportsCollection {...rest} />);

        case (PREVIEWS):
            return (<RacePreviewsCollection {...rest} />);

        case (FEATURES):
            return (<FeaturesCollection {...rest} />);

        default:
            return null;
    }
}

export default TaxonomyContainer;
