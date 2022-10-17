/* eslint-disable max-len */
import React from 'react';
import { screen } from '@testing-library/react'
import { wrapperRender as render } from '../../../../../project/utils/testUtility';
import { MyBetsHistoryReceipt } from './MyBetsHistoryReceipt';

describe('My Bets Receipt', () => {
    const bookmaker = {
        betId: '123123123',
        date: '2021-08-06',
        betType: 'Double',
        estimatedReturns: '0.33',
        isEachWay: false,
        time: '07:52',
        currencySign: '£',
        numberOfLines: 1,
        stakePerLine: '0.10',
    }

    describe('MyBetsHistoryReceipt to render every field', () => {
        it('to not display view selections when the bet type is single', () => {
            render(<MyBetsHistoryReceipt {...bookmaker} betType = "Single" />);

            expect(screen.queryByText('VIEW SELECTIONS')).not.toBeInTheDocument;
        });

        it('to display every fields', () => {
            render(<MyBetsHistoryReceipt {...bookmaker} />);

            expect(screen.queryByText('VIEW SELECTIONS')).toBeInTheDocument;
            expect(screen.queryByText('RECEIPT NUMBER')).toBeInTheDocument;
            expect(screen.queryByText('PLACED AT')).toBeInTheDocument;
            expect(screen.queryByText('BET TYPE')).toBeInTheDocument;
            expect(screen.queryByText('ESTIMATED RETURN')).toBeInTheDocument;
            expect(screen.queryByText('123123123')).toBeInTheDocument;
            expect(screen.queryByText('16 Aug 2021')).toBeInTheDocument;
            expect(screen.queryByText('07:52')).toBeInTheDocument;
            expect(screen.queryByText('Double')).toBeInTheDocument;
            expect(screen.queryByText('£0.45')).toBeInTheDocument;
        });

        it('to display n/a if there is no estimared returns', () => {
            render(<MyBetsHistoryReceipt {...bookmaker} estimatedReturns = {null} />);

            expect(screen.queryByText('n/a')).toBeInTheDocument;
        });

        it('to display EW if each way is true', () => {
            render(<MyBetsHistoryReceipt {...bookmaker} isEachWay />);

            expect(screen.queryByText('Double EW')).toBeInTheDocument;
        });

        it('to display number of lines when they are greater than one line and bet type is Forecast/Tricast', () => {
            render(<MyBetsHistoryReceipt {...bookmaker} numberOfLines = {2} betType = "Forecast" />);

            expect(screen.queryByText('2 x £0.45 Forecast')).toBeInTheDocument;
        });
    })
})
