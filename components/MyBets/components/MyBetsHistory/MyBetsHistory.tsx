/* eslint-disable max-len */
import { useMemo, useCallback, useState } from 'react';
import moment from 'moment';
import classnames from 'classnames';
import { MyBetsHistoryItemInterface } from '../../../interfaces';
import { MultipleItemSelection } from '../../../Betslip/components/OptionsList/components/MultipleItem/components/MultipleItemSelection';
import { Eye2Icon } from '../../../base/Icons/Eye2Icon';
import Button from '../../../base/inputs/Button/index';
import BookmakerThumb from '../../../Betslip/components/BookmakerThumb';
import { Constants } from '../../../../project/constants';

import styles from './MyBetsHistory.module.scss';

const { BET_TYPE_TRICASTS_FORECASTS, DATE_FORMATS: { DD_MMM_YYYY } } = Constants;

export const MyBetsHistory = ({
    betId,
    bookmakerName,
    totalStake,
    betType,
    currencySign,
    numberOfLines,
    stakePerLine,
    date,
    estimatedReturns,
    isEachWay,
    time,
    isSettled,
    isWinning,
    returns,
    selections,
    isTablet,
    freeBetStake,
}: MyBetsHistoryItemInterface): JSX.Element => {
    const [isSelectionVisible, setIsSelectionVisible] = useState(false);

    const handleToggleViewSelection = useCallback(() => {
        setIsSelectionVisible((prevIsVisible) => !prevIsVisible);
    }, []);

    const {
        selectionName,
        oddsFractionalNumerator,
        oddsFractionalDenominator,
        eventName,
        eventDate,
    } = selections[0];

    const betStatus = isSettled ? isWinning ? 'won' : 'lost' : 'open';
    const returnsStatus = isSettled ? isWinning ? 'won' : 'lost' : 'estimated return';
    const stakeFigure = isSettled ? isWinning ? '+' : '-' : '';
    const totalStakeValue = isSettled ? isWinning ? returns : totalStake : totalStake;
    const isRaceDataShown = BET_TYPE_TRICASTS_FORECASTS.includes(betType);
    const oddsDisplay = oddsFractionalNumerator === 'SP' ||
        oddsFractionalDenominator === 'SP' ?
        'SP' : `${oddsFractionalNumerator}/${oddsFractionalDenominator}`;
    const eachWayStatus = `${betType} ${isEachWay ? 'EW' : ''}`;

    const runnerInfo = useMemo(() => {
        return (selections.length > 1) ? (
            <div
                className = {styles['mbh-row__course-data']}
            >
                {isRaceDataShown && (
                    <div
                        className = {styles['mbh-row__course-data-container']}
                        data-testid = "Container__courseDataRow"
                    >

                        <div
                            className = {styles['mbh-row__course-data-event']}
                            data-testid = "Container__courseDataEvent"
                        >
                            <div
                                className = {styles['mbh-row__course-data-event']}
                                data-testid = "Container__EventName"
                            >
                                <div
                                    className = {styles['mbh-row__course-data-event-name']}
                                    data-testid = "Text__EventName"
                                >
                                    {eventName}
                                </div>
                            </div>
                            <div data-testid = "Text__EventDate">
                                {`- ${moment(eventDate).format(DD_MMM_YYYY)}`}
                            </div>
                        </div>

                    </div>
                ) }
                <div
                    className = {styles['mbh-row__course-data-container']}
                    data-testid = "Container__courseDataRow"
                >
                    <span
                        className = {styles['mbh-row__course-data-event']}
                        data-testid = "Text__courseDataEvent"
                    >
                        {`${numberOfLines} x ${currencySign}${stakePerLine}`}
                    </span>
                </div>
                <div
                    className = {classnames(
                        styles['mbh-row__course-data-container'],
                        styles['mbh-row__course-data-container--selection'],
                    )}
                    data-testid = "Container__courseData"
                >
                    <Button
                        className = {classnames(
                            styles['mbh-row__additional-actions-button'],
                            {
                                [styles['mbh-row__additional-actions-button--active']]: isSelectionVisible,
                            },
                        )}
                        onClick = {handleToggleViewSelection}
                        data-testid = "Button__MyBetsHistoryAdditionalActions"
                    >
                        <Eye2Icon
                            dataTestId = "Icon__MyBetsHistoryAdditionalActions"
                        />
                        {`${isSelectionVisible ? 'close' : 'view'} selections`}
                    </Button>
                </div>
            </div>
        ) : (
            <div
                className = {styles['mbh-row__course-data']}
                data-testid = "Container__courseDataRow"
            >
                <div
                    className = {styles['mbh-row__course-data-container']}
                    data-testid = "Container__courseData"
                >
                    <div
                        className = {styles['mbh-row__course-data-event']}
                        data-testid = "Container__courseDataEvent"
                    >
                        <div className = {styles['mbh-row__course-data-event']}>
                            <div
                                className = {styles['mbh-row__course-data-event-name']}
                                data-testid = "Text__eventName"
                            >
                                {eventName}
                            </div>
                        </div>
                        <div data-testid = "Text__eventDate">
                            {`- ${moment(eventDate).format(DD_MMM_YYYY)}`}
                        </div>
                    </div>
                </div>
                <div
                    className = {classnames(styles['mbh-row__course-data-container'])}
                    data-testid = "Container__courseData"
                >
                    <span
                        className = {styles['mbh-row__course-data-event']}
                        data-testid = "Text__courseDataEvent"
                    >
                        {`${numberOfLines} x ${currencySign}${stakePerLine}`}
                    </span>
                </div>
                <div
                    className = {classnames(
                        styles['mbh-row__course-data-container'],
                        styles['mbh-row__course-data-container--selection'],
                    )}
                    data-testid = "Container__courseDataSelections"
                >
                    <span
                        className = {styles['mbh-row__course-data-horse-name']}
                        data-testid = "Text__selectionName"
                    >
                        {selectionName}
                    </span>
                    <span
                        className = {styles['mbh-row__course-data-odds']}
                        data-testid = "Text__oddsDisplay"
                    >
                        {oddsDisplay}
                    </span>
                </div>
            </div>
        )
    }, [currencySign, eventDate, eventName, handleToggleViewSelection, isRaceDataShown, isSelectionVisible,
        numberOfLines, oddsDisplay, selectionName, selections.length, stakePerLine])

    return (
        <div
            className = {styles.mbh}
            key = {betId}
            data-testid = "Container__MyBetsHistory"
        >
            <div
                className = {styles.mbh__thumb}
                data-testid = "Container__MyBetsHistoryThumb"
            >
                <BookmakerThumb
                    bookmakerName = {bookmakerName}
                    size = "x-large"
                    data-testid = "Icon__MyBetsHistoryThumb"
                />
            </div>
            <div
                className = {styles.mbh__content}
                data-testid = "Container__MyBetsHistoryContent"
            >
                <div
                    className = {styles['mbh-row']}
                    data-testid = "Container__MyBetsHistoryRow"
                >
                    <div>
                        <div
                            className = {styles['mbh-row__bet-type']}
                            data-testid = "Container__MyBetsHistoryBetType"
                        >
                            <span
                                className = {styles[`mbh-row__bet-type-${betStatus}`]}
                                data-testid = "Text__MyBetsHistoryBetStatus"
                            >
                                {betStatus}
                            </span>
                            <span
                                className = {
                                    styles['mbh-row__bet-type-text']
                                }
                                data-testid = "Text__MyBetsHistoryBetType"
                            >
                                {eachWayStatus}
                            </span>
                        </div>
                    </div>
                    {!isTablet && runnerInfo}
                    <div className = {styles['mbh-row__bet-amounts']}>
                        <div
                            data-testid = "Container__MyBetsHistoryRowStake"
                        >
                            <span
                                data-testid = "Text__MyBetsHistoryStakeText"
                            >
                                stake
                            </span>
                            <span
                                data-testid = "Text__MyBetsHistoryStakeCurrency"
                            >
                                {currencySign}
                            </span>
                            <span
                                data-testid = "Text__MyBetsHistoryStakeValue"
                            >
                                {totalStake}
                            </span>
                        </div>

                        {freeBetStake && (
                            <div
                                className = {styles['mbh-row__bet-amounts-freebet']}
                                data-testid = "Container__MyBetsHistoryFreeBet"
                            >
                                <span data-testid = "Text__MyBetsHistoryFreeBetText">
                                    + free bet
                                </span>
                                <span data-testid = "Text__MyBetsHistoryFreeBetCurrency">
                                    {currencySign}
                                </span>
                                <span data-testid = "Text__MyBetsHistoryFreeBetValue">
                                    {freeBetStake}
                                </span>
                            </div>
                        )}
                        <div>
                            <span data-testid = "Text__MyBetsHistoryReturnsStatus">
                                {returnsStatus}
                            </span>
                            <span data-testid = "Text__MyBetsHistoryStakeCurrency">
                                {currencySign}
                            </span>
                            <span
                                className = {styles['mbh-row__bet-amounts-estimated-returns']}
                                data-testid = "Text__MyBetsHistoryEstimatedReturns"
                            >
                                {isSettled ? `${stakeFigure}${totalStakeValue}` : estimatedReturns || 'n/a'}
                            </span>
                        </div>
                    </div>
                    <div
                        className = {styles['mbh-row__bet-receipt']}
                        data-testid = "Container__MyBetsHistoryBetReceipt"
                    >
                        <span
                            data-testid = "Text__MyBetsHistoryEstimatedReturnsTime"
                        >
                            {`Placed at ${time} on 
                                ${moment(date).format(DD_MMM_YYYY)}`}
                        </span>
                        <div>
                            <span
                                className = {
                                    styles['mbh-row__bet-receipt-text']
                                }
                                data-testid = "Text__MyBetsHistoryBetReceiptText"

                            >
                                Receipt number
                            </span>
                            <span
                                className = {
                                    styles['mbh-row__bet-receipt-bet-id']
                                }
                                data-testid = "Text__MyBetsHistoryBetReceiptId"
                            >
                                {betId}
                            </span>
                        </div>
                    </div>
                </div>
                {isTablet && runnerInfo}
                {isSelectionVisible && selections.length > 1 && (
                    <div
                        className = {
                            classnames(
                                styles['mbh-row'],
                                styles['mbh-row__second-row'],
                                {
                                    [styles['mbh-row__second-row--margin']]: !isRaceDataShown,
                                },
                            )
                        }
                    >
                        {!isTablet && <div />}
                        <div className = {styles['mbh-row__multiple-item-selection']}>
                            <MultipleItemSelection
                                betTypeName = {betType}
                                numberLines = {numberOfLines}
                                multipleBetItemSelections = {
                                    selections?.map(
                                        (selectionItem) => ({
                                            horseName: selectionItem.selectionName,
                                            priceNumerator: selectionItem.oddsFractionalNumerator,
                                            priceDenominator: selectionItem.oddsFractionalDenominator,
                                            id: selectionItem.selectionId,
                                            result: selectionItem.result,
                                            eventName: !isRaceDataShown && selectionItem.eventName,
                                            runnerNumber: '',
                                            optionId: '',
                                        }),
                                    )
                                }
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
