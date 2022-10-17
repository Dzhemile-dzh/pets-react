/* eslint-disable max-len */
import React from 'react';
import { screen } from '@testing-library/react'
import { wrapperRender as render } from '../../../../project/utils/testUtility';
import MyBetsHistory from './index';

const singleBetItem = {
    betId: 'O/11822704/0032194/F',
    bookmakerName: 'williamhill',
    totalStake: '0.03',
    betType: 'single',
    currencySign: '£',
    numberOfLines: 1,
    stakePerLine: '0.03',
    date: '2021-09-03',
    estimatedReturns: '0.49',
    isEachWay: true,
    time: '04:57',
    selections: [
        {
            selectionId: '3318340429',
            selectionName: 'Monash',
            eventName: '1:00 Newcastle',
            eventTime: '13:00',
            eventDate: '2021-09-03',
            oddsDecimal: 2.75,
            isEachWay: true,
            oddsFractionalNumerator: 11,
            oddsFractionalDenominator: 4,
            eachWayTermsPlaces: null,
            eachWayTermsNumerator: null,
            eachWayTermsDenominator: null,
            result: null,
        },
    ],
}

const doubleBetItem = {
    betId: 'O/11822704/0032241/F',
    bookmakerName: 'williamhill',
    totalStake: '0.03',
    betType: 'double',
    currencySign: '£',
    numberOfLines: 1,
    stakePerLine: '0.03',
    date: '2021-09-03',
    estimatedReturns: '0.49',
    isEachWay: true,
    time: '04:57',
    selections: [
        {
            selectionId: '3318340429',
            selectionName: 'Monash',
            eventName: '1:00 Newcastle',
            eventTime: '13:00',
            eventDate: '2021-09-03',
            oddsDecimal: 2.75,
            isEachWay: false,
            oddsFractionalNumerator: 11,
            oddsFractionalDenominator: 4,
            eachWayTermsPlaces: null,
            eachWayTermsNumerator: null,
            eachWayTermsDenominator: null,
            result: null,
        },
        {
            selectionId: '3318340379',
            selectionName: 'Liberty Warrior',
            eventName: '1:35 Newcastle',
            eventTime: '13:35',
            eventDate: '2021-09-03',
            oddsDecimal: 3.3333333333333335,
            isEachWay: false,
            oddsFractionalNumerator: 10,
            oddsFractionalDenominator: 3,
            eachWayTermsPlaces: null,
            eachWayTermsNumerator: null,
            eachWayTermsDenominator: null,
            result: null,
        },
    ],
}

describe('My Bets History items', () => {
    it('Shows single ew type', () => {
        render(
            <MyBetsHistory
                key = {singleBetItem.betId}
                betId = {singleBetItem.betId}
                bookmakerName = {singleBetItem.bookmakerName}
                totalStake = {singleBetItem.totalStake}
                betType = {singleBetItem.betType}
                currencySign = {singleBetItem.currencySign}
                numberOfLines = {singleBetItem.numberOfLines}
                stakePerLine = {singleBetItem.stakePerLine}
                date = {singleBetItem.date}
                estimatedReturns = {singleBetItem.estimatedReturns}
                isEachWay = {singleBetItem.isEachWay}
                time = {singleBetItem.time}
                selections = {singleBetItem.selections}
                isTablet
            />,
        );

        screen.getByText('single EW');
    });

    it('Shows double ew type', () => {
        render(
            <MyBetsHistory
                key = {doubleBetItem.betId}
                betId = {doubleBetItem.betId}
                bookmakerName = {doubleBetItem.bookmakerName}
                totalStake = {doubleBetItem.totalStake}
                betType = {doubleBetItem.betType}
                currencySign = {doubleBetItem.currencySign}
                numberOfLines = {doubleBetItem.numberOfLines}
                stakePerLine = {doubleBetItem.stakePerLine}
                date = {doubleBetItem.date}
                estimatedReturns = {doubleBetItem.estimatedReturns}
                isEachWay = {doubleBetItem.isEachWay}
                time = {doubleBetItem.time}
                selections = {doubleBetItem.selections}
                isTablet
            />,
        );

        screen.getByText('double EW');
        screen.getByText('view selections');
    });

    it('loads correct unsettled bet history data ', () => {
        render(
            <MyBetsHistory
                key = {singleBetItem.betId}
                betId = {singleBetItem.betId}
                bookmakerName = {singleBetItem.bookmakerName}
                totalStake = {singleBetItem.totalStake}
                betType = {singleBetItem.betType}
                currencySign = {singleBetItem.currencySign}
                numberOfLines = {singleBetItem.numberOfLines}
                stakePerLine = {singleBetItem.stakePerLine}
                date = {singleBetItem.date}
                estimatedReturns = {singleBetItem.estimatedReturns}
                isEachWay = {singleBetItem.isEachWay}
                time = {singleBetItem.time}
                selections = {singleBetItem.selections}
                isTablet
            />,
        );
        screen.getByText('O/11822704/0032194/F');
        screen.getByText('Placed at 04:57 on 03 Sep 2021');
        screen.getByText('Monash');
        screen.getByText('0.49');
        screen.getByText('open')
        screen.getByText('stake')
        screen.getByText('estimated return')
    });

    it('loads correct settled won bet history data ', () => {
        render(
            <MyBetsHistory
                key = {singleBetItem.betId}
                betId = {singleBetItem.betId}
                bookmakerName = {singleBetItem.bookmakerName}
                totalStake = {singleBetItem.totalStake}
                betType = {singleBetItem.betType}
                currencySign = {singleBetItem.currencySign}
                numberOfLines = {singleBetItem.numberOfLines}
                stakePerLine = {singleBetItem.stakePerLine}
                date = {singleBetItem.date}
                estimatedReturns = {singleBetItem.estimatedReturns}
                isEachWay = {singleBetItem.isEachWay}
                time = {singleBetItem.time}
                selections = {singleBetItem.selections}
                isSettled
                isWinning
                returns = "10.50"
            />,
        );
        screen.getByText('O/11822704/0032194/F');
        screen.getByText('Placed at 04:57 on 03 Sep 2021');
        screen.getByText('Monash');
        screen.getByText('+10.50');
        screen.getAllByText('won')
        screen.getByText('stake')
    });

    it('loads correct settled lost bet history data ', () => {
        render(
            <MyBetsHistory
                key = {singleBetItem.betId}
                betId = {singleBetItem.betId}
                bookmakerName = {singleBetItem.bookmakerName}
                totalStake = {singleBetItem.totalStake}
                betType = {singleBetItem.betType}
                currencySign = {singleBetItem.currencySign}
                numberOfLines = {singleBetItem.numberOfLines}
                stakePerLine = {singleBetItem.stakePerLine}
                date = {singleBetItem.date}
                estimatedReturns = {singleBetItem.estimatedReturns}
                isEachWay = {singleBetItem.isEachWay}
                time = {singleBetItem.time}
                selections = {singleBetItem.selections}
                isSettled
                isWinning = {false}
            />,
        );
        screen.getByText('O/11822704/0032194/F');
        screen.getByText('Placed at 04:57 on 03 Sep 2021');
        screen.getByText('Monash');
        screen.getByText('-0.03');
        screen.getByText('0.03');
        screen.getAllByText('lost')
        screen.getByText('stake')
    });
})
