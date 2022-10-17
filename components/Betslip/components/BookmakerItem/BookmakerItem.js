import React, { useCallback, useMemo, useState } from 'react';
import classnames from 'classnames';
import propTypes from 'prop-types';
import Image from 'next/image';

import BookmakerThumb from '../BookmakerThumb';
import LinkButton from '../../../base/inputs/LinkButton';
import {
    bookmakerLoginOpenTapEvent,
    bookmakerRegistrationTapEvent,
} from '../../../../project/segmentEvents';
import { useLoginContext } from '../../../contexts/LoginContext';
import { Constants } from '../../../../project/constants';
import { convertToPascalCase } from '../../../../project/utils/formatUtils';
import FreeBetsPopover from '../FreeBetsPopover';

import styles from './BookmakerItem.module.scss';

const { ANALYTICS_LOCATIONS } = Constants;

export function BookmakerItem({
    bookmakerName,
    bookmakerDisplayName,
    clickHandler,
    isBookmakerFocused,
    isBookmakerSelected,
    isWinOnly,
    payOut,
    places,
    isBog,
    odd,
    loginType,
    isLoggedIn,
    userBalance,
    offer,
    offerDescription,
    shouldShowNewCustomerOffer,
    bookmakerListPosition,
    bookmakerSignupLink,
    freeBets,
    freeBetBalance,
}) {
    const [shouldShowFreeBetsPopover, setShouldShowFreeBetsPopover] = useState(false);

    const { openLoginLayout } = useLoginContext();
    const toggleFreeBetsPopover = useCallback((event) => {
        // this is so that bookmakerItemRowClick doesn't get called
        event.stopPropagation();

        setShouldShowFreeBetsPopover((prev) => !prev)
    }, []);

    const currencySign = userBalance && userBalance?.currencySign;
    const formattedBalance = userBalance && userBalance.formattedBalance;

    const shouldShowOffer = !isLoggedIn && offer !== '';
    const shouldShowFreeBets = freeBets.length > 0;

    const newCustomerOffer = useMemo(() => {
        return (
            <div
                className = {styles['bs-bookmaker-item__offer-container']}
                data-testid = "Container__BookmakerOffer"
            >
                <h2
                    className = {styles['bs-bookmaker-item__offer-first-display']}
                    data-testid = "Text__BookmakerOfferFirstDisplay"
                >
                    { (isBookmakerFocused || shouldShowNewCustomerOffer) ?
                        'New customer offer' : 'Offer'}
                </h2>
                <h3
                    className = {styles['bs-bookmaker-item__offer-title']}
                    data-testid = "Text__BookmakerOfferTitle"
                >
                    {offer}
                </h3>
                {isBookmakerFocused && (
                    <p
                        className = {styles['bs-bookmaker-item__offer-desc']}
                        data-testid = "Text__BookmakerOfferDescription"
                    >
                        {offerDescription}
                    </p>
                )}
            </div>
        );
    }, [shouldShowNewCustomerOffer, isBookmakerFocused, offer, offerDescription]);

    const bookmakerItemRowClick = useCallback(() => {
        clickHandler(
            bookmakerName,
            offer,
            isLoggedIn,
        );
    }, [clickHandler, bookmakerName, isLoggedIn, offer])

    const onSignUpButtonClick = useCallback(() => {
        bookmakerRegistrationTapEvent({
            location: ANALYTICS_LOCATIONS.BETSLIP,
            bookmakerName: bookmakerDisplayName,
            bookmakerListPosition,
        });

        window.open(bookmakerSignupLink, '_blank');
    }, [
        bookmakerDisplayName,
        bookmakerListPosition,
        bookmakerSignupLink,
    ]);

    const onLoginButtonClick = useCallback(() => {
        bookmakerLoginOpenTapEvent({
            location: ANALYTICS_LOCATIONS.BETSLIP,
            bookmakerName: bookmakerDisplayName,
            bookmakerListPosition,
        });

        openLoginLayout({
            name: bookmakerName,
            displayName: bookmakerDisplayName,
            loginType,
            bookmakerListPosition,
            location: ANALYTICS_LOCATIONS.BETSLIP,
            shouldChangeBookmaker: true,
        });
    }, [bookmakerDisplayName, bookmakerListPosition, bookmakerName,
        loginType, openLoginLayout])

    return (
        <li
            className = {classnames(
                styles['bs-bookmaker-item'],
                {
                    [styles['bs-bookmaker-item--selected']]: isBookmakerSelected,
                },
            )}
            onClick = {bookmakerItemRowClick}
            data-testid = {bookmakerName &&
            `Container__BookmakerItem${convertToPascalCase(bookmakerName)}`}
        >
            <div
                className = {styles['bs-bookmaker-item__primary']}
                data-testid = "Container__BookmakerPrimary"
            >
                <BookmakerThumb
                    bookmakerName = {bookmakerName}
                    size = "large"
                    className = {styles['bs-bookmaker-item__bookmaker-thumbnail']}
                />
                {shouldShowOffer && (
                    <div
                        className = {styles['bs-bookmaker-item__offer-label-container']}
                        data-testid = "Container__BookmakerOfferLabel"
                    >
                        <span
                            className = {styles['bs-bookmaker-item__offer-label']}
                            data-testid = "Text__BookmakerOfferLabel"
                        >
                            Offer
                        </span>
                    </div>
                )}
                {(formattedBalance || shouldShowFreeBets) && (
                    <div
                        className = {styles['bs-bookmaker-item__balance-wrapper']}
                        data-testid = "Container__BookmakerBalanceWrapper"
                    >
                        {formattedBalance && (
                            <div
                                className = {styles['bs-bookmaker-item__balance']}
                                data-testid = "Container__BookmakerBalance"
                            >
                                <span
                                    className = {styles['bs-bookmaker-item__balance-currency']}
                                    data-testid = "Text__BookmakerBalanceCurrency"
                                >
                                    {currencySign}
                                </span>
                                <span
                                    className = {styles['bs-bookmaker-item__balance-amount']}
                                    data-testid = "Text__BookmakerBalanceAmount"
                                >
                                    {formattedBalance}
                                </span>
                            </div>
                        )}
                        {shouldShowFreeBets && (
                            <div
                                className = {styles['bs-bookmaker-item__free-bets']}
                                data-testid = "Container__BookmakerFreeBets"
                            >
                                <span
                                    className = {styles['bs-bookmaker-item__free-bets-amount']}
                                    data-testid = "Text__BookmakerFreeBetsAmount"
                                >
                                    + {currencySign}{freeBetBalance}
                                </span>
                                <span
                                    className = {styles['bs-bookmaker-item__free-bets-label']}
                                    data-testid = "Text__BookmakerFreeBetsLabel"
                                >
                                    free bets
                                </span>
                                <div
                                    className = {classnames(
                                        styles['bs-bookmaker-item__free-bets-icon'],
                                        {
                                            [styles['bs-bookmaker-item__free-bets-icon--active']]:
                                                shouldShowFreeBetsPopover,
                                        },
                                        {
                                            // eslint-disable-next-line max-len
                                            [styles['bs-bookmaker-item__free-bets-icon--active-above']]:
                                                bookmakerListPosition > 4,
                                        },
                                    )}
                                    onClick = {toggleFreeBetsPopover}
                                >
                                    <Image
                                        src = "/svgs/info_small.svg"
                                        width = {16}
                                        height = {16}
                                    />
                                </div>
                                {shouldShowFreeBetsPopover && (
                                    <FreeBetsPopover
                                        freeBets = {freeBets}
                                        currencySign = {currencySign}
                                        bookmakerListPosition = {bookmakerListPosition}
                                        setShouldShowPopover = {setShouldShowFreeBetsPopover}
                                    />
                                )}
                            </div>
                        )}
                    </div>
                )}
                <div
                    className = {styles['bs-bookmaker-item__betting-wrapper']}
                    data-testid = "Container__BookmakerBettingWrapper"
                >
                    <div
                        className = {styles['bs-bookmaker-item__odds']}
                        data-testid = "Container__BookmakerOdds"
                    >
                        <span
                            className = {styles['bs-bookmaker-item__price']}
                            data-testid = "Container__BookmakerPrice"
                        >
                            {odd}
                        </span>
                        {isBog && (
                            <div className = {styles['bs-bookmaker-item__best-odds-icon']}>
                                <Image
                                    src = "/svgs/bestodds.svg"
                                    width = {16}
                                    height = {16}
                                    data-testid = "Icon__BestOdds"
                                />
                            </div>
                        )}
                    </div>
                    <div
                        className = {styles['bs-bookmaker-item__terms']}
                        data-testid = "Container__BookmakerTerms"
                    >
                        <span
                            className = {styles['bs-bookmaker-item__each-way-text']}
                            data-testid = "Text__BookmakerEachWay"
                        >
                            {!isWinOnly && 'EW'}
                        </span>
                        <span
                            className = {styles['bs-bookmaker-item__terms-text']}
                            data-testid = "Text__BookmakerTerms"
                        >
                            {places} {payOut}
                        </span>
                    </div>
                </div>
            </div>
            {!isLoggedIn && isBookmakerFocused && (
                <div
                    className = {styles['bs-bookmaker-item__secondary']}
                    data-testid = "Container__BookmakerSecondary"
                >
                    <LinkButton
                        styleType = "tertiary"
                        className = {styles['bs-bookmaker-item__register-button']}
                        onClick = {onSignUpButtonClick}
                        targetName = "WindowSignUp"
                        title = "Window Signup"
                    >
                        <span
                            data-testid = {shouldShowOffer ?
                                'Text__BookmakerButtonClaimOffer' :
                                'Text__BookmakerButtonSignUp'}
                        >
                            {shouldShowOffer ? 'CLAIM THIS OFFER' : 'SIGN UP'}
                        </span>
                    </LinkButton>
                    <LinkButton
                        styleType = "tertiary"
                        className = {styles['bs-bookmaker-item__login-button']}
                        onClick = {onLoginButtonClick}
                        targetName = "WindowLogin"
                        title = "Window Login"
                    >
                        <span data-testid = "Text__BookmakerButtonLogin">Login</span>
                    </LinkButton>
                </div>
            )}
            {shouldShowOffer &&
             (isBookmakerFocused || shouldShowNewCustomerOffer) && newCustomerOffer}
        </li>
    )
}

BookmakerItem.propTypes = {
    loginType: propTypes.string.isRequired,
    isWinOnly: propTypes.bool.isRequired,
    shouldShowNewCustomerOffer: propTypes.bool.isRequired,
    payOut: propTypes.string.isRequired,
    places: propTypes.string.isRequired,
    isBog: propTypes.bool.isRequired,
    odd: propTypes.string.isRequired,
    isLoggedIn: propTypes.bool.isRequired,
    userBalance: propTypes.object,
    bookmakerName: propTypes.string.isRequired,
    isBookmakerFocused: propTypes.bool.isRequired,
    isBookmakerSelected: propTypes.bool,
    clickHandler: propTypes.func.isRequired,
    offer: propTypes.string,
    bookmakerListPosition: propTypes.number,
    offerDescription: propTypes.string,
    bookmakerDisplayName: propTypes.string,
    freeBets: propTypes.array,
    freeBetBalance: propTypes.number,
};
