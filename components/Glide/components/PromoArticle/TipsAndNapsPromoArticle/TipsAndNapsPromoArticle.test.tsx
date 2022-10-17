import React from 'react';
import { screen, render } from '@testing-library/react';
import * as redux from 'react-redux';
import { TipsAndNapsPromoArticle } from './TipsAndNapsPromoArticle';

const props = {
    promoImageUrl: 'url',
    promoDetails: {
        promo_title: 'title',
    },
    headline: 'headline',
    updatedAt: '1w',
    primaryTaxonomy: {
        name: 'horses',
    },
}

const propsNoSubTitle = {
    promoImageUrl: 'url',
    headline: 'headline',
    updatedAt: '1w',
    promoDetails: {
        image_id: 'image_url',
    },
    primaryTaxonomy: {
        name: 'horses',
    },
}

describe('TipsAndNapsPromoArticle', () => {
    const getGlideCollection = jest.fn();
    const getGlideAuthor = jest.fn();
    const getGlideTaxonomyCollection = jest.fn();

    const content = {
        collections: {},
        authors: {},
        layouts: {},
        widgets: {},
        promoArticles: {},
        images: {},
        articles: {},
        taxonomyCollections: {},
    }
    const isInitialized = true;

    const defaultUseGlideContextReturnValue = {
        getGlideCollection,
        content,
        isInitialized,
        getGlideAuthor,
        getGlideTaxonomyCollection,
    }
    const updatedContent = {
        ...content,
        collections: {},
        promoArticles: {},
        images: {
            image_url: {
                id: 'image_url',
                key: '/dev/image_url',
            },
        },
    }

    const useGlideContextReturnValue = {
        ...defaultUseGlideContextReturnValue,
        content: updatedContent,
    }

    jest.spyOn(redux, 'useSelector')
        .mockReturnValueOnce(useGlideContextReturnValue.content.images)

    it('renders TipsAndNapsPromoArticle with title', () => {
        // @ts-ignore we don't need full state
        render(<TipsAndNapsPromoArticle {...props} />);

        expect(screen.queryByText('title')).toBeInTheDocument();
        expect(screen.queryByText('1w')).toBeInTheDocument();
        expect(screen.queryByText('horses')).toBeInTheDocument();
    });

    it('renders TipsAndNapsPromoArticle without title', () => {
        // @ts-ignore we don't need full state
        render(<TipsAndNapsPromoArticle {...propsNoSubTitle} />);

        expect(screen.queryByText('headline')).toBeInTheDocument();
        expect(screen.queryByText('1w')).toBeInTheDocument();
        expect(screen.queryByText('horses')).toBeInTheDocument();
    });
})
