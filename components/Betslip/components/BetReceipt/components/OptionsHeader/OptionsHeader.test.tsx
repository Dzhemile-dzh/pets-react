import React from 'react';
import { screen, render } from '@testing-library/react';
import { OptionsHeader } from './OptionsHeader';

describe('Bet Receipt OptionsHeader', () => {
    it('displays OptionsHeader singles', () => {
        render(<OptionsHeader
            count = {3}
            isSingles
            isMultiples = {false}
        />);

        expect(screen.getByText('x3')).toBeInTheDocument()
        expect(screen.getByText('Singles')).toBeInTheDocument()
        expect(screen.getByText('Indicates best')).toBeInTheDocument()
        expect(screen.getByText('odds guaranteed')).toBeInTheDocument()
    });

    it('displays OptionsHeader single', () => {
        render(<OptionsHeader
            count = {1}
            isSingles
            isMultiples = {false}
        />);

        expect(screen.getByText('x1')).toBeInTheDocument()
        expect(screen.getByText('Single')).toBeInTheDocument()
    });

    it('displays OptionsHeader Multiples', () => {
        render(<OptionsHeader
            count = {3}
            isSingles = {false}
            isMultiples
        />);

        expect(screen.getByText('x3')).toBeInTheDocument()
        expect(screen.getByText('Multiples')).toBeInTheDocument()
    });
});
