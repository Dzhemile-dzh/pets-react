import React from 'react';
import { screen, render } from '@testing-library/react';
import preloadAll from 'jest-next-dynamic';
import { Header } from './Header';

const clickHandler = jest.fn();

describe('Bet Receipt Header', () => {
    beforeAll(async () => {
        await preloadAll();
    });
    it('displays the Header', () => {
        render(<Header
            selectedBookmakerName = "williamhill"
            showBookmakerMessage
            onReceiptClickHandler = {clickHandler}
        />);

        expect(screen.getByText('Thank you')).toBeInTheDocument()
        expect(screen.getByText('for betting through')).toBeInTheDocument()
        expect(screen.getByText('You placed your bet with')).toBeInTheDocument()
    });
});
