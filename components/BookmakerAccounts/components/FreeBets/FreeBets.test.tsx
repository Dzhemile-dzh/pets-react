import React from 'react';
import { screen, render } from '@testing-library/react';
import { FreeBets } from './FreeBets';

const freeBets = [
    {
        id: '234170530',
        type: 'voucher',
        amount: 2,
        description: '',
        expiry: null,
        minStake: 0,
        maxStake: 0,
    },
    {
        id: '272941285',
        type: 'voucher',
        amount: 5,
        description: '',
        expiry: null,
        minStake: 0,
        maxStake: 0,
    },
    {
        id: '302322121',
        type: 'voucher',
        amount: 1,
        description: '',
        expiry: null,
        minStake: 0,
        maxStake: 0,
    },
]

describe('FreeBets', () => {
    it('displays FreeBets', () => {
        render(<FreeBets
            freeBets = {freeBets}
            freeBetBalance = "£8.00"
            bookmakerName = "williamhill"
            currencySign = "£"
            onBackBtnClick = {jest.fn()}
        />);

        expect(screen.getByText('Total Free Bets £8.00')).toBeInTheDocument()
        expect(screen.getByText('£1 FREE BET')).toBeInTheDocument()
        expect(screen.getByText('£5 FREE BET')).toBeInTheDocument()
        expect(screen.getByText('£2 FREE BET')).toBeInTheDocument()
        expect(screen.getByText('back')).toBeInTheDocument()
        expect(screen.getByText('FREE BETS')).toBeInTheDocument()
    });
});
