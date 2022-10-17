import { Constants } from '../../../../project/constants';
import { ManualInserterArticle } from '../../../interfaces/Glide';

const {
    TAXONOMY_COLLECTION_SORT_BY: {
        PUBLISHED_AT,
        UPDATED_AT,
    },
    ORDER_POSITION: {
        DESC,
    },
    TAXONOMY_COLLECTION_TYPES: {
        PREVIEWS,
        TEN_ARTICLES,
        FOUR_ARTICLES,
        REPORTS,
        FEATURES,
    },
} = Constants;

export const ARTICLES_PER_COLLECTION = {
    [TEN_ARTICLES]: {
        min: 10,
        max: 10,
    },
    [PREVIEWS]: {
        min: 2,
        max: 3,
    },
    [FOUR_ARTICLES]: {
        min: 4,
        max: 4,
    },
    [REPORTS]: {
        min: 1,
        max: 3,
    },
    [FEATURES]: {
        min: 5,
        max: 5,
    },
}

const COLLECTION_SORTING = {
    [TEN_ARTICLES]: { [UPDATED_AT]: DESC },
    [PREVIEWS]: { [PUBLISHED_AT]: DESC },
    [FOUR_ARTICLES]: { [UPDATED_AT]: DESC },
    [REPORTS]: { [PUBLISHED_AT]: DESC },
    [FEATURES]: { [PUBLISHED_AT]: DESC },
};

const getFilter = (
    sourceTaxonomy,
    collectionArticleTypes,
    shouldFilterByPublishedTime,
    manualCollectionArticles,
) => {
    let includeQueryParam;

    if (collectionArticleTypes) {
        includeQueryParam = {
            taxonomies: [sourceTaxonomy],
            article_type: [collectionArticleTypes],
        };
    } else if (shouldFilterByPublishedTime) {
        const { currentTime, ereyesterday } = currentTimeAndEreyesterdayUnixTimestamp();

        includeQueryParam = {
            taxonomies: [sourceTaxonomy],
            published_at: {
                gte: ereyesterday,
                lte: currentTime,
            },
        }
    } else {
        includeQueryParam = {
            taxonomies: [sourceTaxonomy],
        }
    }

    return ({
        include: {
            ...includeQueryParam,
        },
        exclude: {
            id: manualCollectionArticles,
        },
    })
};

const getSort = (collectionName) => (
    COLLECTION_SORTING[collectionName] ?
        COLLECTION_SORTING[collectionName] :
        { [UPDATED_AT]: DESC }
);

const getQueryParams = (
    collectionType,
    sourceTaxonomy,
    manuallyInsertedArticles,
    collectionArticleTypes,
    shouldArticlesIncludeRaces,
    manualCollectionArticleIdsToExclude,
): string => {
    const queryParams = {
        filter: getFilter(
            sourceTaxonomy,
            collectionArticleTypes,
            shouldArticlesIncludeRaces,
            manualCollectionArticleIdsToExclude,
        ),
        sort: getSort(collectionType),
        page_size: !shouldArticlesIncludeRaces &&
            typeof ARTICLES_PER_COLLECTION[collectionType]?.max !== 'undefined' ?
            ARTICLES_PER_COLLECTION[collectionType].max - manuallyInsertedArticles.length : 20,
        content: {
            expand: {
                all: {},
            },
        },
    };

    return Object.entries(queryParams).map(([key, value]) => (
        `${key}=${JSON.stringify(value)}`
    )).join('&')
};

const getQueryParamsManualArticles = (
    manuallyInsertedArticles,
) => Object.entries({
    filter: {
        include: {
            id: manuallyInsertedArticles.map((item) => item.article),
        },
    },
    content: {
        expand: {
            all: {},
        },
    },
}).map(([key, value]) => (
    `${key}=${JSON.stringify(value)}`
)).join('&');

export const getCollectionQueryParams = ({
    collectionType,
    sourceTaxonomy,
    manuallyInsertedArticles = [],
    collectionArticleTypes = null,
    shouldArticlesIncludeRaces = false,
    manualCollectionArticleIdsToExclude = [],
}: {
    collectionType: string,
    sourceTaxonomy: number,
    manuallyInsertedArticles?: Array<ManualInserterArticle>,
    collectionArticleTypes?: null | number,
    shouldArticlesIncludeRaces: boolean,
    manualCollectionArticleIdsToExclude?: Array<string>
}): Record<string, string> => {
    const queryParams = getQueryParams(
        collectionType,
        sourceTaxonomy,
        manuallyInsertedArticles,
        collectionArticleTypes,
        shouldArticlesIncludeRaces,
        manualCollectionArticleIdsToExclude,
    );
    const queryParamsManualArticles = manuallyInsertedArticles.length > 0 ?
        getQueryParamsManualArticles(manuallyInsertedArticles) :
        '';

    return { queryParams, queryParamsManualArticles };
}

const currentTimeAndEreyesterdayUnixTimestamp = (): {
    currentTime: number,
    ereyesterday: number
} => {
    const currentTime = Date.now();
    const ereyesterday = Date.now() - 172800000; // this is: (24 * 60 * 60 * 1000) * 2

    return { currentTime, ereyesterday }
}
