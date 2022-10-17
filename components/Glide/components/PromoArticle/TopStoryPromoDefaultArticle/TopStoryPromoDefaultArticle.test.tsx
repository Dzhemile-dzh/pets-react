import React from 'react';
import { screen, render } from '@testing-library/react';
import * as redux from 'react-redux';
import { TopStoryPromoDefaultArticle } from './TopStoryPromoDefaultArticle';
import { imageId1Data } from '../../../../../tests/mocks';

const props = {
    promoImageUrl: 'url',
    promoDetails: {
        promo_title: 'title',
        promo_sub_title: 'sub title',
    },
    headline: 'headline',
    updatedAt: '1w',
    primaryTaxonomy: {
        name: 'horses',
    },
    seo: {
        author: 'Graeme Rodway',
        automatic_seo: true,
        description: '',
        keywords: [],
        title: 'Our top tipster',
        url: 'url',
    },
}

const propsNoSubTitle = {
    promoImageUrl: 'url',
    promoDetails: {
        promo_sub_title: 'sub title',
    },
    headline: 'headline',
    updatedAt: '1w',
    primaryTaxonomy: {
        name: 'horses',
    },
    seo: {
        author: 'Graeme Rodway',
        automatic_seo: true,
        description: '',
        keywords: [],
        title: 'Our top tipster',
        url: 'url',
    },
}

describe('TopStoryPromoDefaultArticle', () => {
    test('renders TopStoryPromoDefaultArticle with title', () => {
        jest.spyOn(redux, 'useSelector')
        // Mock for PromoImage
            .mockReturnValueOnce(imageId1Data)

        render(<TopStoryPromoDefaultArticle {...props} />);

        expect(screen.queryByText('title')).toBeInTheDocument();
        expect(screen.queryByText('sub title')).toBeInTheDocument();
        expect(screen.queryByText('1w')).toBeInTheDocument();
        expect(screen.queryByText('horses')).toBeInTheDocument();
        expect(screen.queryByText('Graeme Rodway')).toBeInTheDocument();
    });

    test('renders TopStoryPromoDefaultArticle without title', () => {
        jest.spyOn(redux, 'useSelector')
        // Mock for PromoImage
            .mockReturnValueOnce(imageId1Data)

        render(<TopStoryPromoDefaultArticle {...propsNoSubTitle} />);

        expect(screen.queryByText('headline')).toBeInTheDocument();
        expect(screen.queryByText('sub title')).toBeInTheDocument();
        expect(screen.queryByText('1w')).toBeInTheDocument();
        expect(screen.queryByText('horses')).toBeInTheDocument();
        expect(screen.queryByText('Graeme Rodway')).toBeInTheDocument();
    });
})
