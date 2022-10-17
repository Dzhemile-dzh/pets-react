import {
    topStoriesCollectionId,
    secondaryNewsCollectionId,
    standartPromoArticleId,
    breakingNewsPromoArticleId,
    promoArticleWithAuthorId1,
    promoArticleWithAuthorId2,
    promoArticleWithAuthorId3,
    promoArticleWithAuthorId4,
    promoArticleWithAuthorId5,
} from './glideItemIds';

export const topStoriesCollection = {
    collectionDesktopLayoutType: 'hero3Articles',
    id: topStoriesCollectionId,
    children: [
        {
            id: standartPromoArticleId,
            type: 'promoArticles',
        },
        {
            id: breakingNewsPromoArticleId,
            type: 'promoArticles',
        },
        {
            id: promoArticleWithAuthorId1,
            type: 'promoArticles',
        },
        {
            id: promoArticleWithAuthorId2,
            type: 'promoArticles',
        },
    ],
}

export const secondaryNewsCollection = {
    collectionDesktopLayoutType: 'hero3Articles',
    id: secondaryNewsCollectionId,
    children: [
        {
            id: standartPromoArticleId,
            type: 'promoArticles',
        },
        {
            id: breakingNewsPromoArticleId,
            type: 'promoArticles',
        },
        {
            id: promoArticleWithAuthorId1,
            type: 'promoArticles',
        },
        {
            id: promoArticleWithAuthorId2,
            type: 'promoArticles',
        },
        {
            id: promoArticleWithAuthorId3,
            type: 'promoArticles',
        },
        {
            id: promoArticleWithAuthorId4,
            type: 'promoArticles',
        },
        {
            id: promoArticleWithAuthorId5,
            type: 'promoArticles',
        },
    ],
}
