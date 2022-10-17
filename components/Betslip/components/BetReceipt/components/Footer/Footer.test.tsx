import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import { Footer } from './Footer';

const clickHandler = jest.fn();

describe('Bet Receipt Footer', () => {
    it('displays the Footer', () => {
        render(<Footer
            nextRaceLink = "next race"
            todaysRacesLink = "todays race"
            latestRacesLink = "latest races link"
            onReceiptClickHandler = {clickHandler}
        />);

        expect(screen.getByText('Re-use selections')).toBeInTheDocument()
        expect(screen.getByText('Close betslip')).toBeInTheDocument()
        expect(screen.getByText('Next race off')).toBeInTheDocument()
        expect(screen.getByText('Today’s races and results')).toBeInTheDocument()
        expect(screen.getByText('Latest horse racing news')).toBeInTheDocument()
    });
    it('re-use selections button clicked', () => {
        const { getByRole } = render(<Footer
            nextRaceLink = "next race"
            todaysRacesLink = "todays race"
            latestRacesLink = "latest races link"
            onReceiptClickHandler = {clickHandler}
        />);

        fireEvent.click(getByRole('button', { name: 'Re-use selections' }))
        expect(clickHandler).toHaveBeenCalledTimes(1)
    });
    it('close betslip button clicked', () => {
        const { getByRole } = render(<Footer
            nextRaceLink = "next race"
            todaysRacesLink = "todays race"
            latestRacesLink = "latest races link"
            onReceiptClickHandler = {clickHandler}
        />);

        fireEvent.click(getByRole('button', { name: 'Close betslip' }))
        expect(clickHandler).toHaveBeenCalledTimes(1)
    });
});
