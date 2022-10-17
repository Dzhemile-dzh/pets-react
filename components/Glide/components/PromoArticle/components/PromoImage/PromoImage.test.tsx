import React from 'react';
import { screen, render } from '@testing-library/react';
import * as redux from 'react-redux';

import { imageId1, imageId1Data } from '../../../../../../tests/mocks';
import { PromoImage } from './PromoImage';

describe('PromoImage', () => {
    jest.spyOn(redux, 'useSelector')
        .mockReturnValueOnce(imageId1Data)

    test('should show promoSubtitle', () => {
        render(
            <PromoImage>
                <PromoImage.Url imageId = {imageId1} promoImageUrl = "url" />
                <PromoImage.Title title = "the big race" />
                <PromoImage.CaptionAndCredit caption = "caption" credit = {['credit']} />
            </PromoImage>,
        );

        expect(screen.queryByTestId('Container__PromoImageWrapper')).toBeInTheDocument();
        expect(screen.queryByTestId('Text__PromoImageTitle')).toBeInTheDocument();
        expect(screen.queryByTestId('Image__PromoImage')).toBeInTheDocument();
        expect(screen.queryByTestId('Container__PromoImageCaptionAndCredit')).toBeInTheDocument();
        expect(screen.queryByText('the big race')).toBeInTheDocument();
    });
})
