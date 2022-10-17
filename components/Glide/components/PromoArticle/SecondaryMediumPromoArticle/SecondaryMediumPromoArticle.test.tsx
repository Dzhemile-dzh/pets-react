/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
import { screen, render } from '@testing-library/react';
import * as redux from 'react-redux';
import { SecondaryMediumPromoArticle } from './SecondaryMediumPromoArticle';
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

describe('SecondaryMediumPromoArticle', () => {
    test('renders SecondaryMediumPromoArticle with sub_title', () => {
        jest.spyOn(redux, 'useSelector')
        // Mock for PromoImage
            .mockReturnValueOnce(imageId1Data)

        // @ts-ignore
        render(<SecondaryMediumPromoArticle {...props} />);

        expect(screen.queryByText('title')).toBeInTheDocument();
        expect(screen.queryByText('sub title')).toBeInTheDocument();
        expect(screen.queryByText('1w')).toBeInTheDocument();
        expect(screen.queryByText('horses')).toBeInTheDocument();
    });

    test('renders PrimarySmallPromoArticle without sub_title', () => {
        jest.spyOn(redux, 'useSelector')
        // Mock for PromoImage
            .mockReturnValueOnce(imageId1Data)

        // @ts-ignore
        render(<SecondaryMediumPromoArticle {...propsNoSubTitle} />);

        expect(screen.queryByText('headline')).toBeInTheDocument();
        expect(screen.queryByText('sub title')).not.toBeInTheDocument();
        expect(screen.queryByText('1w')).toBeInTheDocument();
        expect(screen.queryByText('horses')).toBeInTheDocument();
    });
})
