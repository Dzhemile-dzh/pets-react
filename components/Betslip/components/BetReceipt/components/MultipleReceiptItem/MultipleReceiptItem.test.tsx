/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
import {
    render,
    screen,
} from '@testing-library/react';
import { MultipleReceiptItem } from './MultipleReceiptItem';

const multipleBetItemSelections1 = [
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
    {
        date: '23 August 2021',
        displayPrice: '7/2',
        horseName: "Kath's Toyboy",
        isStartingPrice: false,
        meetingName: 'Chepstow',
        runnerNumber: '2',
        startTime: '13:00',
        useBestOddsGuaranteed: true,

    },
]

describe('Bet Receipt MultipleReceiptItem', () => {
    it('displays MultipleReceiptItem', () => {
        render(<MultipleReceiptItem
            betId = "13cee36e57dcf24c7ff58dda706884ea"
            betType = "double"
            numberLines = {2}
            // @ts-ignore
            potentialReturns = {1.18}
            // @ts-ignore
            stake = {0.10}
            currency = "£"
            freeBetStake = {0}
            multipleSelections = {multipleBetItemSelections1}
        />);

        expect(screen.getByText('double')).toBeInTheDocument()
        expect(screen.getByText('x2')).toBeInTheDocument()
        expect(screen.getByText('Unit stake')).toBeInTheDocument()
        expect(screen.getByText('Total stake')).toBeInTheDocument()
        expect(screen.getByText('Estimated returns')).toBeInTheDocument()
        expect(screen.getByText('0.1')).toBeInTheDocument()
        expect(screen.getByText('0.20')).toBeInTheDocument()
        expect(screen.getByText('1.18')).toBeInTheDocument()
        expect(screen.getByText('Receipt number')).toBeInTheDocument()
        expect(screen.getByText('13cee36e57dcf24c7ff58dda706884ea')).toBeInTheDocument()
    });

    it('displays MultipleReceiptItem with no estimated returns', () => {
        render(<MultipleReceiptItem
            betId = "13cee36e57dcf24c7ff58dda706884ea"
            betType = "double"
            numberLines = {2}
            potentialReturns = {null}
            stake = "0.10"
            freeBetStake = {0}
            currency = "£"
            multipleSelections = {multipleBetItemSelections1}
        />);

        expect(screen.getByText('N/A')).toBeInTheDocument()
    });

    it.each([
        [0.03, 1, 0.03, 1, '£'],
        [0, 1, 0, 1, '£'],
    ])(
        'given (%d userCashStake + %d userFreeBetStake) should return receipt item' +
        'with %d stake and %d freeBetStake',
        (
            userCashStake,
            userFreeBetStake,
            expectedReceiptItemStake,
            expectedReceiptItemFreeBetStake,
            currency,
        ) => {
            render(<MultipleReceiptItem
                betId = "13cee36e57dcf24c7ff58dda706884ea"
                betType = "double"
                numberLines = {1}
                potentialReturns = {null}
                stake = {`${userCashStake + userFreeBetStake}`}
                freeBetStake = {userFreeBetStake}
                currency = "£"
                multipleSelections = {multipleBetItemSelections1}
            />);

            expect(screen.getByText('Total stake')).toBeInTheDocument();

            const stakeValueElement = screen.getByTestId('Text__MultiReceiptItemStakeValue');
            const freeBetStakeValueElement =
            screen.getByTestId('Text__MultiReceiptItemFreeBetStakeValue');

            expect(stakeValueElement).toBeInTheDocument();
            expect(freeBetStakeValueElement).toBeInTheDocument();

            expect(stakeValueElement)
                .toHaveTextContent(`${expectedReceiptItemStake.toFixed(2)}`)
            expect(freeBetStakeValueElement)
                .toHaveTextContent(
                    `+ ${currency}${expectedReceiptItemFreeBetStake.toFixed(2)} free bet`,
                );
        },
    );

    it('should NOT render free bet stake in the MultipleReceiptItem' +
        'if there is no free bet set', () => {
        render(<MultipleReceiptItem
            betId = "13cee36e57dcf24c7ff58dda706884ea"
            betType = "double"
            numberLines = {1}
            potentialReturns = {null}
            stake = "2"
            freeBetStake = {0}
            currency = "£"
            multipleSelections = {multipleBetItemSelections1}
        />);

        expect(screen.getByText('Total stake')).toBeInTheDocument();

        expect(screen.getByTestId('Text__MultiReceiptItemStakeValue')).toBeInTheDocument();
        expect(screen.queryByTestId('Text__MultiReceiptItemFreeBetStakeValue'))
            .not.toBeInTheDocument();
    })
});
