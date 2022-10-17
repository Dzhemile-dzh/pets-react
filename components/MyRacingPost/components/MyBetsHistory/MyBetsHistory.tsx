/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FC } from 'react';
import MyBetsHistoryItem from '../MyBetsHistoryItem';
import { BetHistoryItemInterface } from '../../../interfaces/BetHistory';

import styles from './MyBetsHistory.module.scss';

interface MyBetsHistoryInterface {
    betHistory: Array<BetHistoryItemInterface>
}

export const MyBetsHistory : FC<MyBetsHistoryInterface> = ({
    betHistory,
}) => {
    return (
        <ul
            className = {styles['my-bets-history']}
            data-testid = "List__MyBetsHistory"
        >
            {betHistory.map((item) => (
                <MyBetsHistoryItem
                    key = {item.betId}
                    betId = {item.betId}
                    bookmakerName = {item.bookmakerName}
                    selections = {item.selections}
                    totalStake = {item.totalStake}
                    betType = {item.type}
                    currencySign = {item.currencySign}
                    numberOfLines = {item.numberOfLines}
                    stakePerLine = {item.stakePerLine}
                    date = {item.date}
                    estimatedReturns = {item.estimatedReturns}
                    isEachWay = {item.isEachWay}
                    time = {item.time}
                    isMultipleBetFromDiffRaces = {item.isMultipleBetFromDiffRaces}
                    showReceipt = {false}
                    freeBetStake = {item.freeBetStake}
                />
            ))}
        </ul>
    )
};
