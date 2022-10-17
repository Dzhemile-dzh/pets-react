import React, {
    useEffect,
    useState,
    useRef,
    useCallback,
} from 'react';
import propTypes from 'prop-types';
import classnames from 'classnames';

import { useDispatch } from 'react-redux';

import { Actions } from '../../project/common';
import { withBetSlip, withAllBookmakers } from '../../store/providers';

import { Constants } from '../../project/constants';

import { useBetslip } from '../contexts/BetslipContext';
import BetslipTabs from './components/BetslipTabs';
import BetslipHeader from './components/BetslipHeader';
import { BookmakersListWith } from './components/BookmakersList';
import OptionsList from './components/OptionsList';
import BetslipModal from './components/BetslipModal';
import { useModal } from '../base/Modal';
import { usePrevious } from '../custom-hooks/usePrevious.ts';
import useEffectOnce from '../custom-hooks/useEffectOnce';
import LoginLayoutProvider from '../base/LoginLayoutProvider';
import { useBreakPoint } from '../contexts/BreakPointContext';
import { generateDate } from '../../project/utils/dateUtils';
import BetslipErrorModal from './components/BetslipErrorModal';

import styles from './Betslip.module.scss';

const builtFreeBetError = (freeBets, currency, betSlipError) => {
    const freeBetIdFromError = betSlipError?.data[0]?.id;

    if (!freeBetIdFromError) {
        return null;
    }

    const freeBetCausingError = freeBets.find((freeBet) => freeBet.id === freeBetIdFromError);

    const { date } = generateDate(
        freeBetCausingError.expiry,
        0,
        Constants.DATE_FORMATS['DD/MM/YYYY'],
    );

    return {
        errorHeading: 'Your Free Bet was not applied',
        errorText: `The ${currency}${freeBetCausingError.amount} bet that
        expires ${date} has already
        been used or expired. Please update your stake.`,
    };
}

const getBetOptionIdAttachedToParticularFreeBet = (freeBets, freeBetId) => {
    return freeBets.find((bet) => bet.id === freeBetId)?.betOptionId;
}

const { ERROR_CODES } = Constants;

export const Betslip = ({
    allBookmakers,
    selectedBookmaker,
    betSelectionsCount,
    userBalance,
    betSlipError,
    freeBets,
}) => {
    const dispatch = useDispatch();

    const [focusedBookmaker, setFocusedBookmaker] = useState('');
    const [showBookmakersList, setShowBookmakersList] = useState(true);
    const [bookmakersWithFreeBets, setBookmakersWithFreeBets] = useState([])
    const betslipRef = useRef(null);

    const { isOpened, toggleBetslip } = useBetslip();
    const prevIsOpened = usePrevious(isOpened);
    const { showModal, hideModal, isModalOpen } = useModal('betslip');
    const { isMobile } = useBreakPoint()

    const {
        showModal: showErrorModal,
        hideModal: hideErrorModal,
        isModalOpen: isErrorModalOpen,
    } = useModal('betslipError');

    const hasLoggedInWithCurrentBookmaker = allBookmakers
        .some((bookmaker) => bookmaker.feed === selectedBookmaker && bookmaker.isLoggedIn)

    useEffect(() => {
        if (betSlipError && betSlipError.type === ERROR_CODES.FREE_BET_ERROR) {
            showErrorModal();
        }
    }, [betSlipError, showErrorModal]);

    useEffectOnce(() => {
        dispatch(Actions.bookmakerUserActive());
        dispatch(Actions.getBookmakerConfigurations());
    })

    useEffect(() => {
        if (isOpened && isMobile) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isMobile, isOpened]);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            const isBetslipModal = event.target ? (
                event.target.closest('#modal')
            ) : false;

            if (!isBetslipModal &&
                isOpened &&
                betslipRef &&
                !betslipRef.current.contains(event.target)
            ) {
                toggleBetslip();
            }
        }

        document.addEventListener(
            'mouseup',
            handleOutsideClick,
        );

        return () => {
            document.removeEventListener(
                'mouseup',
                handleOutsideClick,
            )
        }
    }, [betSelectionsCount, isOpened, toggleBetslip])

    useEffect(() => {
        if (!prevIsOpened && isOpened) {
            dispatch(Actions.bookmakerUserActive());
        }
    }, [dispatch, isOpened, prevIsOpened])

    const toggleBookmakersList = useCallback(() => {
        setShowBookmakersList((prevShowBkmList) => !prevShowBkmList)
    }, [])

    const toggleModal = useCallback((bookmakerFeed = '') => {
        if (bookmakerFeed === '') {
            hideModal();
        } else if (bookmakerFeed !== selectedBookmaker) {
            showModal();
        }
    }, [hideModal, selectedBookmaker, showModal])

    const focusBookmaker = useCallback((bookmakerName = '') => {
        setFocusedBookmaker(bookmakerName);
    }, [])

    return (
        <div
            ref = {betslipRef}
            id = "betslip"
            className = {classnames(
                styles.betslip,
                isOpened && styles['betslip--opened'],
            )}
            // NOTE:
            // This is set for iOS < 13 versions
            // For the click events to be triggered
            // And the custom keyboard for stake input to work properly
            onClick = {() => {}}
            data-testid = "Container__Betslip"
        >
            {!isMobile && (
                <BetslipTabs
                    isOpened = {isOpened}
                    toggleBetslip = {toggleBetslip}
                    selectionCount = {betSelectionsCount}
                    betslipRef = {betslipRef}
                />
            )}
            {isOpened && (
            <div
                className = {styles['betslip__main-content']}
                data-testid = "Container__BetslipContent"
            >
                <LoginLayoutProvider
                    onSuccess = {toggleBookmakersList}
                >
                    <BetslipHeader
                        userBalance = {userBalance || {}}
                        closeBetslipHandler = {toggleBetslip}
                        selectedBookmaker = {selectedBookmaker}
                        toggleBookmakersList = {toggleBookmakersList}
                        betslipRef = {betslipRef}
                    />
                    {showBookmakersList || !hasLoggedInWithCurrentBookmaker ? (
                        <BookmakersListWith
                            focusedBookmaker = {focusedBookmaker}
                            focusBookmaker = {focusBookmaker}
                            selectedBookmaker = {selectedBookmaker}
                            showBookmakersList = {showBookmakersList}
                            toggleBookmakersList = {toggleBookmakersList}
                            openModal = {toggleModal}
                            betslipRef = {betslipRef}
                            setBookmakersWithFreeBets = {setBookmakersWithFreeBets}
                        />
                    ) : (
                        <OptionsList
                            toggleBetslip = {toggleBetslip}
                            betSelectionsCount = {betSelectionsCount}
                            focusBookmaker = {focusBookmaker}
                            betslipRef = {betslipRef}
                            bookmakersWithFreeBets = {bookmakersWithFreeBets}
                        />
                    )}
                </LoginLayoutProvider>
            </div>
            )}
            {
                betSlipError &&
                betSlipError.type === ERROR_CODES.FREE_BET_ERROR &&
                isErrorModalOpen && (
                    <BetslipErrorModal
                        {...builtFreeBetError(freeBets, userBalance.currencySign, betSlipError)}
                        closeModal = {() => {
                            dispatch(Actions.clearBetslipError());
                            dispatch(Actions.removeFreeBetSelection(
                                getBetOptionIdAttachedToParticularFreeBet(
                                    freeBets,
                                    betSlipError?.data[0]?.id,
                                ),
                                userBalance.currencySign,
                            ));
                            hideErrorModal();
                        }}
                    />
                )
            }
            {
                isModalOpen && selectedBookmaker && (
                    <BetslipModal
                        bookmakerFeed = {selectedBookmaker}
                        closeModal = {toggleModal}
                    />
                )
            }
        </div>
    )
}

Betslip.propTypes = {
    betSelectionsCount: propTypes.number,
    selectedBookmaker: propTypes.string,
    userBalance: propTypes.object,
    freeBets: propTypes.arrayOf(propTypes.object),
    betSlipError: propTypes.object,
}

Betslip.displayName = 'Betslip';

const BetslipWith = withBetSlip(
    Betslip,
    ['selectedBookmaker', 'betSelectionsCount', 'userBalance', 'betSlipError', 'freeBets'],
    null,
);

export default withAllBookmakers(
    BetslipWith,
    ['allBookmakers'],
    null,
)
