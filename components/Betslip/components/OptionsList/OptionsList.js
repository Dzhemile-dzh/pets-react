import {
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import propTypes from 'prop-types';
import classnames from 'classnames';
import { Actions } from '../../../../project/common';
import { withBetSlip, withAllBookmakers } from '../../../../store/providers';
import BetReceipt from '../BetReceipt';
import BetslipEmpty from '../BetslipEmpty';
import OptionsFooter from '../OptionsFooter';
import BookmakerCompliance from '../BookmakerCompliance';
import Loader from '../../../base/Loader';
import { useModal } from '../../../base/Modal';
import FreeBetsModal from '../FreeBetsModal';
import useEffectOnce from '../../../custom-hooks/useEffectOnce';
import Singles from './components/Singles';
import Multiples from './components/Multiples';

import { useLoginContext } from '../../../contexts/LoginContext';
import { Constants } from '../../../../project/constants';

import styles from './OptionsList.module.scss';

const {
    ANALYTICS_LOCATIONS,
    ERROR_CODES,
    BET_TYPE_NAMES: {
        Single,
    },
} = Constants;

export const OptionsList = ({
    allBookmakers,
    betOptions,
    betReceipts,
    betSelections,
    betSelectionsCount,
    betSlipError,
    bookmakerConfiguration,
    canPlaceBet,
    combinedStake,
    freeBets,
    focusBookmaker,
    isBetSlipLoading,
    priceType,
    selectedBookmaker,
    singeLinesCount,
    toggleBetslip,
    totalEstimatedReturns,
    totalStake,
    totalFreeBetsStake,
    userBalance,
    userSession,
    bookmakersWithFreeBets,
}) => {
    const dispatch = useDispatch();
    const [showBetReceipt, setShowBetReceipt] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectionToHaveFreeBet, setSelectionToHaveFreeBet] = useState(null);

    const { openLoginLayout } = useLoginContext();

    const hasOtherBookmakersWithFreeBets = bookmakersWithFreeBets
        .some((bookmaker) => bookmaker !== selectedBookmaker);

    const {
        isModalOpen,
        showModal,
        hideModal,
    } = useModal('FreeBetModal');

    useEffectOnce(() => dispatch(Actions.buildBet()));

    const bookmakerConfig = useSelector((state) => {
        return state.bookmakersDetails.find((bookie) => bookie.feed === selectedBookmaker) || {}
    })

    const toggleBetReceipt = useCallback(() => {
        setShowBetReceipt((prevShowBetReceipt) => !prevShowBetReceipt)
    }, []);

    const openModalForSpecificOption = useCallback((betId) => {
        setSelectionToHaveFreeBet(betId);
        showModal();
    }, [showModal]);

    const hideModalAndClearSelectedOption = useCallback(() => {
        setSelectionToHaveFreeBet(null);
        hideModal();
    }, [hideModal]);

    const applyFreeBetForSpecificOption = useCallback((id, amount) => {
        dispatch(Actions.addFreeBetSelection(
            selectionToHaveFreeBet,
            {
                id,
                amount,
            },
            userBalance?.currencySign,
        ))
        hideModalAndClearSelectedOption();
    }, [
        dispatch,
        hideModalAndClearSelectedOption,
        selectionToHaveFreeBet,
        userBalance?.currencySign,
    ]);

    const singleBetOptions = useMemo(
        () => betOptions
            .filter((option) => option.betType === Single),
        [betOptions],
    )

    const multipleBetOptions = useMemo(
        () => betOptions
            .filter((option) => option.isMultipleBetFromDiffRaces),
        [betOptions],
    )

    const areFreeBetsAvailable = freeBets.length > 0 && bookmakerConfig.displayName !== 'bet365'

    const areAllFreeBetsSelected = freeBets.every((freeBet) => freeBet.betOptionId)

    const betSelectionWithError = Object.keys(betSelections)
        .find((betSelection) => betSelections[betSelection].error);

    const selectionError = betSelections[betSelectionWithError]?.error;

    useEffect(() => {
        if (showBetReceipt && (betSelectionWithError || betSlipError)) {
            toggleBetReceipt();
        }

        if (betSlipError?.type === ERROR_CODES.FORBIDDEN && showBetReceipt) {
            if (selectedBookmaker) {
                const { name, displayName, loginType } = bookmakerConfig;
                focusBookmaker(name);

                const bookmakerListPosition = allBookmakers
                    .findIndex((bookmaker) => bookmaker.feed === selectedBookmaker) + 1;

                openLoginLayout({
                    name,
                    displayName,
                    loginType,
                    bookmakerListPosition,
                    location: ANALYTICS_LOCATIONS.BETSLIP,
                    shouldChangeBookmaker: true,
                });
            }
        }
    }, [allBookmakers,
        betSelectionWithError,
        betSlipError,
        bookmakerConfig,
        focusBookmaker,
        openLoginLayout,
        selectedBookmaker,
        showBetReceipt,
        toggleBetReceipt])

    const enhancedBetReceipts = betReceipts.map((receipt) => {
        return {
            ...receipt,
            isEWSelected: betOptions.find((option) => {
                return option.id === receipt.betId;
            })?.ui.isEWSelected,
        };
    });

    return showBetReceipt ? (
        <BetReceipt
            betSelectionsCount = {betSelectionsCount}
            selectedBookmaker = {selectedBookmaker}
            betReceipts = {enhancedBetReceipts}
            isBetSlipLoading = {isBetSlipLoading}
            toggleBetslip = {toggleBetslip}
            toggleBetReceipt = {toggleBetReceipt}
            error = {betSlipError}
            betSelections = {betSelections}
            userBalance = {userBalance}
            priceType = {priceType}
        />
    ) : (
        <div
            className = {styles['bs-options-list__wrapper']}
            data-testid = "Container__OptionsListWrapper"
        >
            {betSelectionsCount > 0 ? (
                <>
                    {isBetSlipLoading && (
                        <div
                            className = {styles['bs-options-list__spinner']}
                            date-testid = "Container__OptionsListSpinner"
                        >
                            <Loader type = "betslip" />
                        </div>
                    )}

                    <div className = {
                        classnames(
                            styles['bs-options-list'],
                            {
                                [styles['bs-options-list__betslip-loading']]: isBetSlipLoading,
                            },
                        )
                    }
                    >
                        {hasOtherBookmakersWithFreeBets && (
                            <span
                                className = {styles['bs-options-list__free-bets-warning']}
                                data-testid = "Text__FreeBetsWarning"
                            >
                                You have free bets available from a bookmaker
                            </span>
                        )}
                        {
                            singeLinesCount > 0 && (
                                <Singles
                                    singleBetOptions = {singleBetOptions}
                                    singeLinesCount = {singeLinesCount}
                                    betSelections = {betSelections}
                                    priceType = {priceType}
                                    setSelectedOption = {setSelectedOption}
                                    selectedOption = {selectedOption}
                                    userBalance = {userBalance || {}}
                                    bookmakerConfig = {bookmakerConfig}
                                    betSelectionsCount = {betSelectionsCount}
                                    areFreeBetsAvailable = {areFreeBetsAvailable}
                                    areAllFreeBetsSelected = {areAllFreeBetsSelected}
                                    openModalForSpecificOption = {openModalForSpecificOption}
                                    toggleBetslip = {toggleBetslip}
                                />
                            )
                        }
                        {
                            multipleBetOptions.length > 0 && (
                                <Multiples
                                    multipleBetOptions = {multipleBetOptions}
                                    userBalance = {userBalance || {}}
                                    setSelectedOption = {setSelectedOption}
                                    selectedOption = {selectedOption}
                                    betSelections = {betSelections}
                                    betOptions = {betOptions}
                                    areFreeBetsAvailable = {areFreeBetsAvailable}
                                    areAllFreeBetsSelected = {areAllFreeBetsSelected}
                                    openModalForSpecificOption = {openModalForSpecificOption}
                                    bookmakerConfig = {bookmakerConfig}
                                />
                            )
                        }
                        <BookmakerCompliance
                            bookmakerConfiguration = {bookmakerConfiguration}
                            bookmakerName = {bookmakerConfig?.name}
                        />
                    </div>
                    {isModalOpen && (
                        <FreeBetsModal
                            freeBets = {freeBets}
                            currencySign = {userBalance?.currencySign}
                            totalFreeBetsBalance = {
                                parseFloat(userSession.account.freeBetBalance).toFixed(2)
                            }
                            hideModal = {hideModalAndClearSelectedOption}
                            applyFreeBetForSpecificOption = {applyFreeBetForSpecificOption}
                        />
                    )}
                </>
            ) : (
                <BetslipEmpty toggleBetslip = {toggleBetslip} />
            )}
            <OptionsFooter
                totalEstimatedReturns = {totalEstimatedReturns}
                totalStake = {totalStake}
                totalFreeBetsStake = {totalFreeBetsStake}
                combinedStake = {combinedStake}
                selectedOption = {selectedOption}
                error = {betSlipError}
                canPlaceBet = {canPlaceBet && !isBetSlipLoading}
                toggleBetReceipt = {toggleBetReceipt}
                selectionError = {selectionError}
                bookmakerName = {bookmakerConfig?.displayName}
                betSelectionsCount = {betSelectionsCount}
                freeBets = {freeBets}
            />
        </div>
    )
}

OptionsList.propTypes = {
    betOptions: propTypes.arrayOf(propTypes.object),
    totalEstimatedReturns: propTypes.object,
    totalStake: propTypes.object,
    betSelections: propTypes.object,
    singeLinesCount: propTypes.number,
    betSelectionsCount: propTypes.number,
    toggleBetslip: propTypes.func,
    userBalance: propTypes.object,
    priceType: propTypes.string,
    canPlaceBet: propTypes.bool,
    selectedBookmaker: propTypes.string,
    betReceipts: propTypes.array,
    isBetSlipLoading: propTypes.bool,
    focusBookmaker: propTypes.func,
    bookmakerConfiguration: propTypes.object,
    allBookmakers: propTypes.array,
    bookmakersWithFreeBets: propTypes.array,
    freeBets: propTypes.array,
}

const OptionsListWithBetslip = withBetSlip(
    OptionsList,
    undefined,
    null,
);

export default withAllBookmakers(
    OptionsListWithBetslip,
    ['allBookmakers'],
    null,
);
