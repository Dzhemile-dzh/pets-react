import React from 'react';
import { screen } from '@testing-library/react'
import moment from 'moment';

import { wrapperRender as render } from '../../../../project/utils/testUtility';

import FreeBetsPopover from './index';

const props = {
    currencySign: '£',
    bookmakerListPosition: 2,
    setShouldShowPopover: jest.fn(),
};

const singleFreeBet = {
    id: '3',
    type: 'voucher',
    amount: 2,
    description: '',
    expiry: '2022-10-26',
    minStake: 0,
    maxStake: 0,
};

const groupedFreeBets = [{
    id: '1',
    type: 'voucher',
    amount: 1,
    description: '',
    expiry: null,
    minStake: 0,
    maxStake: 0,
}, {
    id: '2',
    type: 'voucher',
    amount: 1,
    description: '',
    expiry: '2022-10-26',
    minStake: 0,
    maxStake: 0,
}];

describe('Free Bets Popover', () => {
    it('groups bets with the same amount', () => {
        render(
            <FreeBetsPopover {
                ...{
                    ...props,
                    freeBets: [singleFreeBet, ...groupedFreeBets],
                }
            }
            />,
        );

        const popover = screen.getByTestId('Container__FreeBetsPopover');
        const freeBetItems = screen.getAllByTestId('Container__FreeBetItem');

        expect(popover).toBeInTheDocument();
        expect(freeBetItems.length).toEqual(2);
    });

    it('correctly displays free bet data - amount, currency sign, expiry date', () => {
        render(
            <FreeBetsPopover {
                ...{
                    ...props,
                    freeBets: [singleFreeBet],
                }
            }
            />,
        );

        const amount = screen.getByText('£2 FREE BET');
        const expiryDate = screen.getByText('Exp 26 October 2022');

        expect(amount).toBeInTheDocument();
        expect(expiryDate).toBeInTheDocument();
    });

    it('groups bets with the same amount and shows invalid date', () => {
        render(
            <FreeBetsPopover {
                ...{
                    ...props,
                    freeBets: groupedFreeBets,
                }
            }
            />,
        );

        const amount = screen.getByText('2x £1 FREE BET');
        const expiryDate = screen.getByText('Exp invalid date');

        expect(amount).toBeInTheDocument();
        expect(expiryDate).toBeInTheDocument();
    });

    it('shows expires soon warning when expiry date is in less than 24 hours', () => {
        const expiry = moment().add(1, 'hour').format('YYYY-MM-DDTHH:mm:ss.sssZ');

        render(
            <FreeBetsPopover {
                ...{
                    ...props,
                    freeBets: [{
                        ...singleFreeBet,
                        expiry,
                    }],
                }
            }
            />,
        );

        const amount = screen.getByText('£2 FREE BET');
        const expiresSoonWarning = screen.getByTestId('Container__FreeBetItemExpireSoon');

        expect(amount).toBeInTheDocument();
        expect(expiresSoonWarning).toBeInTheDocument();
    });

    it('doesn\'t shows expires soon warning when expiry date is in more than 24 hours', () => {
        const expiry = moment().add(25, 'hour').format('YYYY-MM-DDTHH:mm:ss.sssZ');

        render(
            <FreeBetsPopover {
                ...{
                    ...props,
                    freeBets: [{
                        ...singleFreeBet,
                        expiry,
                    }],
                }
            }
            />,
        );

        const amount = screen.getByText('£2 FREE BET');
        const expiresSoonWarning = screen.queryByText('Container__FreeBetItemExpireSoon');

        expect(amount).toBeInTheDocument();
        expect(expiresSoonWarning).not.toBeInTheDocument();
    });

    it('shows no expiry date when expiry is null and bet is not grouped', () => {
        render(
            <FreeBetsPopover {
                ...{
                    ...props,
                    freeBets: [{
                        ...singleFreeBet,
                        expiry: null,
                    }],
                }
            }
            />,
        );

        const amount = screen.getByText('£2 FREE BET');
        const expiryDate = screen.queryByText('Text__FreeBetItemExpireDate');

        expect(amount).toBeInTheDocument();
        expect(expiryDate).not.toBeInTheDocument();
    });
});
