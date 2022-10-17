import { useState, useCallback } from 'react';
import moment from 'moment';
import classnames from 'classnames'
import { MultiBetHistoryItemInterface } from '../../../../interfaces';
import { Constants } from '../../../../../project/constants';
import Button from '../../../../base/inputs/Button/index';
// eslint-disable-next-line max-len
import { MultipleItemSelection } from '../../../../Betslip/components/OptionsList/components/MultipleItem/components/MultipleItemSelection';
import { Eye1Icon } from '../../../../base/Icons/Eye1Icon';

import styles from '../../MyBetsHistory/MyBetsHistory.module.scss';

const { DATE_FORMATS: { DD_MMM_YYYY } } = Constants;

export const MultiBetItemDetails = ({
    betType,
    numberOfLines,
    stakePerLine,
    selections,
    currencySign,
    showReceipt,
    isMultipleBetFromDiffRaces,
    isRaceDataShown,
}: MultiBetHistoryItemInterface): JSX.Element => {
    const [isSelectionVisible, setIsSelectionVisible] = useState(null);

    const handleToggleViewSelection = useCallback(() => {
        setIsSelectionVisible((prevIsVisible) => !prevIsVisible);
    }, []);

    // eslint-disable-next-line no-unsafe-optional-chaining
    const { eventName, eventDate } = selections?.[0];

    return (
        <div
            className = {styles['my-bets-history__race-details']}
            data-testid = "Container__BetHistoryItemRaceDetails"
        >
            <h3 data-testid = "Text__BetHistoryItemBetType">
                {betType}
            </h3>
            <p data-testid = "Text__BetHistoryItemNumberOfLinesAndStake">
                {numberOfLines} x {currencySign}{stakePerLine}{' '}
                <span>{betType}</span>
            </p>
            {(!isMultipleBetFromDiffRaces && isRaceDataShown) && (
                <p data-testid = "Text__BetHistoryItemEventNameAndDate">
                    {eventName} | {moment(eventDate).format(DD_MMM_YYYY)}
                </p>
            )}
            {!showReceipt && (
                <Button
                    className = {classnames(
                        styles['my-bets-history__receipt-additional-actions-button'],
                        {
                            [styles['my-bets-history__receipt-additional-actions-button--active']]:
                                isSelectionVisible,
                        },
                    )}
                    onClick = {handleToggleViewSelection}
                    data-testid = "Button__BetHistoryItemViewSelection"
                >

                    <Eye1Icon />
                    {`${isSelectionVisible ? 'close' : 'view'} selections`}
                </Button>
            )}
            {isSelectionVisible && selections.length > 1 && (
                <div
                    className = {
                        styles['my-bets-history__race-details-selections']
                    }
                >
                    <MultipleItemSelection
                        betTypeName = {betType}
                        numberLines = {numberOfLines}
                        multipleBetItemSelections = {
                            selections?.map(
                                (selectionItem) => {
                                    return {
                                        horseName: selectionItem.selectionName,
                                        priceNumerator: selectionItem.oddsFractionalNumerator,
                                        priceDenominator: selectionItem.oddsFractionalDenominator,
                                        id: selectionItem.selectionId,
                                        result: selectionItem.result,
                                        eventName: !isRaceDataShown && selectionItem.eventName,
                                        optionId: '',
                                        runnerNumber: '',
                                    }
                                },
                            )
                        }
                    />
                </div>
            )}
        </div>
    )
}
