import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import * as redux from 'react-redux';
import { MultipleItem } from './MultipleItem';

const props = {
    betTypeName: 'Double',
    userBalance: {
        balance: 100,
        currencySign: '£',
    },
    error: null,
    isEWSelected: false,
    isMobile: false,
    numberLines: 2,
    optionId: '257798276d7f7c3800c2ead7851d32aa',
    selectOption: () => { return false }, // to pass the build in Jenkins
    selectedOption: '257798276d7f7c3800c2ead7851d32aa',
    toggleEWSelected: () => { return false }, // to pass the build in Jenkins
    updateStake: () => { return false }, // to pass the build in Jenkins
    betTypeDesc: 'A Double consists of 1 bet on 2 selections from different races.',
    isSelectionEditable: true,
    useBestOddsGuaranteed: true,
    isStartingPrice: false,
    multipleBetItemSelections: [
        {
            horseName: 'Marlay Park',
            runnerNumber: 4,
            priceNumerator: 6,
            priceDenominator: 9,
            isWinOnly: false,
            optionId: '5198df0a33fd97af52bec6d051349596',
            id: '34560',
        },
        {
            horseName: 'Ajrad',
            runnerNumber: 10,
            priceNumerator: 3,
            priceDenominator: 5,
            isWinOnly: false,
            optionId: '5198df0a33fd97af52bec6d051349596',
            id: '34565',
        },
    ],
    freeBetId: 'asdad23123',
    freeBetStake: 1,
    areFreeBetsAvailable: true,
    betOptionUi: {
        stake: 3.32,
        isEWSelected: false,
        estimatedReturns: {
            currencySign: '£',
            value: 20.23,
        },
        freeBetStake: 1,
    },
}

const multipleBetItemSelectionsEWTest = [
    {
        horseName: 'Marlay Park',
        runnerNumber: 4,
        priceNumerator: 6,
        priceDenominator: 9,
        isWinOnly: true,
        optionId: '5198df0a33fd97af52bec6d051349596',
        id: '34560',
    },
    {
        horseName: 'Ajrad',
        runnerNumber: 10,
        priceNumerator: 3,
        priceDenominator: 5,
        isWinOnly: false,
        optionId: '5198df0a33fd97af52bec6d051349596',
        id: '34565',
    },
]

const someSelectionsExcludedFromMultiples = {
    34560: true,
    34565: false,
}

const allSelectionsIncludedInMultiples = {
    34560: true,
    34565: true,
}

describe('MultiItem', () => {
    test('MultiItem whole component test with Best odds guaranteed', () => {
        const useDispatchSpy = jest.spyOn(redux, 'useDispatch');
        const mockDispatchFn = jest.fn()
        useDispatchSpy.mockReturnValue(mockDispatchFn);

        render(
            <MultipleItem
                {...props}
                includedInMultipleSelections = {allSelectionsIncludedInMultiples}
            />,
        );
        expect(screen.getByText('Double')).toBeInTheDocument()
        expect(screen.getByText('x2')).toBeInTheDocument()
        expect(screen.getByText('EW').closest('button')).not.toBeDisabled();
        expect(screen.getByText('Best odds guaranteed')).toBeInTheDocument();
        expect(screen.getByText('edit selections')).toBeInTheDocument()
        expect(screen.getByText('20.23')).toBeInTheDocument()
        expect(screen.getByText('£')).toBeInTheDocument()
        expect(screen.getByText('Estimated returns')).toBeInTheDocument()
    })

    test('MultiItem - view selection option button / bet Type Description', () => {
        render(
            <MultipleItem
                {...props}
                isSelectionEditable = {false}
                includedInMultipleSelections = {allSelectionsIncludedInMultiples}
            />,
        );
        expect(screen.getByText('view selections')).toBeInTheDocument();

        fireEvent.click(screen.getByTestId('Popover__MultiItemBetType'));

        expect(
            screen.getByText(
                'A Double consists of 1 bet on 2 selections from different races.',
            ),
        ).toBeInTheDocument();
    })

    test('MultiItem - EW selections when is EW button selected', () => {
        const useDispatchSpy = jest.spyOn(redux, 'useDispatch');
        const mockDispatchFn = jest.fn()
        useDispatchSpy.mockReturnValue(mockDispatchFn);

        render(
            <MultipleItem
                {...props}
                betOptionUi = {{
                    ...props.betOptionUi,
                    isEWSelected: true,
                }}
                includedInMultipleSelections = {allSelectionsIncludedInMultiples}
            />,
        );
        expect(screen.getByText('edit selections')).toBeInTheDocument();

        fireEvent.click(screen.getByTestId('Button__MultiItemOdds'));

        expect(screen.getByText('x4')).toBeInTheDocument();
    })
    test('MultiItem without Best odds guaranteed', () => {
        render(
            <MultipleItem
                {...props}
                isStartingPrice
                includedInMultipleSelections = {allSelectionsIncludedInMultiples}
            />,
        );
        expect(screen.queryByText('Best odds guaranteed')).not.toBeInTheDocument();
    })
    test('MultiItem without Best odds guaranteed', () => {
        render(
            <MultipleItem
                {...props}
                useBestOddsGuaranteed = {false}
                includedInMultipleSelections = {allSelectionsIncludedInMultiples}
            />,
        );
        expect(screen.queryByText('Best odds guaranteed')).not.toBeInTheDocument();
    })
    test('MultiItem without EW button', () => {
        render(
            <MultipleItem
                {...props}
                multipleBetItemSelections = {multipleBetItemSelectionsEWTest}
                includedInMultipleSelections = {allSelectionsIncludedInMultiples}
            />,
        );
        expect(screen.getByText('Each-way unavailbale')).toBeInTheDocument();
    })

    test('MultiItem with excluded multiples', () => {
        render(
            <MultipleItem
                {...props}
                multipleBetItemSelections = {multipleBetItemSelectionsEWTest}
                includedInMultipleSelections = {someSelectionsExcludedFromMultiples}
            />,
        );
        expect(screen.getByText('edit selections')).toBeInTheDocument();
    })

    test('MultiItem test with free bet', () => {
        render(
            <MultipleItem
                {...props}
                multipleBetItemSelections = {multipleBetItemSelectionsEWTest}
                includedInMultipleSelections = {someSelectionsExcludedFromMultiples}
            />,
        );
        expect(screen.queryByTestId('Button__MultiItemRemoveFreeBet')).toBeInTheDocument()
    })

    test('MultiItem test without free bet', () => {
        render(
            <MultipleItem
                {...props}
                freeBetId = {null}
                freeBetStake = {null}
                multipleBetItemSelections = {multipleBetItemSelectionsEWTest}
                includedInMultipleSelections = {someSelectionsExcludedFromMultiples}
            />,
        );
        expect(screen.queryByTestId('Button__MultiItemToggleFreeBet')).toBeInTheDocument()
    })
})
