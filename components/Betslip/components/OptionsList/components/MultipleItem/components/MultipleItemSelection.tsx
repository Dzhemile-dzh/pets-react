/* eslint-disable max-len */
import { FC } from 'react';
import classnames from 'classnames';
import { useDispatch } from 'react-redux';

import { Actions } from '@project/common';
import { convertToPascalCase } from '@project/utils/formatUtils';
import { subscript } from '@project/utils/subscriptUtils';
import { Constants } from '@project/constants';

import StyledCheckbox from '@components/base/inputs/StyledCheckbox';
import { MultipleItemSelectionInterface } from './MultipleItemSelection.types';

import styles from './MultipleItemSelection.module.scss';

const {
    BET_TYPE_STRAIGHT_TRICASTS_FORECASTS,
    RESULT_STATUSES: {
        LOST,
        OPEN,
        PLACED,
        VOID,
        WON,
    },
    PRICE_TYPES: {
        SP,
    },
} = Constants;

const isStartingPrice = ({ priceNumerator, priceDenominator }) => (
    (priceNumerator === SP && priceDenominator === SP) ||
    (!priceNumerator && !priceDenominator)
);

export const MultipleItemSelection : FC<MultipleItemSelectionInterface> = ({
    multipleBetItemSelections,
    isSelectionEditable = false,
    betTypeName,
    numberLines,
    includedInMultipleSelections = false,
    className,
}) => {
    const dispatch = useDispatch();

    const isAnySelectionExcludedFromMultiples = Object.values(includedInMultipleSelections)
        .some((includedSelection) => includedSelection === false)

    return (
        <div
            className = {classnames(styles['multiple-item-selection'], className)}
            data-testid = "Container__MultiItemSelection"
        >
            {(isSelectionEditable || isAnySelectionExcludedFromMultiples) && (
                <div
                    className = {styles['multiple-item-selection__edit-info']}
                    data-testid = "Container__MultiItemSelectionInfo"
                >
                    <span
                        data-testid = "Text__MultiItemSelectionInfo"
                        className = {styles['multiple-item-selection__edit-info-number-lines']}
                    >
                        {numberLines} {betTypeName}{numberLines > 1 && 's'}
                    </span>
                    <span
                        className = {styles['multiple-item-selection__edit-info-label']}
                    >
                        with these selections
                    </span>
                </div>
            )}
            <ul
                className = {styles['multiple-item-selection__list']}
                data-testid = "Container__MultiItemSelectionList"
            >
                {multipleBetItemSelections.map((item, index) => (
                    <li
                        key = {item.horseName}
                        data-testid =
                            {`Container__MultiItemSelection${convertToPascalCase(item.horseName)}`}
                        className = {
                            classnames({
                                [styles['multiple-item-selection__list-event-name--displayed']]:
                                    item.eventName,
                            })
                        }
                    >
                        {(isSelectionEditable || isAnySelectionExcludedFromMultiples) && (
                            <StyledCheckbox
                                handleChange = {() => dispatch(Actions.toggleMultipleBetSelection(
                                    !includedInMultipleSelections[item.id],
                                    item.id,
                                    item.optionId,
                                ))}
                                checked = {includedInMultipleSelections[item.id]}
                                className = {styles['multiple-item-selection__checkbox']}
                            />
                        )}
                        <div
                            className = {classnames(
                                styles['multiple-item-selection__details'],
                                {
                                    [styles['multiple-item-selection__details--disabled']]:
                                        !(!includedInMultipleSelections ||
                                            includedInMultipleSelections[item.id]),
                                },
                            )}
                            data-testid = "Container__MultiItemSelectionDetails"
                        >
                            <div
                                data-testid = "Container__MultiItemSelectionRunnerData"
                            >
                                <p
                                    className = {styles['multiple-item-selection__details-runner-data']}
                                    data-testid = "Text__MultiItemSelectionRunnerData"
                                >
                                    {BET_TYPE_STRAIGHT_TRICASTS_FORECASTS.includes(betTypeName) &&
                                        <span>{`${index + 1}${subscript(index + 1)}`}</span>}

                                    {item.runnerNumber && (
                                        <span
                                            data-testid = "Text__MultiItemSelectionRunnerNumber"
                                        >
                                            {item.runnerNumber}
                                        </span>
                                    )}
                                    {item.horseName}
                                </p>
                                {item.eventName && (
                                    <span className = {
                                        styles['multiple-item-selection__details-event-name']
                                    }
                                    >
                                        {item.eventName}
                                    </span>
                                )}
                            </div>

                            <div className = {styles['multiple-item-selection__details-stake-data']}>
                                <p data-testid = "Text__MultiItemSelectionDetailsOdds">
                                    {isStartingPrice(item) ? (
                                        SP
                                    ) : (
                                        `${item.priceNumerator}/${item.priceDenominator}`
                                    )}
                                </p>
                                {item.result && (
                                    <span
                                        data-testid = "Text__MultiItemSelectionDetailsResultStatus"
                                        className = {classnames(
                                            {
                                                [styles['multiple-item-selection__details-stake-data--won']]: item.result === WON,
                                                [styles['multiple-item-selection__details-stake-data--non-runner']]: item.result === VOID,
                                                [styles['multiple-item-selection__details-stake-data--lost']]: item.result === LOST,
                                                [styles['multiple-item-selection__details-stake-data--placed']]: item.result === PLACED,
                                                [styles['multiple-item-selection__details-stake-data--open']]: item.result === OPEN,
                                            },
                                        )}
                                    >
                                        {item.result === VOID ? 'NR' : item.result}
                                    </span>
                                )}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
