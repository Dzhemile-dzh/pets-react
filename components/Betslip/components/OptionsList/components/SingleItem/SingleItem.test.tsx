import React from 'react';
import { render, screen } from '@testing-library/react';
import * as redux from 'react-redux';
import { SingleItem } from './SingleItem';

const props = {
    areAllFreeBetsSelected: true,
    areFreeBetsAvailable: true,
    betSelectionIds: ['2887764'],
    betSelectionsCount: 4,
    bookmakerName: 'Coral',
    displayPrice: 'Evs',
    error: null,
    freeBetId: '108355214',
    runnerInfo: {
        id: '2887764',
        horseName: 'Threeunderthrufive',
        oddsDecimal: '2',
        raceId: '794817',
        useBestOddsGuaranteed: true,
        startPosition: '3',
    },
    raceInfo: {
        localTime: {
            raceDate: '2021-11-02',
            raceDateTime: '2021-11-02 14:25',
            raceTime: '14:25',
        },
        startTime: '14:25',
        meetingId: '14',
        meetingName: 'Exeter',
        raceLocalTime: {
            raceDate: '2021-11-02',
            raceDateTime: '2021-11-02 14:25',
            raceTime: '14:25',
        },
        eachWayData: {
            isWinOnly: true,
            payOut: 'Each-way unavailable',
            places: 'Win only',
        },
    },
    openModalForSpecificOption: jest.fn(),
    optionId: 'd6a632557bb7c9c12270b3b699f51200',
    selectOption: jest.fn(),
    selectedOption: null,
    selectionError: null,
    userBalance: {
        balance: 0,
        currencySign: '£',
        formattedBalance: '0.00',
    },
    betOptionUi: {
        stake: 0,
        isEWSelected: false,
        estimatedReturns: {
            currencySign: '£',
            value: '1.00',
        },
        freeBetStake: 1,
        isSpSelected: false,
    },
    selectionDetails: {
        isStartingPrice: false,
        useBestOddsGuaranteed: true,
    },
}

const propsWithBetsOdds = {
    ...props,
    raceInfo: {
        ...props.raceInfo,
        eachWayData: {
            fractional: {
                denominator: 5,
                numerator: 1,
            },
            isWinOnly: false,
            payOut: '@ 1/5',
            places: '1st 4 places',
        },
    },
}

describe('SingleItem', () => {
    test('SingleItem whole component test without Best odds guaranteed', () => {
        const useDispatchSpy = jest.spyOn(redux, 'useDispatch');
        const mockDispatchFn = jest.fn()
        useDispatchSpy.mockReturnValue(mockDispatchFn);

        render(
            <SingleItem
                {...props}
            />,
        );
        expect(screen.getByText('Threeunderthrufive')).toBeInTheDocument()
        expect(screen.queryByTestId('Text__SingleItemCourse')).toHaveTextContent('Exeter')
        expect(screen.getByText('3')).toBeInTheDocument()
        expect(screen.getByText('Win only')).toBeInTheDocument()
        expect(screen.getByText('Each-way unavailable')).toBeInTheDocument();
        expect(screen.getByText('£')).toBeInTheDocument()
        expect(screen.getByText('1.00')).toBeInTheDocument()
        expect(screen.getByText('Estimated returns')).toBeInTheDocument()
    })

    test('SingleItem test with Best odds guaranteed', () => {
        render(
            <SingleItem
                {...propsWithBetsOdds}
            />,
        );
        expect(screen.getByText('EW')).toBeInTheDocument()
        expect(screen.getByText('x1')).toBeInTheDocument()
        expect(screen.getByText('1st 4 places @ 1/5')).toBeInTheDocument()
    })

    test('SingleItem test with free bet', () => {
        render(
            <SingleItem
                {...props}
            />,
        );
        expect(screen.queryByTestId('Button__SingleItemRemoveFreeBet')).toBeInTheDocument()
    })

    test('SingleItem test without free bet', () => {
        render(
            <SingleItem
                {...props}
                freeBetId = {null}
                freeBetStake = {null}
            />,
        );
        expect(screen.queryByTestId('Button__SingleItemToggleFreeBet')).toBeInTheDocument()
    })
})
