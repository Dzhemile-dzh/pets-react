import Loader from '../../../../../base/Loader';

import styles from './TaxonomyCollectionLoader.module.scss';

export const TaxonomyCollectionLoader = ():JSX.Element => (
    <div
        className = {styles['taxonomy-collection__loader']}
        data-testid = "Container__CollectionLoader"
    >
        <Loader />
    </div>
)
