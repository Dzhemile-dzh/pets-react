import React from 'react';
import {
    render,
    screen,
} from '@testing-library/react';
import { SingleReceiptItem } from './SingleReceiptItem';

const singleReceiptItem = {
    betId: '8079d1ccfffe2f99353c42f1cc7e6975',
    startTime: '16:40',
    meetingName: 'Ballinrobe',
    places: '1st 3 places',
    payOut: '@ 1/5',
    startPosition: '2',
    horseName: 'Kendancer',
    betType: 'single',
    numberLines: 1,
    displayPrice: '9/4',
    potentialReturns: '0.33',
    useBestOddsGuaranteed: false,
    isStartingPrice: false,
    isEachWay: false,
    stake: '0.10',
    date: '23 Aug 2021',
    currency: '£',
    freeBetStake: 0,
}

describe('Bet Receipt SingleReceiptItem', () => {
    it('displays SingleReceiptItem', () => {
        render(<SingleReceiptItem
            {...singleReceiptItem}
        />);

        expect(screen.getByText('16:40 Ballinrobe')).toBeInTheDocument()
        expect(screen.getByText('2')).toBeInTheDocument()
        expect(screen.getByText('single')).toBeInTheDocument()
        expect(screen.getByText('Kendancer')).toBeInTheDocument()
        expect(screen.getByText('23 Aug 2021')).toBeInTheDocument()
        expect(screen.getByText('Odds')).toBeInTheDocument()
        expect(screen.getByText('Stake')).toBeInTheDocument()
        expect(screen.getByText('Estimated returns')).toBeInTheDocument()
        expect(screen.getByText('9/4')).toBeInTheDocument()
        expect(screen.getByText('0.10')).toBeInTheDocument()
        expect(screen.getByText('0.33')).toBeInTheDocument()
        expect(screen.getByText('Receipt number')).toBeInTheDocument()
        expect(screen.getByText('8079d1ccfffe2f99353c42f1cc7e6975')).toBeInTheDocument()
    });

    it('displays SingleReceiptItem each way selected', () => {
        render(<SingleReceiptItem
            {...singleReceiptItem}
            isEachWay
        />);

        expect(screen.getByText('EW')).toBeInTheDocument()
    });

    it('displays SingleReceiptItem number of lines 2', () => {
        render(<SingleReceiptItem
            {...singleReceiptItem}
            numberLines = {2}
        />);

        expect(screen.getByText('1st 3 places @ 1/5')).toBeInTheDocument()
    });

    it('displays SingleReceiptItem number of lines 2', () => {
        render(<SingleReceiptItem
            {...singleReceiptItem}
            isStartingPrice
        />);

        expect(screen.getByText('SP')).toBeInTheDocument()
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
            render(<SingleReceiptItem
                {...singleReceiptItem}
                stake = {`${userCashStake + userFreeBetStake}`}
                freeBetStake = {userFreeBetStake}
            />);

            expect(screen.getByText('Stake')).toBeInTheDocument();

            const stakeValueElement = screen.getByTestId('Text__BetReceiptSingleStakeValue');
            const freeBetStakeValueElement =
            screen.getByTestId('Text__BetReceiptSingleFreeBetStakeValue');

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

    it('should NOT render free bet stake in the SingleReceiptItem ' +
        'if there is no free bet set', () => {
        render(<SingleReceiptItem
            {...singleReceiptItem}
            stake = "2"
            freeBetStake = {0}
        />);

        expect(screen.getByText('Stake')).toBeInTheDocument();

        expect(screen.getByTestId('Text__BetReceiptSingleStakeValue')).toBeInTheDocument();
        expect(screen.queryByTestId('Text__BetReceiptSingleFreeBetStakeValue'))
            .not.toBeInTheDocument();
    })
});
