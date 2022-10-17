import React from 'react';
import { render, screen } from '@testing-library/react';
import * as redux from 'react-redux';

import { Odds } from './Odds.tsx';

const oddsProps = {
    addBetSelection: () => {},
    betSelection: {},
    betSelectionsCount: 1,
    isDiffusionLoaded: true,
    isInBetslip: false,
    priceData: {
        fractional: {
            denominator: 1,
            numerator: 7,
            odd: '7/1',
        },
    },
    priceType: 'fractional',
    race: {},
    removeBetSelection: () => {},
    runner: {},
    selectedBookmaker: 'WH_OXI',
    shouldShowFavLabel: false,
    showCompareOdds: false,
    showOdds: true,
}

describe('Odds', () => {
    const useDispatchSpy = jest.spyOn(redux, 'useDispatch');
    const mockDispatchFn = jest.fn()
    useDispatchSpy.mockReturnValue(mockDispatchFn);

    it('To display an enabled odds button', () => {
        const spy = jest.spyOn(redux, 'useSelector')
        spy.mockReturnValue([{ feed: 'WH_OXI', displayName: 'William Hill' }])

        render(
            <Odds {...oddsProps} />,
        );

        const oddsButton = screen.getByRole('button', { name: /7 to 1 odds/i });

        expect(oddsButton).toBeInTheDocument();
        expect(oddsButton).toBeEnabled();
    });

    it('To display a disabled odds button if there is no price data', () => {
        const spy = jest.spyOn(redux, 'useSelector')
        spy.mockReturnValue([{ feed: 'WH_OXI', displayName: 'William Hill' }])
        render(
            <Odds {
                ...{
                    ...oddsProps,
                    priceData: {},
                }
            }
            />,
        );

        const oddsButton = screen.getByRole('button', { name: /no odds available/i });

        expect(oddsButton).toBeInTheDocument();
        expect(oddsButton).toBeDisabled();
    });

    it('To display dash instead of odds in button when showOdds is false', () => {
        const spy = jest.spyOn(redux, 'useSelector')
        spy.mockReturnValue([{ feed: 'WH_OXI', displayName: 'William Hill' }])

        render(
            <Odds {
                ...{
                    ...oddsProps,
                    showOdds: false,
                }
            }
            />,
        );

        expect(screen.queryByText('7/1')).not.toBeInTheDocument();
        expect(screen.queryByText('-')).toBeInTheDocument();
    });
});
