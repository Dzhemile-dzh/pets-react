import React from 'react';
import { screen, render } from '@testing-library/react';
import * as redux from 'react-redux';

import { GlideArticle } from './GlideArticle';
import { imageId1Data, standartArticleWithBody } from '../../../../tests/mocks';

describe('GlideArticle', () => {
    it('renders GlideArticle', () => {
        jest.spyOn(redux, 'useSelector')
        // Mock for useSelector in PromoImage
            .mockReturnValueOnce(imageId1Data)

        render(
            <GlideArticle {...standartArticleWithBody} />,
        );

        const glideArticle = screen.getByTestId('Container__GlideArticle');
        expect(glideArticle).toBeInTheDocument();

        const articleHeadline = screen.getByTestId('Text__GlideArticleHeadline');
        expect(articleHeadline).toBeInTheDocument();

        const articleStandFirst = screen.getByTestId('Text__GlideArticleStandfirst');
        expect(articleStandFirst).toBeInTheDocument();

        const articlePromoImage = screen.getByTestId('Container__PromoImageWrapper');
        expect(articlePromoImage).toBeInTheDocument();

        const articleContent = screen.getByTestId('Container__GlideArticleContent');
        expect(articleContent).toBeInTheDocument();
    });
});
