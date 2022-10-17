import { useState, useCallback } from 'react';
import moment from 'moment';
import classnames from 'classnames'

import { Constants } from '../../../../../project/constants';
import { MyBetsHistoryReceiptInterface } from '../../../../interfaces';
import Button from '../../../../base/inputs/Button';
// eslint-disable-next-line max-len
import { MultipleItemSelection } from '../../../../Betslip/components/OptionsList/components/MultipleItem/components/MultipleItemSelection';
import { Eye2Icon } from '../../../../base/Icons/Eye2Icon';

import styles from '../../MyBetsHistory/MyBetsHistory.module.scss';

const { BET_TYPE_TRICASTS_FORECASTS, DATE_FORMATS: { DD_MMM_YYYY } } = Constants;

export const MyBetsHistoryReceipt = ({
    betId,
    date,
    betType,
    estimatedReturns,
    isEachWay,
    time,
    currencySign,
    numberOfLines,
    stakePerLine,
    selections,
    isSettled,
}: MyBetsHistoryReceiptInterface): JSX.Element => {
    const [isSelectionVisible, setIsSelectionVisible] = useState(null);

    const shouldShowNumberLines = numberOfLines > 1 &&
        BET_TYPE_TRICASTS_FORECASTS.includes(betType);

    const handleToggleViewSelection = useCallback(() => {
        setIsSelectionVisible((prevIsVisible) => !prevIsVisible);
    }, []);

    const returnsLabel = isSettled ? 'TOTAL STAKE' : 'ESTIMATED RETURN';

    return (
        <div
            className = {styles['my-bets-history__receipt']}
            data-testid = "Container__BetHistoryItemReceipt"
        >
            {betType !== 'Single' && (
                <Button
                    className = {classnames(
                        styles['my-bets-history__receipt-additional-actions-button'],
                        {
                            [styles['my-bets-history__receipt-additional-actions-button--active']]:
                                isSelectionVisible,
                        },
                    )}
                    onClick = {handleToggleViewSelection}
                    data-testid = "Button__MyBetsAdditionalActions"
                >
                    <Eye2Icon dataTestId = "Icon__MyBetsAdditionalActions" />
                    {`${isSelectionVisible ? 'close' : 'view'} selections`}
                </Button>
            )}
            {isSelectionVisible && (
                <MultipleItemSelection
                    betTypeName = {betType}
                    numberLines = {numberOfLines}
                    multipleBetItemSelections = {
                        selections?.map(
                            (selectionItem) => (
                                {
                                    horseName: selectionItem.selectionName,
                                    priceNumerator: selectionItem.oddsFractionalNumerator,
                                    priceDenominator: selectionItem.oddsFractionalDenominator,
                                    id: selectionItem.selectionId,
                                    result: selectionItem.result,
                                    eventName: !shouldShowNumberLines && selectionItem.eventName,
                                    runnerNumber: '',
                                    optionId: '',
                                }
                            ),
                        )
                    }
                />
            )}
            <div
                className = {styles['my-bets-history__receipt-wrapper']}
                data-testid = "Container__ReceiptItemWrapper"
            >
                <div
                    className = {styles['my-bets-history__receipt-left']}
                    data-testid = "Container__ReceiptLeftWrapper"
                >
                    <span data-testid = "Text__LeftReceiptNumber">RECEIPT NUMBER</span>
                    <span data-testid = "Text__LeftPlacedAt">PLACED AT</span>
                    <span data-testid = "Text__LeftEventType">BET TYPE</span>
                    <span data-testid = "Text__LeftEstimatedReturnOrTotalStake">
                        {returnsLabel}
                    </span>
                </div>
                <div
                    className = {styles['my-bets-history__receipt-right']}
                    data-testid = "Container__ReceiptRightWrapper"
                >
                    <span data-testid = "Text__RightReceiptNumber">{betId}</span>
                    <span data-testid = "Text__RightPlacedAt">
                        {time}, {moment(date).format(DD_MMM_YYYY)}
                    </span>
                    <span data-testid = "Text__RightEventType">{
                        shouldShowNumberLines &&
                    `${numberOfLines} x ${currencySign}${stakePerLine}`
                    }{' '}
                    {betType} {isEachWay && 'EW'}
                    </span>
                    <span data-testid = "Text__RightEstimatedReturn">
                        {estimatedReturns ? `${currencySign}${estimatedReturns}` : 'n/a'}
                    </span>
                </div>
            </div>
        </div>
    )
}
