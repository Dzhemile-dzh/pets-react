import {
    useState, useEffect, useMemo, FC,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Constants } from '@project/constants';
import { Actions } from '@project/common';
import { GlideConfigurationInterface, StateInterface } from '@components/interfaces';
import TaxonomyCollectionLoader from './atoms/TaxonomyCollectionLoader';

import TaxonomyContainer from './TaxonomyContainer';

import {
    ARTICLES_PER_COLLECTION,
    getCollectionQueryParams,
} from './utils';

const {
    TAXONOMY_COLLECTION_TYPES: {
        PREVIEWS,
        REPORTS,
    },
    ARTICLE_TYPES: {
        PREVIEWS_REPORTS,
    },
} = Constants;

interface TaxonomyCollectionInterface {
    configuration: GlideConfigurationInterface
}

export const TaxonomyCollection : FC<TaxonomyCollectionInterface> = ({
    configuration,
}) => {
    const [isCollectionLoading, setIsCollectionLoading] = useState(true);

    const dispatch = useDispatch()

    const {
        collection_header: collectionName,
        source_taxonomy: sourceTaxonomy,
        presentation_type: collectionType,
    } = configuration;

    const manuallyInsertedArticles = useMemo(
        () => configuration.article_positions || [],
        [configuration.article_positions],
    );

    const maximumArticleCount = ARTICLES_PER_COLLECTION[collectionType]?.max || 20;
    const minimumArticleCount = ARTICLES_PER_COLLECTION[collectionType]?.min || 1;
    const shouldArticlesIncludeRaces = collectionType === PREVIEWS;

    const articleTypes = useSelector((state: StateInterface) => state.glide.articleTypes);
    const collections = useSelector((state: StateInterface) => state.glide.collections);

    const collectionArticleTypes = (collectionType === REPORTS) ?
        articleTypes[PREVIEWS_REPORTS] : null;

    const taxonomyCollection = useSelector((state: StateInterface) => {
        return state.glide.taxonomyCollections[collectionName]
    });

    const articles = useSelector((state: StateInterface) => state.glide.articles);

    useEffect(() => {
        if (Object.values(collections).some((collection) => collection.isLoading)) {
            return;
        }

        const manualCollectionArticleIdsToExclude = Object.keys(collections).length > 0 ?
            Object.values(collections).flatMap((collection) => (
                collection.data.children.map((article) => article.id)
            )) : [];

        const {
            queryParams,
            queryParamsManualArticles,
        } = getCollectionQueryParams({
            collectionType,
            sourceTaxonomy,
            manuallyInsertedArticles,
            collectionArticleTypes,
            shouldArticlesIncludeRaces,
            manualCollectionArticleIdsToExclude,
        });

        dispatch(Actions.getGlideTaxonomyCollection({
            collectionName,
            queryParams,
            queryParamsManualArticles,
            manuallyInsertedArticles,
            maximumArticleCount,
            shouldArticlesIncludeRaces,
        }));
    }, [
        collectionArticleTypes,
        collectionName,
        collectionType,
        collections,
        dispatch,
        manuallyInsertedArticles,
        maximumArticleCount,
        shouldArticlesIncludeRaces,
        sourceTaxonomy,
    ]);

    useEffect(() => {
        if (
            typeof taxonomyCollection?.isLoading !== 'undefined' &&
            taxonomyCollection?.isLoading === false
        ) {
            setIsCollectionLoading(false)
        }
    }, [taxonomyCollection?.isLoading])

    const items = useMemo(() => {
        return taxonomyCollection?.data?.children
            .map((item) => articles[item.id].data);
    }, [articles, taxonomyCollection?.data?.children])

    if (!items?.length) {
        return null;
    }

    return isCollectionLoading ? <TaxonomyCollectionLoader /> : (
        <TaxonomyContainer
            taxonomyType = {collectionType}
            items = {items}
            headerText = {configuration.collection_header}
            headerLinkText = {configuration.section_link_text}
            minimumArticleCount = {minimumArticleCount}
            maximumArticleCount = {maximumArticleCount}
        />
    )
}
