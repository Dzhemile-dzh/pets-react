import React from 'react';
import { screen, render } from '@testing-library/react';
import * as redux from 'react-redux';
import { SecondaryMediumPromoWatchArticle } from './SecondaryMediumPromoWatchArticle';
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

describe('SecondaryMediumPromoArticle', () => {
    it('renders SecondaryMediumPromoWatchArticle', () => {
        jest.spyOn(redux, 'useSelector')
        // Mock for PromoImage
            .mockReturnValueOnce(imageId1Data)

        render(<SecondaryMediumPromoWatchArticle {...props} />);

        expect(screen.queryByText('title')).toBeInTheDocument();
        expect(screen.queryByText('1w')).toBeInTheDocument();
        expect(screen.queryByText('horses')).toBeInTheDocument();
    });
})
