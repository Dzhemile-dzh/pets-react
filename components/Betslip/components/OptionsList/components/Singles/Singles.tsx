import { FC } from 'react'
import Button from '@components/base/inputs/Button';

import { OptionsSinglesHeader } from '../../../OptionsHeader/OptionsSinglesHeader';
import SingleItem from '../SingleItem';
import { SinglesInterface } from './Singles.types';
import styles from './Singles.module.scss';

const MAX_SELECTIONS_COUNT = 10;

export const Singles : FC<SinglesInterface> = ({
    singleBetOptions,
    singeLinesCount,
    betSelections,
    priceType,
    setSelectedOption,
    selectedOption,
    userBalance,
    bookmakerConfig,
    betSelectionsCount,
    areFreeBetsAvailable,
    areAllFreeBetsSelected,
    openModalForSpecificOption,
    toggleBetslip,
}) => (
    <div
        className = {styles.singles}
        data-testid = "Container__Singles"
    >
        <OptionsSinglesHeader count = {singeLinesCount} />
        <div className = {styles.singles__wrapper}>
            <ul
                className = {styles.singles__list}
                data-testid = "Container__SinglesList"
            >
                {singleBetOptions.map((item) => {
                    const {
                        raceInfo,
                        runnerInfo,
                        selectionDetails,
                        displayPrice,
                        error: selectionError,
                    } = betSelections[item.betSelections[0]] || {};

                    const {
                        id, ui, error, betSelections: betSelectionIds, freeBetId,
                    } = item;

                    return (
                        <SingleItem
                            key = {id}
                            optionId = {id}
                            runnerInfo = {runnerInfo}
                            raceInfo = {raceInfo}
                            betSelectionsCount = {betSelectionsCount}
                            bookmakerName = {bookmakerConfig.displayName}
                            betOptionUi = {ui}
                            displayPrice = {displayPrice}
                            priceType = {priceType}
                            selectionDetails = {selectionDetails}
                            selectionError = {selectionError}
                            error = {error}
                            betSelectionIds = {betSelectionIds}
                            selectOption = {setSelectedOption}
                            selectedOption = {selectedOption}
                            userBalance = {userBalance}
                            freeBetId = {freeBetId}
                            areFreeBetsAvailable = {areFreeBetsAvailable}
                            areAllFreeBetsSelected = {areAllFreeBetsSelected}
                            openModalForSpecificOption = {openModalForSpecificOption}
                        />
                    )
                })}
                {singeLinesCount < MAX_SELECTIONS_COUNT && (
                    <div
                        className = {styles['singles__add-selection']}
                        data-testid = "Container__OptionsListSinglesAddAnotherSelection"
                    >
                        <Button
                            data-testid = "Button__AddAnotherSelection"
                            onClick = {() => toggleBetslip()}
                            styleType = "no-style"
                        >
                                    Add another selection
                        </Button>
                    </div>
                )}
            </ul>
        </div>
    </div>
)
