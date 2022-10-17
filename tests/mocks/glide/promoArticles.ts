import {
    breakingNewsPromoArticleId,
    imageId1,
    imageId2,
    standartPromoArticleId,
    promoArticleWithAuthorId1,
    authorWithoutImageId,
    promoArticleWithAuthorId2,
    authorWithImageId,
    imageId3,
    imageId4,
    promoArticleWithAuthorId3,
    promoArticleWithAuthorId4,
    promoArticleWithAuthorId5,
    promoArticleWithAuthorId6,
    promoArticleWithAuthorId7,
} from './glideItemIds';

import { articleBody1 } from './articleBodies';

export const breakingNewsPromoArticle = {
    id: breakingNewsPromoArticleId,
    type: 'promoArticle',
    position: 0,
    shortStandfirst: 'shortStandfirst text',
    shortHeadline: 'shortHeadline text',
    path: 'path',
    promoImageUrl: 'promoImageUrl',
    catchline: 'catchline text',
    headline: 'headline',
    promoDetails: {
        promo_sub_title: 'promo_sub_title text',
        image_url: 'image_url',
        promo_title: 'promo_title text',
        image_id: imageId1,
        standfirst: 'standfirst text',
    },
    primaryTaxonomy: {
        name: 'primaryTaxonomy',
    },
    seo: {
        author: 'Some author',
    },
    authors: [],
    isBreakingNews: true,
};

export const standartPromoArticle = {
    id: standartPromoArticleId,
    type: 'promoArticle',
    position: 0,
    shortStandfirst: 'shortStandfirst text',
    standfirst: 'standfirst text',
    shortHeadline: 'shortHeadline text',
    path: 'path',
    promoImageUrl: 'promoImageUrl',
    catchline: 'catchline text',
    headline: 'headline',
    promoDetails: {
        promo_sub_title: 'promo_sub_title text',
        image_url: 'image_url',
        promo_title: 'promo_title text',
        image_id: imageId2,
        standfirst: 'standfirst text',
    },
    primaryTaxonomy: {
        name: 'primaryTaxonomy',
        id: 1,
        parent_id: 33,
        account_id: 1,
        slug: 'primaryTaxonomy',
        is_section_page: true,
        short_description: '',
        intro_text: '',
        cid: 'taxonomy-497',
        type: 'taxonomy',
        position: 0,
        seo_data: {
            page_title: '',
            meta_description: '',
        },
        additional_items: {
            custom_taxonomy_configuration: {
                meta_data: {},
            },
            color: '#ddd',
        },
    },
    seo: {
        author: 'Some author',
        keywords: [],
        description: 'description',
        title: 'Test',
        url: 'test',
        automatic_seo: true,
    },
    authors: [],
    isBreakingNews: false,
}

export const promoArticleWithAuthor1 = {
    id: promoArticleWithAuthorId1,
    type: 'promoArticle',
    position: 0,
    shortStandfirst: 'shortStandfirst text',
    shortHeadline: 'shortHeadline text',
    path: 'path',
    promoImageUrl: 'promoImageUrl',
    catchline: 'catchline text',
    headline: 'headline',
    promoDetails: {
        promo_sub_title: 'promo_sub_title text',
        image_url: 'image_url',
        promo_title: 'promo_title text',
        image_id: imageId3,
        standfirst: 'standfirst text',
    },
    primaryTaxonomy: {
        name: 'primaryTaxonomy',
    },
    seo: {
        author: 'Some author',
    },
    authors: [authorWithoutImageId],
    isBreakingNews: false,
}

export const promoArticleWithAuthor2 = {
    id: promoArticleWithAuthorId2,
    type: 'promoArticle',
    position: 0,
    shortStandfirst: 'shortStandfirst text',
    shortHeadline: 'shortHeadline text',
    path: 'path',
    promoImageUrl: 'promoImageUrl',
    catchline: 'catchline text',
    headline: 'headline',
    promoDetails: {
        promo_sub_title: 'promo_sub_title text',
        image_url: 'image_url',
        promo_title: 'promo_title text',
        image_id: imageId4,
        standfirst: 'standfirst text',
    },
    primaryTaxonomy: {
        name: 'primaryTaxonomy',
    },
    seo: {
        author: 'Some author',
    },
    authors: [authorWithImageId],
    isBreakingNews: false,
}

export const promoArticleWithAuthor3 = {
    ...promoArticleWithAuthor2,
    id: promoArticleWithAuthorId3,
}

export const promoArticleWithAuthor4 = {
    ...promoArticleWithAuthor2,
    id: promoArticleWithAuthorId4,
}

export const promoArticleWithAuthor5 = {
    ...promoArticleWithAuthor2,
    id: promoArticleWithAuthorId5,
}

export const promoArticleWithAuthor6 = {
    ...promoArticleWithAuthor2,
    id: promoArticleWithAuthorId6,
}

export const promoArticleWithAuthor7 = {
    ...promoArticleWithAuthor2,
    id: promoArticleWithAuthorId7,
}

export const standartArticleWithBody = {
    ...standartPromoArticle,
    body: articleBody1,
}

export const promoArticles = {
    [promoArticleWithAuthorId2]: promoArticleWithAuthor2,
    [promoArticleWithAuthorId1]: promoArticleWithAuthor1,
    [breakingNewsPromoArticleId]: breakingNewsPromoArticle,
    [standartPromoArticleId]: standartPromoArticle,
    [promoArticleWithAuthorId3]: promoArticleWithAuthor3,
    [promoArticleWithAuthorId4]: promoArticleWithAuthor4,
    [promoArticleWithAuthorId5]: promoArticleWithAuthor5,
    [promoArticleWithAuthorId6]: promoArticleWithAuthor6,
    [promoArticleWithAuthorId7]: promoArticleWithAuthor7,
}
