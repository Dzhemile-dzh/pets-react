import React from 'react';
import { screen, render } from '@testing-library/react';
import { MultipleItemSelection } from './MultipleItemSelection';

export const multipleBetItemSelections1 = [
    {
        date: '23 August 2021',
        displayPrice: '13/8',
        horseName: 'Almost An Angel',
        isStartingPrice: true,
        meetingName: 'Chepstow',
        runnerNumber: '2',
        startTime: '13:30',
        useBestOddsGuaranteed: true,
    },
]

export const multipleBetItemSelections2 = [
    {
        date: '23 August 2021',
        displayPrice: '13/8',
        horseName: 'Almost An Angel',
        isStartingPrice: false,
        meetingName: 'Chepstow',
        runnerNumber: '2',
        startTime: '13:30',
        useBestOddsGuaranteed: false,
    },
]

describe('Bet Receipt MultipleItemSelection', () => {
    it('displays MultipleItemSelection with best odds and starting price', () => {
        render(<MultipleItemSelection
            multipleBetItemSelections = {multipleBetItemSelections1}
        />);

        expect(screen.getByText('13:30 Chepstow')).toBeInTheDocument()
        expect(screen.getByText('23 August 2021')).toBeInTheDocument()
        expect(screen.getByText('Almost An Angel')).toBeInTheDocument()
        expect(screen.getByText('2')).toBeInTheDocument()
        expect(screen.getByText('SP')).toBeInTheDocument()
    });

    it('displays MultipleItemSelection', () => {
        render(<MultipleItemSelection
            multipleBetItemSelections = {multipleBetItemSelections2}
        />);

        expect(screen.getByText('13:30 Chepstow')).toBeInTheDocument()
        expect(screen.getByText('23 August 2021')).toBeInTheDocument()
        expect(screen.getByText('13/8')).toBeInTheDocument()
        expect(screen.getByText('Almost An Angel')).toBeInTheDocument()
        expect(screen.getByText('2')).toBeInTheDocument()
    });
});
