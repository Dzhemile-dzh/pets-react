import { FC } from 'react';
import classnames from 'classnames';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { Actions } from '../../../../../../project/common';

import { discardBetslipEvent, removeSelectionEvent } from '../../../../../../project/segmentEvents';
import { Constants } from '../../../../../../project/constants';
import { convertToPascalCase } from '../../../../../../project/utils/formatUtils';

import Button from '../../../../../base/inputs/Button';
import { RemoveIcon } from '../../../../../base/Icons/RemoveIcon';

import ItemError from '../../../ItemError';
import StakeInput from '../../../StakeInput';
import FreeBetsAndEstimatedReturn from '../../../FreeBetsAndEstimatedReturn';

import { SingleItemInterface } from './SingleItem.types';

import styles from './SingleItem.module.scss';

const {
    ERROR_CODES,
    PRICE_TYPES: {
        SP,
    },
} = Constants;

export const SingleItem: FC<SingleItemInterface> = ({
    optionId,
    runnerInfo,
    raceInfo,
    betSelectionsCount,
    bookmakerName,
    betOptionUi,
    displayPrice,
    priceType,
    selectionDetails,
    selectionError,
    error,
    betSelectionIds,
    selectOption,
    selectedOption,
    userBalance: {
        balance,
        currencySign: balanceCurrencySign,
    },
    freeBetId,
    areAllFreeBetsSelected,
    areFreeBetsAvailable,
    openModalForSpecificOption,
}) => {
    const dispatch = useDispatch();

    const removeSelection = () => {
        if (betSelectionsCount === 1) {
            discardBetslipEvent(bookmakerName);
        }

        dispatch(Actions.removeSelectionAndBuildBet(runnerInfo.id));
        removeSelectionEvent(bookmakerName, {
            horseId: runnerInfo.id,
            horseName: runnerInfo.horseName,
            localTime: raceInfo.localTime,
            meetingId: raceInfo.meetingId,
            meetingName: raceInfo.meetingName,
            oddsDecimal: betOptionUi.isSpSelected ? SP : displayPrice.decimal,
            raceId: raceInfo.id,
            raceLocalTime: raceInfo.raceLocalTime,
            useBestOddsGuaranteed: selectionDetails.useBestOddsGuaranteed,
        });
    }

    const isDisabled = selectionError && selectionError.type === ERROR_CODES.BETTING_SUSPENDED;

    return (
        <li
            className = {styles['bs-single-item']}
            data-testid =
                {`Container__${convertToPascalCase(runnerInfo.horseName)}__SingleItem`}
        >
            <div
                className = {styles['bs-single-item__primary']}
                data-testid = "Container__SingleItemPrimary"
            >
                <div
                    className = {styles['bs-single-item__runner']}
                    data-testid = "Container__SingleItemRunner"
                >
                    <span
                        className = {styles['bs-single-item__runner-number']}
                        data-testid = "Text__SingleItemRunnerNumber"
                    >
                        {runnerInfo.startPosition}
                    </span>
                    <span
                        className = {styles['bs-single-item__runner-name']}
                        data-testid = "Text__SingleItemRunnerName"
                    >
                        {runnerInfo.horseName}
                    </span>
                </div>
                <Button
                    styleType = "tertiary-icon"
                    className = {styles['bs-single-item__delete-button']}
                    onClick = {removeSelection}
                    data-testid = "Button__SingleItemDelete"
                >
                    <RemoveIcon />
                </Button>
            </div>
            <div
                className = {styles['bs-single-item__secondary']}
                data-testid = "Container__SingleItemSecondary"
            >
                <span
                    className = {styles['bs-single-item__course']}
                    data-testid = "Text__SingleItemCourse"
                >
                    {raceInfo.startTime} {raceInfo.meetingName}
                </span>
            </div>
            {(error || selectionError) && (
                <ItemError
                    error = {error || selectionError}
                    betSelectionsCount = {betSelectionsCount}
                    bookmakerName = {bookmakerName}
                />
            )}
            <div
                className = {classnames(
                    styles['bs-single-item__betting'],
                    {
                        [styles['bs-single-item__betting--disabled']]: isDisabled,
                    },
                )}
                data-testid = "Container__SingleItemBetting"
            >
                <div
                    className = {styles['bs-single-item__odds']}
                    data-testid = "Container__SingleItemOdds"
                >
                    <Button
                        className = {classnames(
                            styles['bs-single-item__price-button'],
                            styles['bs-single-item__price-button--starting-price'],
                            (betOptionUi.isSpSelected || selectionDetails.isStartingPrice) &&
                                styles['bs-single-item__price-button--selected'],
                        )}
                        onClick = {() => {
                            if (!betOptionUi.isSpSelected && !selectionDetails.isStartingPrice) {
                                dispatch(Actions.toggleSPSelected(optionId, betSelectionIds, true));
                            }
                        }}
                        isDisabled = {isDisabled}
                    >
                        SP
                    </Button>
                    {!selectionDetails.isStartingPrice && (
                        <Button
                            className = {classnames(
                                styles['bs-single-item__price-button'],
                                styles['bs-single-item__price-button--odd'],
                                !betOptionUi.isSpSelected &&
                                    styles['bs-single-item__price-button--selected'],
                            )}
                            onClick = {() => {
                                if (betOptionUi.isSpSelected) {
                                    dispatch(
                                        Actions.toggleSPSelected(optionId, betSelectionIds, false),
                                    );
                                }
                            }}
                            isDisabled = {isDisabled}
                            data-testid = "Button__SingleItemPrice"
                        >
                            {displayPrice[priceType]}
                        </Button>
                    )}
                    {(selectionDetails.useBestOddsGuaranteed && !betOptionUi.isSpSelected) && (
                        <div
                            className = {styles['bs-single-item__best-odds-icon']}
                        >
                            <Image
                                src = "/svgs/bestodds.svg"
                                width = {16}
                                height = {16}
                                data-testid = "Icon__SingleItemBestOdds"
                            />
                        </div>
                    )}
                </div>
                <StakeInput
                    optionId = {optionId}
                    betStake = {betOptionUi.stake}
                    selectOption = {selectOption}
                    selectedOption = {selectedOption}
                    currencySign = {balanceCurrencySign}
                    userBalance = {balance}
                    error = {error}
                    isDisabled = {isDisabled}
                />
            </div>
            <div
                className = {classnames(
                    styles['bs-single-item__additional'],
                    {
                        [styles['bs-single-item__additional--disabled']]: isDisabled,
                    },
                )}
                data-testid = "Container__SingleItemAdditional"
            >
                <div
                    className = {styles['bs-single-item__each-way']}
                    data-testid = "Container__SingleItemEachWay"
                >
                    {!raceInfo.eachWayData.isWinOnly ? (
                        <>
                            <Button
                                styleType = "tertiary"
                                className = {styles['bs-single-item__each-way-button']}
                                isActive = {betOptionUi.isEWSelected}
                                onClick = {() => { dispatch(Actions.toggleEWSelected(optionId)) }}
                                isDisabled = {isDisabled}
                                data-testid = "Button__SingleItemEachWay"
                            >
                                EW
                            </Button>
                            <div
                                className = {styles['bs-single-item__each-way-text']}
                                data-testid = "Container__SingleItemEachWayText"
                            >
                                <span
                                    className = {styles['bs-single-item__each-way-payout']}
                                    data-testid = "Text__SingleItemEachWaySelected"
                                >
                                    <span
                                        className = {styles['bs-single-item__multilier']}
                                        data-testid = "Text__SingleItemEachWayMultiplier"
                                    >
                                        {betOptionUi.isEWSelected ? 'x2' : 'x1'}
                                    </span>
                                </span>
                                <span
                                    className = {styles['bs-single-item__each-way-places']}
                                    data-testid = "Text__SingleItemEachWayPlaces"
                                >
                                    {raceInfo.eachWayData.places} {raceInfo.eachWayData.payOut}
                                </span>
                            </div>
                        </>
                    ) : (
                        <>
                            <span
                                className = {styles['bs-single-item__win-only-label']}
                                data-testid = "Text__SingleItemWinOnlyLabel"
                            >
                                Win only
                            </span>
                            <span
                                className = {styles['bs-single-item__win-only-sublabel']}
                                data-testid = "Text__SingleItemWinOnlySubLabel"
                            >
                                Each-way unavailable
                            </span>
                        </>
                    )}
                </div>
                <FreeBetsAndEstimatedReturn
                    currencySign = {balanceCurrencySign}
                    value = {betOptionUi.estimatedReturns.value}
                    optionId = {optionId}
                    freeBetId = {freeBetId}
                    freeBetStake = {betOptionUi.freeBetStake}
                    areAllFreeBetsSelected = {areAllFreeBetsSelected}
                    areFreeBetsAvailable = {areFreeBetsAvailable}
                    openModalForSpecificOption = {openModalForSpecificOption}
                    betType = "Single"
                    isDisabled = {isDisabled}
                />
            </div>
        </li>
    )
}
