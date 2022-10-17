import React from 'react';
import {
    render,
    screen,
} from '@testing-library/react';
import * as redux from 'react-redux';
import { OptionsFooter } from './OptionsFooter';
import { ModalContext } from '../../../base/Modal';

const optionsFooterProps = {
    totalEstimatedReturns: {
        currencySign: '€',
        value: '4.00',
    },
    totalStake: {
        currencySign: '€',
        value: '1.00',
    },
    totalFreeBetsStake: {
        currencySign: '€',
        value: '1.00',
    },
    combinedStake: {
        currencySign: '€',
        value: '2.00',
    },
    error: null,
    canPlaceBet: true,
    placeBet: jest.fn(),
    toggleBetReceipt: jest.fn(),
    acceptPriceChanges: jest.fn(),
    bookmakerName: 'William Hill',
    betSelectionsCount: 1,
    freeBets: [],
}

const renderMockedOptionsFooter = (props = {}) => {
    return render(
        // eslint-disable-next-line react/jsx-no-constructed-context-values
        <ModalContext.Provider value = {{
            modals: [],
            showModal: jest.fn(),
            hideModal: jest.fn(),
        }}
        >
            <OptionsFooter
                {...optionsFooterProps}
                {...props}
            />
        </ModalContext.Provider>,
    );
};

describe('OptionsFooter component', () => {
    it('should render OptionsFooter component', () => {
        const useDispatchSpy = jest.spyOn(redux, 'useDispatch');
        const mockDispatchFn = jest.fn()
        useDispatchSpy.mockReturnValue(mockDispatchFn);

        renderMockedOptionsFooter();

        expect(screen.getByText('Total stake')).toBeInTheDocument();
        expect(screen.getByText('€ 1.00')).toBeInTheDocument();
        expect(screen.getByText('+ € 1.00 free bet')).toBeInTheDocument();
        expect(screen.getByText('Estimated returns')).toBeInTheDocument();
        expect(screen.getByText('Place bet')).toBeInTheDocument();
    });

    it('should NOT render cash stake if there is no such passed by the user', () => {
        renderMockedOptionsFooter({
            totalStake: {
                currencySign: '€',
                value: '0.00',
            },
            totalFreeBetsStake: {
                currencySign: '€',
                value: '1.00',
            },
            combinedStake: {
                currencySign: '€',
                value: '1.00',
            },
        });

        const cashStakeElement = screen.queryByTestId('Text__OptionsFooterTotalCashStake');
        expect(cashStakeElement).not.toBeInTheDocument();
    });

    it('should NOT render free bet stake if there is no such passed by the user', () => {
        renderMockedOptionsFooter({
            totalStake: {
                currencySign: '€',
                value: '0.00',
            },
            totalFreeBetsStake: {
                currencySign: '€',
                value: '0.00',
            },
            combinedStake: {
                currencySign: '€',
                value: '1.00',
            },
        });

        const freeBetStakeElement = screen.queryByTestId('Text__OptionsFooterTotalFreeBetsStake');

        expect(freeBetStakeElement).not.toBeInTheDocument();
    });
})
