import React from 'react';
import { screen, render } from '@testing-library/react'
import * as redux from 'react-redux';
import { Actions } from '@project/common';
import { topStoriesCollectionId } from '../../../../tests/mocks';
import { Collection } from './Collection';

describe('Collection', () => {
    test('should display loading spinner before making the request', () => {
        jest.spyOn(redux, 'useSelector')
            .mockReturnValueOnce(undefined)

        const useDispatchSpy = jest.spyOn(redux, 'useDispatch');
        const mockDispatchFn = jest.fn()
        useDispatchSpy.mockReturnValue(mockDispatchFn);

        render(<Collection id = {topStoriesCollectionId} />)

        expect(screen.getByTestId(`Container__${topStoriesCollectionId}__CollectionLoader`))
            .toBeInTheDocument();
        expect(mockDispatchFn)
            .toHaveBeenCalledWith(Actions.getGlideCollection(topStoriesCollectionId));
    })

    test('should display loading spinner while waiting for response', () => {
        jest.spyOn(redux, 'useSelector')
            .mockReturnValueOnce({
                isLoading: true,
                data: null,
            })

        const useDispatchSpy = jest.spyOn(redux, 'useDispatch');
        const mockDispatchFn = jest.fn()
        useDispatchSpy.mockReturnValue(mockDispatchFn);

        render(<Collection id = {topStoriesCollectionId} />)

        expect(screen.getByTestId(`Container__${topStoriesCollectionId}__CollectionLoader`))
            .toBeInTheDocument();
    })
})
