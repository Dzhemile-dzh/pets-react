import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Actions } from '@project/common';
import { StateInterface } from '@components/interfaces/Store.types';
import { LoadingLogoIcon } from '../../../base/Icons/LoadingLogoIcon';
import BookmakerIcon from '../../../base/BookmakerIcon';
import Header from './components/Header';
import List from './components/List';
import Footer from './components/Footer';
import { BetReceiptInterface } from '../../../interfaces/BetReceipt';
import { Constants } from '../../../../project/constants';

import {
    betBasketCreatedEvent,
    getBetBasketTimer,
    placeBetEvent,
    resetBetBasketTimer,
    setBetslipId,
    betReceiptEvent,
} from '../../../../project/segmentEvents';

import styles from './BetReceipt.module.scss';

const { ODDS_TYPES } = Constants;

export const BetReceipt = ({
    betSelectionsCount,
    selectedBookmaker,
    betReceipts,
    isBetSlipLoading,
    toggleBetslip,
    toggleBetReceipt,
    error,
    betSelections,
    userBalance,
    priceType,
}: BetReceiptInterface) => {
    const dispatch = useDispatch();

    const bookmakerConfig = useSelector((state: StateInterface) => {
        return state.bookmakersDetails.find((bookie) => bookie.feed === selectedBookmaker)
    })

    useEffect(() => {
        const betBasketStartTime = getBetBasketTimer();

        if (!isBetSlipLoading &&
            !error &&
            !betSelections?.error &&
            !!betBasketStartTime &&
            !!Object.keys(betReceipts).length
        ) {
            placeBetEvent({
                bookmakerName: bookmakerConfig?.displayName,
                selectionsCount: betSelectionsCount,
                timeToPlaceBet: (Date.now() - Number(betBasketStartTime)) / 1000,
            });

            betReceiptEvent(
                betReceipts,
                bookmakerConfig?.displayName,
                priceType === ODDS_TYPES.FRACTIONAL,
                betSelections,
                userBalance,
            );
            resetBetBasketTimer();
        }
    }, [error, isBetSlipLoading, bookmakerConfig, betSelectionsCount, betSelections,
        betReceipts, priceType, userBalance]);

    useEffect(() => {
        const placeBetEventWithError = (err) => {
            if (err?.message || err?.type) {
                placeBetEvent({
                    bookmakerName: bookmakerConfig?.displayName,
                    selectionsCount: betSelectionsCount,
                    timeToPlaceBet: null,
                    errorProps: {
                        api_error_detail: err?.message,
                        api_bookmaker_error_code: err?.type,
                        error_code: err?.type ? '400' : null,
                    },
                });
            }
        }

        Object.keys(betSelections).forEach((key) => {
            const betSelection = betSelections[key];
            if (betSelection?.error) {
                placeBetEventWithError(betSelection.error)
            }
        });

        placeBetEventWithError(error);
        placeBetEventWithError(betSelections?.error);
    }, [error, bookmakerConfig, betSelectionsCount, betSelections]);

    const onReceiptClickHandler = useCallback((isReUseBtn = false) => {
        if (isReUseBtn) {
            dispatch(Actions.clearBetOptions());
            dispatch(Actions.buildBet());
            setBetslipId();

            betBasketCreatedEvent({
                bookmakerName: bookmakerConfig?.displayName,
                areOddsFractional: priceType === ODDS_TYPES.FRACTIONAL,
            });
        } else {
            dispatch(Actions.clearBetslip());
            toggleBetslip();
        }

        toggleBetReceipt();
    }, [bookmakerConfig?.displayName, dispatch, priceType, toggleBetReceipt, toggleBetslip])

    return (
        <div
            className = {styles['bs-bet-receipt']}
            data-testid = "Container__BetReceipt"
        >
            {Boolean(betReceipts.length) && !isBetSlipLoading &&
            (!error || !betSelections?.error) && (
                <>
                    <Header
                        selectedBookmakerName = {bookmakerConfig?.name}
                        showBookmakerMessage
                        onReceiptClickHandler = {onReceiptClickHandler}
                    />
                    <div
                        className = {styles['bs-bet-receipt__wrapper']}
                        data-testid = "Container__BetReceiptWrapper"
                    >
                        <List
                            betReceipts = {betReceipts}
                            betSelections = {betSelections}
                            userBalance = {userBalance}
                            priceType = {priceType}
                        />
                        <Header showBookmakerMessage = {false} />
                        <Footer
                            onReceiptClickHandler = {onReceiptClickHandler}
                        />
                    </div>
                </>
            )}
            {isBetSlipLoading && (!error || !betSelections?.error) && (
                <div
                    className = {styles['bs-bet-receipt__loading']}
                    data-testid = "Container__BetReceiptLoading"
                >
                    <span
                        className = {styles['bs-bet-receipt__loading-text-1']}
                        data-testid = "Text__BetReceiptLoadingOne"
                    >
                        Hold tight
                    </span>
                    <LoadingLogoIcon data-testid = "Icon__BetReceiptLoading" />
                    <span
                        className = {styles['bs-bet-receipt__loading-text-2']}
                        data-testid = "Text__BetReceiptLoadingTwo"
                    >
                        We are placing your
                        {betSelectionsCount > 1 ? ' bets ' : ' bet '}
                        with
                    </span>
                    <BookmakerIcon name = {`${bookmakerConfig?.name}whitebackground`} />
                </div>
            )}
            {(error || betSelections?.error) && (
                <div style = {{ display: 'flex', width: '100%', height: '100%' }}>
                    <span
                        style = {{ margin: 'auto', fontSize: '20px' }}
                        data-testid = "Text__BetReceiptBetFailed"
                    >
                        Place bet failed
                    </span>
                </div>
            )}
        </div>
    )
};
