import React, { memo } from 'react';
import Image from 'next/image';

import classnames from 'classnames';
import { SingleReceiptItemInterface } from '../../../../../interfaces/BetReceipt';

import styles from './SingleReceiptItem.module.scss';

export const SingleReceiptItem = ({
    betId,
    startTime,
    meetingName,
    places,
    payOut,
    startPosition,
    horseName,
    betType,
    numberLines,
    displayPrice,
    potentialReturns,
    useBestOddsGuaranteed,
    isStartingPrice,
    isEachWay,
    stake,
    date,
    currency,
    freeBetStake,
}: SingleReceiptItemInterface) : React.ReactElement => {
    return (
        <li
            className = {styles['bs-bet-receipt-single-item']}
            data-testid = "Container__BetReceiptSingle"
        >
            <div
                className = {styles['bs-bet-receipt-single-item__primary']}
                data-testid = "Container__BetReceiptSinglePrimary"
            >
                <div
                    className = {styles['bs-bet-receipt-single-item__runner']}
                    data-testid = "Container__BetReceiptSingleRunner"
                >
                    <span
                        className = {styles['bs-bet-receipt-single-item__dot']}
                        data-testid = "Text__BetReceiptSingleDot"
                    />
                    <span
                        className = {styles['bs-bet-receipt-single-item__runner-number']}
                        data-testid = "Text__BetReceiptSingleRunnerNumber"
                    >
                        {startPosition}
                    </span>
                    <span
                        className = {styles['bs-bet-receipt-single-item__runner-name']}
                        data-testid = "Text__BetReceiptSingleRunnberName"
                    >
                        {horseName}
                    </span>
                </div>
                <div
                    className = {styles['bs-bet-receipt-single-item__bet-type']}
                    data-testid = "Container__BetReceiptSingleBetType"
                >
                    <span
                        className = {styles['bs-bet-receipt-single-item__bet-type-label']}
                        data-testid = "Text__BetReceiptSingleBetTypeLabel"
                    >
                        {betType}
                    </span>
                    <span
                        className = {styles['bs-bet-receipt-single-item__bet-type-value']}
                        data-testid = "Text__BetReceiptSingleBetTypeValue"
                    >
                        {isEachWay && 'EW'}
                    </span>
                </div>
            </div>
            <div
                className = {styles['bs-bet-receipt-single-item__secondary']}
                data-testid = "Container__BetReceiptSingleSecondary"
            >
                <div
                    className = {styles['bs-bet-receipt-single-item__race-data']}
                    data-testid = "Container__BetReceiptSingleRaceData"
                >
                    <span
                        className = {styles['bs-bet-receipt-single-item__course']}
                        data-testid = "Text__BetReceiptSingleItemCourse"
                    >
                        {startTime} {meetingName}
                    </span>
                    <span
                        className = {styles['bs-bet-receipt-single-item__date']}
                        data-testid = "Text__BetReceiptSingleDate"
                    >
                        {date}
                    </span>
                </div>
                <div
                    className = {styles['bs-bet-receipt-single-item__each-way']}
                    data-testid = "Container__BetReceiptSingleEachWay"
                >
                    <span
                        className = {styles['bs-bet-receipt-single-item__each-way-places']}
                        data-testid = "Text__BetReceiptSingleEachWayPlaces"
                    >
                        {numberLines === 2 &&
                                `${places} ${payOut}`}
                    </span>
                </div>
            </div>
            <div
                className = {
                    classnames(
                        styles['bs-bet-receipt-single-item__betting'],
                        {
                            [
                            styles['bs-bet-receipt-single-item__betting--with-free-bet']
                            ]: freeBetStake > 0,
                        },
                    )
                }
                data-testid = "Container__BetReceiptSingleBetting"
            >
                <div
                    className = {styles['bs-bet-receipt-single-item__odds']}
                    data-testid = "Container__BetReceiptSingleOdds"
                >
                    <span
                        className = {styles['bs-bet-receipt-single-item__odds-label']}
                        data-testid = "Text__BetReceiptSingleOddsLabel"
                    >
                        Odds
                    </span>
                    <div
                        className = {styles['bs-bet-receipt-single-item__odds-contents']}
                        data-testid = "Container__BetReceiptSingleOddsContent"
                    >
                        <span
                            className = {styles['bs-bet-receipt-single-item__odds-value']}
                            data-testid = "Text__BetReceiptSingleOddsValue"
                        >
                            {isStartingPrice ? 'SP' : displayPrice}
                            {useBestOddsGuaranteed && !isStartingPrice && (
                                <span
                                    className = {
                                        styles['bs-bet-receipt-single-item__best-odds-icon']
                                    }
                                >
                                    <Image
                                        src = "/svgs/bestodds.svg"
                                        width = {16}
                                        height = {16}
                                        data-testid = "Text__SingleReceiptItemSelectionIcon"
                                    />
                                </span>
                            )}
                        </span>

                    </div>
                </div>
                <div
                    className = {styles['bs-bet-receipt-single-item__stake']}
                    data-testid = "Container__BetReceiptSingleStake"
                >
                    <span
                        className = {styles['bs-bet-receipt-single-item__stake-label']}
                        data-testid = "Text__BetReceiptSingleStakeLabel"
                    >
                        Stake
                    </span>
                    <div
                        className = {styles['bs-bet-receipt-single-item__stake-ammount']}
                        data-testid = "Container__BetReceiptSingleStakeAmount"
                    >
                        <span
                            className = {styles['bs-bet-receipt-single-item__stake-currency']}
                            data-testid = "Text__BetReceiptSingleStakeCurrency"
                        >
                            {currency}
                        </span>
                        <span
                            className = {styles['bs-bet-receipt-single-item__stake-value']}
                            data-testid = "Text__BetReceiptSingleStakeValue"
                        >
                            {(Number(stake) - Number(freeBetStake)).toFixed(2)}
                        </span>
                        {
                            freeBetStake > 0 &&
                            (
                                <span
                                    className = {
                                        styles['bs-bet-receipt-single-item__free-bet-stake-value']
                                    }
                                    data-testid = "Text__BetReceiptSingleFreeBetStakeValue"
                                >
                                    {`+ ${currency}${Number(freeBetStake).toFixed(2)} free bet`}
                                </span>
                            )
                        }
                    </div>
                </div>
                <div
                    className = {styles['bs-bet-receipt-single-item__returns']}
                    data-testid = "Container__BetReceiptSingleReturns"
                >
                    <span
                        className = {styles['bs-bet-receipt-single-item__returns-label']}
                        data-testid = "Text__BetReceiptSingleReturnsLabel"
                    >
                        Estimated returns
                    </span>
                    <div
                        className = {styles['bs-bet-receipt-single-item__returns-ammount']}
                        data-testid = "Container__BetReceiptSingleReturnsAmount"
                    >
                        <span
                            className = {styles['bs-bet-receipt-single-item__returns-currency']}
                            data-testid = "Text__BetReceiptSingleReturnsCurrency"
                        >
                            {!isStartingPrice && currency}
                        </span>
                        <span
                            className = {styles['bs-bet-receipt-single-item__returns-value']}
                            data-testid = "Text__BetReceiptSingleReturnsValue"
                        >
                            {isStartingPrice ? 'N/A' : potentialReturns}
                        </span>
                    </div>
                </div>
            </div>
            <div
                className = {styles['bs-bet-receipt-single-item__separator']}
                data-testid = "Container__BetReceiptSingleSeparator"
            />
            <div
                className = {styles['bs-bet-receipt-single-item__receipt-number']}
                data-testid = "Container__BetReceiptSingleReceiptNumber"
            >
                <span
                    className = {styles['bs-bet-receipt-single-item__receipt-label']}
                    data-testid = "Text__BetReceiptSingleReceiptNumberLabel"
                >
                    Receipt number
                </span>
                <span
                    className = {styles['bs-bet-receipt-single-item__receipt-value']}
                    data-testid = "Text__BetReceiptSingleReceiptNumberValue"
                >
                    {betId}
                </span>
            </div>
        </li>
    )
}

export const SingleReceiptItemMemo = memo(SingleReceiptItem);
