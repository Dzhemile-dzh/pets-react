import { ReactElement } from 'react';
import BookmakerThumb from '../../../Betslip/components/BookmakerThumb';
import { SingleBetItemDetails } from './components/SingleBetItemDetails';
import { MultiBetItemDetails } from './components/MultiBetItemDetails';
import { MyBetsHistoryReceipt } from './components/MyBetsHistoryReceipt';
import { MyBetsHistoryItemInterface } from '../../../interfaces';
import { Constants } from '../../../../project/constants';

import styles from '../MyBetsHistory/MyBetsHistory.module.scss';

const { BET_TYPE_TRICASTS_FORECASTS } = Constants;

export const MyBetsHistoryItemMobile = ({
    betId,
    bookmakerName,
    selections,
    totalStake,
    betType,
    currencySign,
    numberOfLines,
    stakePerLine,
    date,
    estimatedReturns,
    isEachWay,
    time,
    showReceipt = false,
    isMultipleBetFromDiffRaces,
    isSettled,
    isWinning,
    returns,
    freeBetStake,
}: MyBetsHistoryItemInterface) : ReactElement => {
    const betStatus = isSettled ? isWinning ? 'won' : 'lost' : 'open';
    const stakeFigure = isSettled ? isWinning ? '+' : '-' : '';
    const totalStakeValue = isSettled ?
        isWinning ? returns : totalStake : totalStake;
    const isRaceDataShown = BET_TYPE_TRICASTS_FORECASTS.includes(betType);

    return (
        <li
            className = {styles['my-bets-history__item']}
            data-testid = {`Container__${betId}__BetHistoryItem`}
        >
            <div
                className = {styles['my-bets-history__item-wrapper']}
                data-testid = "Container__BetHistoryItemDetails"
            >
                <div className = {styles['my-bets-history__item-details-left']}>
                    <BookmakerThumb
                        bookmakerName = {`${bookmakerName}square`}
                        className = {styles['my-bets-history__logo-square']}
                        size = "auto"
                    />
                    {betType === 'Single' ? (
                        <SingleBetItemDetails
                            betType = {betType}
                            {...selections[0]}
                        />
                    ) : (
                        <MultiBetItemDetails
                            betType = {betType}
                            numberOfLines = {numberOfLines}
                            stakePerLine = {stakePerLine}
                            selections = {selections}
                            currencySign = {currencySign}
                            showReceipt = {showReceipt}
                            isMultipleBetFromDiffRaces = {isMultipleBetFromDiffRaces}
                            isRaceDataShown = {isRaceDataShown}
                        />
                    )}
                </div>
                <div
                    className = {styles['my-bets-history__item-details-right']}
                    data-testid = "Container__BetHistoryResultAndStake"
                >
                    <span
                        className = {styles[`my-bets-history__item-result--${betStatus}`]}
                        data-testid = "Text__BetHistoryItemResult"
                    >
                        {betStatus}
                    </span>
                    <span
                        className = {styles['my-bets-history__item-stake']}
                        data-testid = "Text__BetHistoryItemStake"
                    >
                        {`${stakeFigure}${currencySign}${totalStakeValue}`}
                    </span>
                    {freeBetStake && (
                        <span
                            className = {styles['my-bets-history__item-freebet']}
                            data-testid = "Text__BetHistoryItemFreeBetStake"
                        >
                            + {currencySign}{freeBetStake} FREE BET
                        </span>
                    )}
                </div>
            </div>
            {showReceipt && (
                <MyBetsHistoryReceipt
                    betId = {betId}
                    date = {date}
                    betType = {betType}
                    estimatedReturns = {isSettled ? totalStake : estimatedReturns}
                    isEachWay = {isEachWay}
                    time = {time}
                    currencySign = {currencySign}
                    numberOfLines = {numberOfLines}
                    stakePerLine = {stakePerLine}
                    selections = {selections}
                    isSettled = {isSettled}
                />
            )}
        </li>
    );
}
