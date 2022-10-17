/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
import { screen } from '@testing-library/react'
import { wrapperRender as render } from '../../../../project/utils/testUtility';
import * as hooks from '../../../contexts/BreakPointContext';

import { MyBetsHistory } from './MyBetsHistory';

const BetHistoryProps = {
    betHistory: [
        {
            betId: 'O/11822704/0031860/F',
            bookmakerName: 'williamhill',
            cashOutAmount: '0.08',
            currencySign: '£',
            date: '2021-08-06',
            estimatedReturns: '0.33',
            freeBetStake: null,
            isCashOutAvailable: true,
            numberOfLines: 1,
            selections: [{
                eachWayTermsDenominator: null,
                eachWayTermsNumerator: null,
                eachWayTermsPlaces: null,
                eventDate: '2021-08-06',
                eventName: '1:00 Thirsk',
                eventTime: '13:00',
                isEachWay: false,
                oddsDecimal: 2.25,
                oddsFractionalDenominator: 4,
                oddsFractionalNumerator: 9,
                result: null,
                selectionId: '3278644047',
                selectionName: "Chanson D'amour",
            }],
            stake: '0.10',
            stakePerLine: '0.10',
            time: '07:52',
            totalStake: '0.10',
            type: 'Single',
            isMultipleBetFromDiffRaces: false,
        }, {
            betId: 'O/24464302/0000295',
            bookmakerName: 'coral',
            cashOutAmount: null,
            currencySign: '$',
            date: '2021-08-06',
            estimatedReturns: null,
            freeBetStake: null,
            isCashOutAvailable: false,
            numberOfLines: 2,
            selections: [{
                eachWayTermsDenominator: null,
                eachWayTermsNumerator: null,
                eachWayTermsPlaces: null,
                eventDate: '2021-08-06',
                eventName: '15:10 Musselburgh',
                eventTime: '15:10',
                isEachWay: false,
                oddsDecimal: null,
                oddsFractionalDenominator: 'SP',
                oddsFractionalNumerator: 'SP',
                result: null,
                selectionId: '1466265645',
                selectionName: 'Wise Eagle',
            },
            {
                eachWayTermsDenominator: null,
                eachWayTermsNumerator: null,
                eachWayTermsPlaces: null,
                eventDate: '2021-08-06',
                eventName: '15:10 Musselburgh',
                eventTime: '15:10',
                isEachWay: false,
                oddsDecimal: null,
                oddsFractionalDenominator: 'SP',
                oddsFractionalNumerator: 'SP',
                result: null,
                selectionId: '1466265635',
                selectionName: 'Bodyline',
            }],
            stake: '0.02',
            stakePerLine: '0.01',
            time: '07:52',
            totalStake: '0.02',
            type: 'Reverse Forecast',
            isMultipleBetFromDiffRaces: false,
        },
    ],
}

const BetHistoryEmptyProps = {
    betHistory: [],
}

describe('MyBetsHistory - Single/Multi bet items', () => {
    test('basic MyBetsHistory component render', () => {
        jest.spyOn(hooks, 'useBreakPoint').mockImplementation(() => ({
            isMobile: true,
        }));

        render(
            // @ts-ignore
            <MyBetsHistory {...BetHistoryProps} />,
        );

        screen.queryByText('Account');
        screen.queryByText('My Recent Bets');
        screen.queryByText('View all bets');
    });

    test('Single bet item renders', () => {
        jest.spyOn(hooks, 'useBreakPoint').mockImplementation(() => ({
            isMobile: true,
        }));

        render(
            // @ts-ignore
            <MyBetsHistory {...BetHistoryProps} />,
        );

        screen.queryByText('1:00 Thirsk'); // eventName
        screen.queryByText('13:00'); // eventTime
        screen.queryByText(9); // Denominator
        screen.queryByText(4); // Numerator
        screen.queryByText('£'); // currencySign
        screen.queryByText('0.10'); // totalStake
    });

    test('Single bet item does not render', () => {
        jest.spyOn(hooks, 'useBreakPoint').mockImplementation(() => ({
            isMobile: true,
        }));

        render(
            <MyBetsHistory {...BetHistoryEmptyProps} />,
        );

        expect(screen.queryByText('1:00 Thirsk')).toBeUndefined // eventName
        expect(screen.queryByText('13:00')).toBeUndefined; // eventTime
        expect(screen.queryByText(9)).toBeUndefined; // Denominator
        expect(screen.queryByText(4)).toBeUndefined; // Numerator
        expect(screen.queryByText('£')).toBeUndefined; // currencySign
        expect(screen.queryByText('0.10')).toBeUndefined; // totalStake
    });

    test('Multi bet item renders', () => {
        jest.spyOn(hooks, 'useBreakPoint').mockImplementation(() => ({
            isMobile: true,
        }));

        render(
            // @ts-ignore
            <MyBetsHistory {...BetHistoryProps} />,
        );

        screen.getAllByText('Reverse Forecast'); // betType
        screen.queryByText('15:10 Musselburgh'); // eventName
        screen.queryByText('15:10'); // eventTime
        screen.queryByText('SP'); // Denominator
        screen.queryByText('SP'); // Numerator
        screen.queryByText('$'); // currencySign
        screen.queryByText('0.02'); // totalStake
    });

    test('Multi bet item does not render', () => {
        jest.spyOn(hooks, 'useBreakPoint').mockImplementation(() => ({
            isMobile: true,
        }));

        render(
            <MyBetsHistory {...BetHistoryEmptyProps} />,
        );

        expect(screen.queryByText('Reverse Forecast')).toBeUndefined; // betType
        expect(screen.queryByText('15:10 Musselburgh')).toBeUndefined; // eventName
        expect(screen.queryByText('15:10')).toBeUndefined; // eventTime
        expect(screen.queryByText('SP')).toBeUndefined; // Denominator
        expect(screen.queryByText('SP')).toBeUndefined; // Numerator
        expect(screen.queryByText('$')).toBeUndefined; // currencySign
        expect(screen.queryByText('0.02')).toBeUndefined; // totalStake
    });

    test('displays free bet stake when placed', () => {
        jest.spyOn(hooks, 'useBreakPoint').mockImplementation(() => ({
            isMobile: true,
        }));

        const betHistoryItem = BetHistoryProps.betHistory[0];
        betHistoryItem.freeBetStake = '1.00';
        render(
            // @ts-ignore
            <MyBetsHistory {...BetHistoryProps} />,
        )

        screen.getByText(`+ ${betHistoryItem.currencySign}${betHistoryItem.freeBetStake} FREE BET`);
    })

    test('does not display free bet stake if not placed', () => {
        jest.spyOn(hooks, 'useBreakPoint').mockImplementation(() => ({
            isMobile: true,
        }));

        const betHistoryItem = BetHistoryProps.betHistory[0];
        betHistoryItem.freeBetStake = null;
        render(
            // @ts-ignore
            <MyBetsHistory {...BetHistoryProps} />,
        )

        const freeBetStake = screen.queryByText(
            `+ ${betHistoryItem.currencySign}${betHistoryItem.freeBetStake} FREE BET`,
        );

        expect(freeBetStake).toBeNull();
    })
})
