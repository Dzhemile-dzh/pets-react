/* eslint-disable no-undef */
import React from 'react';
import { render, screen } from '@testing-library/react';
import * as hooks from '../../../contexts/BreakPointContext';
import { BookmakerCompliance } from './BookmakerCompliance';

const bookmakerConfigs = {
    bet365: {
        mobile: {
            compliance: 'Best Odds Guaranteed. Take a price - mobile',
        },
        desktop: {
            compliance: 'Best Odds Guaranteed. Take a price - desktop',
        },
    },
}

describe('BookmakerCompliance', () => {
    test('To show compliance text on mobile is on the screen', () => {
        jest.spyOn(hooks, 'useBreakPoint').mockImplementation(() => ({
            isMobile: true,
        }));

        render(
            <BookmakerCompliance
                bookmakerConfiguration = {bookmakerConfigs}
                bookmakerName = "bet365"
            />,
        );

        expect(
            screen.getByText(
                'Best Odds Guaranteed. Take a price - mobile',
            ),
        ).toBeInTheDocument()
    });

    test('To show compliance text on web is on the screen', () => {
        jest.spyOn(hooks, 'useBreakPoint').mockImplementation(() => ({
            isDesktop: true,
        }));

        render(
            <BookmakerCompliance
                bookmakerConfiguration = {bookmakerConfigs}
                bookmakerName = "bet365"
            />,
        );

        expect(
            screen.getByText(
                'Best Odds Guaranteed. Take a price - desktop',
            ),
        ).toBeInTheDocument()
    });
});
