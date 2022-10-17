import { FC } from 'react'
import { Constants } from '@project/constants';
import { getBetTypeDescription } from '@project/utils/formatUtils';
import { OptionsMultiplesHeader } from '@components/Betslip/components/OptionsHeader'
import MultipleItem from '@components/Betslip/components/OptionsList/components/MultipleItem';
import { MultiplesInterface } from './Multiples.types';

import styles from './Multiples.module.scss'

const {
    BET_TYPE_NAMES: {
        Single,
    },
    BOOKMAKER_NAMES: {
        BET365_UAT,
    },
} = Constants;

export const Multiples : FC<MultiplesInterface> = ({
    multipleBetOptions,
    userBalance,
    setSelectedOption,
    selectedOption,
    betSelections,
    betOptions,
    bookmakerConfig,
    areFreeBetsAvailable,
    areAllFreeBetsSelected,
    openModalForSpecificOption,
}) => {
    return (
        <div
            className = {styles.multiples}
            data-testid = "Container__OptionsListMultiples"
        >
            <OptionsMultiplesHeader />
            <div className = {styles.multiples__wrapper}>
                <ul
                    className = {styles.multiples__list}
                    data-testid = "List__OptionsListMultiples"
                >
                    {multipleBetOptions.map((item) => {
                        const {
                            id,
                            ui,
                            betType,
                            betTypeName,
                            numberLines,
                            error,
                            isOnlyViewable,
                            isEditable,
                            multipleBetSelections,
                            freeBetId,
                        } = item;

                        const selections = item.betSelections.map((selection) => {
                            return betSelections[selection]
                        });

                        const multipleBetItemSelections = selections.map((selectionItem) => ({
                            runnerNumber: selectionItem.runnerInfo.startPosition,
                            horseName: selectionItem.runnerInfo.horseName,
                            priceNumerator: selectionItem.selectionDetails.priceNumerator,
                            priceDenominator: selectionItem.selectionDetails.priceDenominator,
                            isWinOnly: selectionItem.raceInfo.eachWayData.isWinOnly,
                            id: selectionItem.runnerInfo.id,
                            optionId: id,
                        }));

                        const currentSelectionIds = Object.keys(multipleBetSelections)
                            .filter((key) => multipleBetSelections[key] === true);

                        const isStartingPrice = currentSelectionIds
                            .map((key) => betOptions.find((option) => (
                                option.betType === Single && option.betSelections[0] === key
                            )))
                            .some((selection) => selection?.ui.isSpSelected);

                        const useBestOddsGuaranteed = selections
                            .filter(
                                (selection) => currentSelectionIds
                                    .includes(selection.runnerInfo.id),
                            )
                            .every(
                                (selection) => selection?.selectionDetails.useBestOddsGuaranteed,
                            );

                        return (
                            <MultipleItem
                                key = {id}
                                betOptionUi = {ui}
                                betTypeName = {betTypeName}
                                optionId = {id}
                                numberLines = {numberLines}
                                error = {error}
                                userBalance = {userBalance}
                                useBestOddsGuaranteed = {useBestOddsGuaranteed}
                                isStartingPrice = {isStartingPrice}
                                isSelectionEditable = {!isOnlyViewable &&
                                    isEditable &&
                                    bookmakerConfig.displayName !== BET365_UAT}
                                betTypeDesc = {getBetTypeDescription(betType)}
                                multipleBetItemSelections = {multipleBetItemSelections}
                                includedInMultipleSelections = {multipleBetSelections}
                                freeBetId = {freeBetId}
                                selectOption = {setSelectedOption}
                                selectedOption = {selectedOption}
                                areFreeBetsAvailable = {areFreeBetsAvailable}
                                areAllFreeBetsSelected = {areAllFreeBetsSelected}
                                openModalForSpecificOption = {openModalForSpecificOption}
                            />
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}
