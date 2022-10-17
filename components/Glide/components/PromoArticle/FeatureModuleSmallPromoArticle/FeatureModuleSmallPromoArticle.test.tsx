import React from 'react';
import { screen, render } from '@testing-library/react';
import * as redux from 'react-redux';
import { FeatureModuleSmallPromoArticle } from './FeatureModuleSmallPromoArticle';
import { imageId1Data } from '../../../../../tests/mocks';

const props = {
    promoImageUrl: 'url',
    headline: 'headline',
    promoDetails: {
        promo_title: 'title',
    },
    updatedAt: '1w',
    primaryTaxonomy: {
        name: 'horses',
    },
    isBigRace: true,
}

describe('FeatureModuleSmallPromoArticle', () => {
    test('renders FeatureModuleSmallPromoArticle with big race', () => {
        jest.spyOn(redux, 'useSelector')
        // Mock for useSelector in PromoImage
            .mockReturnValueOnce(imageId1Data)

        render(<FeatureModuleSmallPromoArticle {...props} />);

        expect(screen.queryByText('title')).toBeInTheDocument();
        expect(screen.queryByText('1w')).toBeInTheDocument();
        expect(screen.queryByText('horses')).toBeInTheDocument();
        expect(screen.queryByTestId('Text__PromoImageTitle')).toBeInTheDocument();
    });

    test('renders FeatureModuleSmallPromoArticle without big race', () => {
        jest.spyOn(redux, 'useSelector')
        // Mock for useSelector in PromoImage
            .mockReturnValueOnce(imageId1Data)

        render(
            <FeatureModuleSmallPromoArticle
                {...props}
                isBigRace = {false}
            />,
        );

        expect(screen.queryByText('title')).toBeInTheDocument();
        expect(screen.queryByText('1w')).toBeInTheDocument();
        expect(screen.queryByText('horses')).toBeInTheDocument();
        expect(screen.queryByTestId('Text__PromoImageTitle')).not.toBeInTheDocument();
    });
})
