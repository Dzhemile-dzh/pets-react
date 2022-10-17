import {
    FC, useState, useRef, useCallback,
} from 'react';
import classnames from 'classnames';
import Image from 'next/image';
import { useDispatch } from 'react-redux';

import { Actions } from '@project/common';

import Button from '../../../../../base/inputs/Button/index';
import { convertToPascalCase } from '../../../../../../project/utils/formatUtils';
import StakeInput from '../../../StakeInput';
import MultipleItemSelection from './components';
import ItemError from '../../../ItemError';
import FreeBetsAndEstimatedReturn from '../../../FreeBetsAndEstimatedReturn';
import useOutsideClick from '../../../../../custom-hooks/useOutsideClick';

import { MultipleItemInterface } from './MultipleItem.types';

import styles from './MultipleItem.module.scss';

export const MultipleItem: FC<MultipleItemInterface> = ({
    betTypeName,
    betTypeDesc,
    userBalance: {
        balance,
        currencySign: balanceCurrencySign,
    },
    optionId,
    isSelectionEditable,
    useBestOddsGuaranteed,
    isStartingPrice,
    multipleBetItemSelections,
    includedInMultipleSelections,
    freeBetId,
    selectOption,
    selectedOption,
    areFreeBetsAvailable,
    areAllFreeBetsSelected,
    openModalForSpecificOption,
    error,
    betOptionUi,
    numberLines,
}) => {
    const dispatch = useDispatch();
    const currentElement = useRef(null);

    const isDisabled = Boolean(error && error.message);
    const numberOfLines = betOptionUi.isEWSelected ? numberLines * 2 : numberLines;
    /* it will be straight line bet in just two cases
       1. numberLines === 1 and EW is not selected
       2. numberLines === 2 and EW is selected
       any other case will return false, because it is not straight line bet */
    const isStraightLineBet = (numberOfLines === 1 && !betOptionUi.isEWSelected) ||
        (numberOfLines === 2 && betOptionUi.isEWSelected);
    const [isBetTypePopoverOpen, setBetTypePopoverOpen] = useState(null);
    const [isSelectionVisible, setIsSelectionVisible] = useState(false);

    // check if there is minimum one Win Only selection in multiples
    // if yes - EW will be not displayed, if no - show the EW button
    const isWinOnly = multipleBetItemSelections.some((selection) => selection.isWinOnly)

    const isAnySelectionExcludedFromMultiples =
        Object.values(includedInMultipleSelections)
            .some((includedSelection) => includedSelection === false)

    useOutsideClick(
        currentElement,
        ['bs-multi-item__popover-svg'],
        [],
        () => setBetTypePopoverOpen(false),
        'mouseup',
    )

    const handleToggleViewSelection = useCallback(() => {
        setIsSelectionVisible((prevIsVisible) => !prevIsVisible);
    }, [])

    return (
        <li
            className = {styles['bs-multi-item']}
            data-testid = {`Container__${convertToPascalCase(betTypeName)}__MultiItem`}
        >
            <div className = {styles['bs-multi-item__primary']}>
                <div className = {styles['bs-multi-item__bet-type']}>
                    <span data-testid = "Text__MultiItemBetType">
                        {betTypeName}
                    </span>
                    <div
                        className = {
                            classnames(
                                styles['bs-multi-item__popover-wrapper'],
                                {
                                    [styles['bs-multi-item__popover-arrow']]: isBetTypePopoverOpen,
                                },
                            )
                        }
                        onClick = {() => setBetTypePopoverOpen(!isBetTypePopoverOpen)}
                        data-testid = "Popover__MultiItemBetType"
                    >
                        <span className = "bs-multi-item__popover-svg"> i </span>
                    </div>
                </div>
                <div className = {styles['bs-multi-item__bet-lines']}>
                    <span data-testid = "Text__MultiItemBetLines">
                        x{numberOfLines}
                    </span>
                </div>
                {isBetTypePopoverOpen && (
                    <span
                        className = {styles['bs-multi-item__popover']}
                        ref = {currentElement}
                        data-testid = "Text__MultiItemPopover"
                    >
                        {betTypeDesc}
                    </span>
                )}
            </div>
            {error && (
                <ItemError error = {error} />
            )}
            <div className = {styles['bs-multi-item__betting']}>
                <div
                    className = {classnames(
                        {
                            [styles['bs-multi-item__odds']]: !isWinOnly,
                            [styles['bs-multi-item__odds-single-line']]: isWinOnly,
                        },
                    )}
                    data-testid = "Container__MultiItemOdds"
                >
                    {
                        !isWinOnly && (
                            <Button
                                styleType = "tertiary"
                                className = {styles['bs-multi-item__each-way-button']}
                                isActive = {betOptionUi.isEWSelected}
                                onClick = {() => { dispatch(Actions.toggleEWSelected(optionId)) }}
                                isDisabled = {isDisabled}
                                data-testid = "Button__MultiItemOdds"
                            >
                                EW
                            </Button>
                        )
                    }
                    {useBestOddsGuaranteed && !isStartingPrice && (
                        <div
                            className = {styles['bs-multi-item__best-odds-container']}
                            data-testid = "Container__BetsOdds"
                        >
                            Best odds guaranteed
                            <div className = {styles['bs-multi-item__best-odds-icon']}>
                                <Image
                                    src = "/svgs/bestodds.svg"
                                    width = {16}
                                    height = {16}
                                    data-testid = "Icon__BetsOdds"
                                />
                            </div>
                        </div>
                    )}
                    {
                        isWinOnly && (
                            <span data-testid = "Text__MultiItemEachWayUnavailable">
                                Each-way unavailbale
                            </span>
                        )
                    }
                </div>
                <StakeInput
                    optionId = {optionId}
                    betStake = {betOptionUi.stake}
                    selectOption = {selectOption}
                    selectedOption = {selectedOption}
                    currencySign = {balanceCurrencySign}
                    userBalance = {balance}
                    error = {error}
                />
            </div>
            <div className = {styles['bs-multi-item__additional']}>
                <div className = {styles['bs-multi-item__additional-actions']}>
                    <Button
                        className = {classnames(
                            styles['bs-multi-item__additional-actions-button'],
                            {
                                [styles['bs-multi-item__additional-actions-button--active']]:
                                    isSelectionVisible,
                            },
                        )}
                        onClick = {handleToggleViewSelection}
                        data-testid = "Button__MultiItemAdditionalActions"
                    >
                        {isSelectionEditable || isAnySelectionExcludedFromMultiples ? (
                            <>
                                <Image
                                    src = "/svgs/edit_beacon_blue_dark.svg"
                                    width = {16}
                                    height = {16}
                                    data-testid = "Icon__Edit"
                                />
                                edit selections
                            </>
                        ) : (
                            <>
                                <Image
                                    src = "/svgs/eye_beacon_dark_blue.svg"
                                    width = {18}
                                    height = {12}
                                    data-testid = "Icon__View"
                                />
                                view selections
                            </>
                        )}

                    </Button>
                </div>
                <FreeBetsAndEstimatedReturn
                    currencySign = {balanceCurrencySign}
                    value = {betOptionUi.estimatedReturns.value}
                    optionId = {optionId}
                    freeBetId = {freeBetId}
                    freeBetStake = {betOptionUi.freeBetStake}
                    isStraightLineBet = {isStraightLineBet}
                    areAllFreeBetsSelected = {areAllFreeBetsSelected}
                    areFreeBetsAvailable = {areFreeBetsAvailable}
                    openModalForSpecificOption = {openModalForSpecificOption}
                    betType = "Multi"
                    isDisabled = {isDisabled}
                />
            </div>
            {isSelectionVisible && (
                <MultipleItemSelection
                    isSelectionEditable = {isSelectionEditable}
                    betTypeName = {betTypeName}
                    numberLines = {numberLines}
                    multipleBetItemSelections = {multipleBetItemSelections}
                    includedInMultipleSelections = {includedInMultipleSelections}
                    className = {classnames(
                        styles['bs-multi-item__selection-list'],
                        {
                            [styles['bs-multi-item__selection-list--with-freebet']]:
                                areFreeBetsAvailable,
                        },
                    )}
                />
            )}
        </li>
    )
}

MultipleItem.displayName = 'MultipleItem';
