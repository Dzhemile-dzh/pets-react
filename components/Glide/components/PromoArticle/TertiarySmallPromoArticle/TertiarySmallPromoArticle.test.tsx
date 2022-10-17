import React from 'react';
import { screen, render } from '@testing-library/react';
import * as redux from 'react-redux';
import { TertiarySmallPromoArticle } from './TertiarySmallPromoArticle';
import { imageId1Data } from '../../../../../tests/mocks';

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
    promoDetails: {},
    headline: 'headline',
    updatedAt: '1w',
    primaryTaxonomy: {
        name: 'horses',
    },
}

describe('TertiarySmallPromoArticle', () => {
    test('renders TertiarySmallPromoArticle with title', () => {
        jest.spyOn(redux, 'useSelector')
        // Mock for PromoImage
            .mockReturnValueOnce(imageId1Data)

        render(<TertiarySmallPromoArticle {...props} />);

        expect(screen.queryByText('title')).toBeInTheDocument();
        expect(screen.queryByText('1w')).toBeInTheDocument();
        expect(screen.queryByText('horses')).toBeInTheDocument();
    });

    test('renders TertiarySmallPromoArticle without title', () => {
        jest.spyOn(redux, 'useSelector')
        // Mock for PromoImage
            .mockReturnValueOnce(imageId1Data)

        render(<TertiarySmallPromoArticle {...propsNoSubTitle} />);

        expect(screen.queryByText('headline')).toBeInTheDocument();
        expect(screen.queryByText('1w')).toBeInTheDocument();
        expect(screen.queryByText('horses')).toBeInTheDocument();
    });
})
