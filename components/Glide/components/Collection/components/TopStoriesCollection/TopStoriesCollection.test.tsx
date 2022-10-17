import React from 'react';
import { screen, render } from '@testing-library/react'
import * as redux from 'react-redux';
import { TopStoriesCollection } from './TopStoriesCollection';
import {
    promoArticles,
    topStoriesCollection,
    imageId1Data,
    authorWithImageObject,
} from '../../../../../../tests/mocks';

describe('TopStoriesCollection', () => {
    test('should render correct the collection', () => {
        jest.spyOn(redux, 'useSelector')
            // useSelector in TopStoriesCollection
            .mockReturnValueOnce(promoArticles)
            // useSelector in TopStoryPromoDefaultArticle
            .mockReturnValueOnce(imageId1Data)
            // useSelector in TopStoryPromoDefaultArticle
            .mockReturnValueOnce(imageId1Data)
            // useSelector in ArticleAuthor from PrimarySmallPromoArticle
            .mockReturnValueOnce(authorWithImageObject)
            .mockReturnValueOnce(authorWithImageObject)

        const useDispatchSpy = jest.spyOn(redux, 'useDispatch');
        const mockDispatchFn = jest.fn()
        useDispatchSpy.mockReturnValue(mockDispatchFn);

        // @ts-ignore we don't need full collection's data
        render(<TopStoriesCollection collection = {topStoriesCollection} />)

        expect(screen.getByTestId('Container__1__TopStoriesCollection')).toBeInTheDocument();
        expect(screen.getByTestId('Container__TopStoryHeroArticleWrapper')).toBeInTheDocument();
        expect(screen.getByTestId('Container__TopStoryArticles')).toBeInTheDocument();
    })
})
