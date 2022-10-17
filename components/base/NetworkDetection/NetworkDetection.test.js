/* eslint-disable no-undef */
import React from 'react';
import { render, screen } from '@testing-library/react'

import NetworkDetection from './index';

describe('NetworkDetection', () => {
    test('renders WarningMessage when offline', () => {
        Object.defineProperty(navigator, 'onLine', {
            value: false,
            writable: true,
        });

        render(
            <NetworkDetection isNetworkErrorHandled = {false} />,
        );

        const warningMessage = screen.getByText('You are currently offline');
        expect(warningMessage).toBeInTheDocument();

        // NOTE: restore to initial value in case following tests depend on it
        navigator.onLine = true;
    });

    test('does not render WarningMessage when online', () => {
        render(
            <NetworkDetection isNetworkErrorHandled = {false} />,
        );

        const warningMessageElement = screen.queryByText('You are currently offline');
        expect(warningMessageElement).toBeNull();
    });
});
