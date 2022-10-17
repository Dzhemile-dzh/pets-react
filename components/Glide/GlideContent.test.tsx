/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
import { screen, render } from '@testing-library/react';
import * as redux from 'react-redux';
import {
    isNotInitilzed,
    isInitialized,
    templateNoChildren,
    templateError,
    templateWithChildren,
    layoutsId1Data,
    widgetId1Data,
} from '../../tests/mocks';

import { GlideContent } from './GlideContent';

describe('GlideContent', () => {
    test('should not display template if not initialised', () => {
        jest.spyOn(redux, 'useSelector')
            .mockReturnValueOnce(isNotInitilzed)
            .mockReturnValueOnce(templateNoChildren)

        render(<GlideContent path = "route-path" />);

        // queryByTestId doesn't fail if it doesn't find it, but getByTestId fails
        expect(screen.queryByTestId('Container__GlideTemplate')).toBeNull();
    })

    test('should not display template if template have error', () => {
        jest.spyOn(redux, 'useSelector')
            .mockReturnValueOnce(isInitialized)
            .mockReturnValueOnce(templateError)

        render(<GlideContent path = "route-path" />);

        // queryByTestId doesn't fail if it doesn't find it, but getByTestId fails
        expect(screen.queryByTestId('Container__GlideTemplate')).toBeNull();
    });
    jest.restoreAllMocks();

    test('should display template if initialised and no errors', () => {
        jest.spyOn(redux, 'useSelector')
            // first useSelector in Template
            .mockReturnValueOnce(isInitialized)
            // second useSelector in Template
            .mockReturnValueOnce(templateWithChildren)
            // useSelector in Layout
            .mockReturnValueOnce(layoutsId1Data.layouts_1)
            // useSelector in Widget
            .mockReturnValueOnce(widgetId1Data.widgets_1)
            // useSelector in Collection
            .mockReturnValueOnce(undefined)

        // Mocking useDispatch for Collection call
        const useDispatchSpy = jest.spyOn(redux, 'useDispatch');
        const mockDispatchFn = jest.fn()
        useDispatchSpy.mockReturnValue(mockDispatchFn);

        render(
            <GlideContent path = "route-path" />,
        );

        expect(screen.getByTestId('Container__GlideTemplate')).toBeInTheDocument();
    })
})
