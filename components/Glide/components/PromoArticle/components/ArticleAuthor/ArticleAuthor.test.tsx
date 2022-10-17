/* eslint-disable max-len */
import React from 'react';
import { screen, render } from '@testing-library/react'
import * as redux from 'react-redux';
import { Actions } from '@project/common';
import {
    authorWithoutImageId,
    authorWithImageId,
    authorWithoutImageObject,
    authorWithImageObject,
    authorLoading,
} from '../../../../../../tests/mocks';
import { ArticleAuthor } from './ArticleAuthor';

describe('ArticleAuthor', () => {
    test('should get the correct author and display needed data', () => {
        jest.spyOn(redux, 'useSelector')
            .mockReturnValueOnce(undefined)

        const useDispatchSpy = jest.spyOn(redux, 'useDispatch');
        const mockDispatchFn = jest.fn()
        useDispatchSpy.mockReturnValue(mockDispatchFn);

        const { rerender } = render(
            <ArticleAuthor
                id = {authorWithImageId}
                authorName = "authorName"
                isAuthorHavingImage
                shouldHideAuthorsImage = {false}
            />,
        );

        expect(screen.getByTestId('Container__ArticleAuthor')).toBeInTheDocument();

        expect(mockDispatchFn).toHaveBeenCalledWith(Actions.getGlideAuthor(authorWithImageId));

        jest.spyOn(redux, 'useSelector')
            .mockReturnValueOnce(authorLoading)

        rerender(<ArticleAuthor
            id = {authorWithImageId}
            authorName = "authorName"
            isAuthorHavingImage
            shouldHideAuthorsImage = {false}
        />)

        expect(screen.getByTestId('Container__ArticleAuthor')).toBeInTheDocument();
        expect(screen.getByTestId('Container__AuthorImageWrapper')).toBeInTheDocument();
        expect(screen.getByTestId('Icon__DefaultAuthorAvatar')).toBeInTheDocument();
        expect(screen.queryByTestId('Text_AuthorName')).toBeNull();

        jest.spyOn(redux, 'useSelector')
            .mockReturnValueOnce(authorWithImageObject)

        rerender(<ArticleAuthor
            id = {authorWithImageId}
            authorName = "authorName"
            isAuthorHavingImage
            shouldHideAuthorsImage = {false}
        />)

        expect(screen.getByTestId('Image__AuthorImage')).toBeInTheDocument();
        expect(screen.getByTestId('Text_AuthorName')).toBeInTheDocument();
    })

    test('should display default image if author doesnt have image', () => {
        jest.spyOn(redux, 'useSelector')
            .mockReturnValueOnce(authorWithoutImageObject)

        const useDispatchSpy = jest.spyOn(redux, 'useDispatch');
        const mockDispatchFn = jest.fn()
        useDispatchSpy.mockReturnValue(mockDispatchFn);

        render(
            <ArticleAuthor
                id = {authorWithoutImageId}
                authorName = "authorName"
                isAuthorHavingImage
                shouldHideAuthorsImage = {false}
            />,
        );

        expect(screen.getByTestId('Icon__DefaultAuthorAvatar')).toBeInTheDocument();
        expect(screen.getByTestId('Text_AuthorName')).toBeInTheDocument();
    })

    test('should display default image if author doesn\'t have image flag, even if there`s imageUrl', () => {
        jest.spyOn(redux, 'useSelector')
            .mockReturnValueOnce(authorWithImageObject)

        const useDispatchSpy = jest.spyOn(redux, 'useDispatch');
        const mockDispatchFn = jest.fn()
        useDispatchSpy.mockReturnValue(mockDispatchFn);

        render(
            <ArticleAuthor
                id = {authorWithImageId}
                authorName = "authorName"
                isAuthorHavingImage = {false}
                shouldHideAuthorsImage = {false}
            />,
        );

        expect(screen.getByTestId('Icon__DefaultAuthorAvatar')).toBeInTheDocument();
        expect(screen.getByTestId('Text_AuthorName')).toBeInTheDocument();
    })

    test('should image if flag for hiding details is displayed', () => {
        jest.spyOn(redux, 'useSelector')
            .mockReturnValueOnce(authorWithImageObject)

        const useDispatchSpy = jest.spyOn(redux, 'useDispatch');
        const mockDispatchFn = jest.fn()
        useDispatchSpy.mockReturnValue(mockDispatchFn);

        render(
            <ArticleAuthor
                id = {authorWithImageId}
                authorName = "authorName"
                isAuthorHavingImage = {false}
                shouldHideAuthorsImage
            />,
        );

        expect(screen.queryByTestId('Icon__DefaultAuthorAvatar')).toBeNull();
        expect(screen.queryByTestId('Image__AuthorImage')).toBeNull();
        expect(screen.getByTestId('Text_AuthorName')).toBeInTheDocument();
    })
})
