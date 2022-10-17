import React from 'react';
import { screen, render } from '@testing-library/react';
import * as redux from 'react-redux';
import { PrimarySmallPromoArticle } from './PrimarySmallPromoArticle';
import {
    authorWithImageId,
    authorWithImageObject,
} from '../../../../../tests/mocks';

const props = {
    promoDetails: {
        promo_title: 'title',
    },
    headline: 'headline',
    updatedAt: '1w',
    primaryTaxonomy: {
        name: 'horses',
    },
    isAuthorHavingImage: true,
    shouldHideAuthorsImage: false,
    shouldHideAuthorsDetails: false,
    authors: [authorWithImageId],
    seo: {
        author: 'Graeme Rodway',
        automatic_seo: true,
        description: '',
        keywords: [],
        title: 'Our top tipster',
        url: 'url',
    },
}

describe('PrimarySmallPromoArticle', () => {
    test('renders PrimarySmallPromoArticle with author image', () => {
        const useDispatchSpy = jest.spyOn(redux, 'useDispatch');
        const mockDispatchFn = jest.fn()
        useDispatchSpy.mockReturnValue(mockDispatchFn);

        jest.spyOn(redux, 'useSelector')
        // Mock for useSelector in ArticleAuthor
            .mockReturnValueOnce(authorWithImageObject)

        render(<PrimarySmallPromoArticle {...props} />);

        expect(screen.queryByText('title')).toBeInTheDocument();
        expect(screen.queryByText('1w')).toBeInTheDocument();
        expect(screen.queryByText('horses')).toBeInTheDocument();
        expect(screen.queryByTestId('Container__AuthorImageWrapper')).toBeInTheDocument();
    });

    test('renders PrimarySmallPromoArticle without author image', () => {
        const useDispatchSpy = jest.spyOn(redux, 'useDispatch');
        const mockDispatchFn = jest.fn()
        useDispatchSpy.mockReturnValue(mockDispatchFn);

        jest.spyOn(redux, 'useSelector')
        // Mock for useSelector in ArticleAuthor
            .mockReturnValueOnce(authorWithImageObject)

        render(<PrimarySmallPromoArticle
            {...props}
            shouldHideAuthorsDetails
            isAuthorHavingImage = {false}
        />);

        expect(screen.queryByText('title')).toBeInTheDocument();
        expect(screen.queryByText('1w')).toBeInTheDocument();
        expect(screen.queryByText('horses')).toBeInTheDocument();
        expect(screen.queryByTestId('Container__AuthorImageWrapper')).not.toBeInTheDocument();
    });
})
