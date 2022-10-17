import { ReactElement } from 'react';
import moment from 'moment';
import BookmakerThumb from '../../../Betslip/components/BookmakerThumb';
import { MyBetsHistoryItemInterface } from '../../../interfaces';
import { Eye1Icon } from '../../../base/Icons/Eye1Icon';
import { Constants } from '../../../../project/constants';

import styles from '../MyBetsHistory/MyBetsHistory.module.scss';

const { BET_TYPE_NAMES, DATE_FORMATS: { DD_MMM_YYYY } } = Constants;

export const MyBetsHistoryItemTablet = ({
    betId,
    bookmakerName,
    selections,
    totalStake,
    betType,
    currencySign,
    isEachWay,
    freeBetStake,
}: MyBetsHistoryItemInterface) : ReactElement => {
    const {
        selectionName,
        oddsFractionalNumerator,
        oddsFractionalDenominator,
        eventName,
        eventTime,
        eventDate,
    } = selections[0];

    const formattedEventName = `${eventTime} ${eventName.split(' ')[1]}`;
    const oddsDisplay = oddsFractionalNumerator === 'SP' || oddsFractionalDenominator === 'SP' ?
        'SP' : `${oddsFractionalNumerator}/${oddsFractionalDenominator}`;
    const isMultipleBets = betType !== 'Single' && BET_TYPE_NAMES[betType];

    return (
        <li
            className = {styles['my-bets-history__item']}
            data-testid = {`Container__${betId}__BetHistoryItem`}
        >
            <div className = {styles['my-bets-history__bookmaker-logo']}>
                <BookmakerThumb
                    bookmakerName = {bookmakerName}
                />
            </div>
            <div
                className = {styles['my-bets-history__item-race-details']}
                data-testid = "Container__BetHistoryRaceDetails"
            >
                <span
                    className = {styles['my-bets-history__item-selection-name']}
                    data-testid = "Text__BetHistorySelectionName"
                >
                    {isMultipleBets ? (
                        <button
                            type = "button"
                            data-testid = "Button__BetHistoryItemViewSelection"
                        >
                            <Eye1Icon />
                            VIEW SELECTIONS
                        </button>
                    ) : (
                        <>
                            {selectionName}{' '}
                            <span
                                className = {styles['my-bets-history__item-odds']}
                                data-testid = "Text__BetHistoryOdds"
                            >
                                {oddsDisplay}
                            </span>
                        </>
                    )}
                </span>
                <p data-testid = "Text__BetHistoryEventName">
                    {`${formattedEventName}, ${moment(eventDate).format(DD_MMM_YYYY)}`}
                </p>
            </div>
            <div
                className = {styles['my-bets-history__item-type-stake']}
                data-testid = "Container__BetHistoryItemDetailsRight"
            >
                <span
                    className = {styles['my-bets-history__item-type']}
                    data-testid = "Text__BetHistoryItemType"
                >
                    {`${betType} ${isEachWay ? 'EW' : ''}`}
                </span>
                <div
                    data-testid = "Container__MyBetsHistoryItemBetAmounts"
                    className = {styles['my-bets-history__item-bet-amounts']}
                >
                    <div data-testid = "Container__MyBetsHistoryItemStake">
                        <span data-testid = "Text__MyBetsHistoryItemStakeLabel">stake</span>
                        <span data-testid = "Text__MyBetsHistoryItemStakeCurrency">
                            {currencySign}
                        </span>
                        <span data-testid = "Text__MyBetsHistoryItemStakeValue">{totalStake}</span>
                    </div>

                    <div
                        data-testid = "Container__MyBetsHistoryItemFreebet"
                        className = {styles['my-bets-history__item-bet-amounts-freebet']}
                    >
                        <span data-testid = "Text__MyBetsHistoryItemFreebetLabel">+ free bet</span>
                        <span data-testid = "Text__MyBetsHistoryItemFreebet">{currencySign}</span>
                        <span data-testid = "Text__MyBetsHistoryItemFreebetValue">
                            {freeBetStake}
                        </span>
                    </div>

                </div>
            </div>
        </li>
    )
}
