import React, { useCallback } from 'react';
import propTypes from 'prop-types';
import classnames from 'classnames';
import { ChevronIcon } from '../../../base/Icons/ChevronIcon';
import BookmakerLogoutButton from '../../../base/BookmakerLogoutButton';
import BookmakerThumb from '../../../Betslip/components/BookmakerThumb';
import OfferDropdown from './components/OfferDropdown';
import Button from '../../../base/inputs/Button/index.tsx';
import LinkButton from '../../../base/inputs/LinkButton';
import { useLoginContext } from '../../../contexts/LoginContext';
import { bookmakerLoginOpenTapEvent } from '../../../../project/segmentEvents';
import { convertToPascalCase } from '../../../../project/utils/formatUtils';

import styles from './BookmakerAccountItem.module.scss';

export default function BookmakerAccountItemMobile({
    name,
    isLogged,
    isRecent,
    offer,
    balance,
    username,
    onBookmakerClick,
    onOfferClicked,
    selectedOffer,
    loginType,
    bookmakerListPosition,
    location,
    onSignUpButtonClick,
    displayName,
}) {
    const {
        openLoginLayout,
    } = useLoginContext();

    const openLogin = useCallback(
        () => {
            bookmakerLoginOpenTapEvent({
                location,
                bookmakerName: displayName,
                bookmakerListPosition,
            });

            openLoginLayout({
                name, displayName, loginType, bookmakerListPosition, location,
            })
        },
        [bookmakerListPosition, displayName, location, loginType, name, openLoginLayout],
    );

    return (
        <li
            className = {styles['ba-item']}
            onClick = {onBookmakerClick}
            data-testid = {displayName &&
                `Container__BookmakerAccountItem${convertToPascalCase(displayName)}`}
        >
            <div
                className = {styles['ba-item__primary']}
                data-testid = "Container__BookmakerAccountItemPrimary"
            >
                <div
                    className = {styles['ba-item__thumb']}
                    data-testid = "Container__BookmakerAccountItemThumb"
                >
                    <BookmakerThumb
                        bookmakerName = {name}
                    />
                </div>
                <div
                    className = {styles['ba-item__details']}
                    data-testid = "Container__BookmakerAccountItemDetails"
                >
                    {isLogged && (
                        <div
                            className = {styles['ba-item__account']}
                            data-testid = "Container__BookmakerAccountItemAccount"
                        >
                            <span
                                className = {styles['ba-item__account-name']}
                                data-testid = "Text__BookmakerAccountItemAccount"
                            >
                                {username}
                            </span>
                            <span
                                className = {styles['ba-item__account-balance']}
                                data-testid = "Text__BookmakerAccountItemAccountBalance"
                            >
                                {balance}
                            </span>
                        </div>
                    )}
                    <div
                        className = {styles['ba-item__buttons']}
                        data-testid = "Container__BookmakerAccountItemButtons"
                    >
                        {isLogged ? (
                            <BookmakerLogoutButton
                                className = {styles['ba-item__buttons-logout-button']}
                                bookmakerName = {name}
                            />
                        ) : loginType === 'window' ? (
                            <LinkButton
                                styleType = "tertiary"
                                className = {styles['ba-item__buttons-window-login-button']}
                                onClick = {openLogin}
                                targetName = "WindowLogin"
                                title = "Window Login"
                                isWindowPopUp
                            >
                                Log in
                            </LinkButton>
                        ) : (
                            <Button
                                styleType = "tertiary"
                                className = {styles['ba-item__buttons-login-button']}
                                onClick = {openLogin}
                                name = {name}
                                data-testid = "Button__BookmakerAccountItemLogin"
                            >
                                Log in
                            </Button>
                        )}
                        {!isRecent && !isLogged && !offer.offer && (
                            <a
                                target = "blank"
                                className = {styles['ba-item__buttons-register-button']}
                                onClick = {onSignUpButtonClick}
                                data-testid = "Link__BookmakerAccountItemSignUp"
                            >
                                <span
                                    data-testid = "Text__BookmakerAccountItemSignUp"
                                >
                                    Sign Up
                                </span>
                            </a>
                        )}
                        {!isRecent && !isLogged && offer.offer && (
                            <Button
                                styleType = "tertiary"
                                className = {styles['ba-item__buttons-offer-button']}
                                onClick = {() => onOfferClicked(name)}
                                data-testid = "Button__BookmakerAccountItemOffer"
                            >
                                Sign Up offer
                                {offer.offer && (
                                    <ChevronIcon
                                        color = "default"
                                        size = "small"
                                        className = {classnames(
                                            styles['ba-item__buttons-offer-button-svg'],
                                            {
                                                [styles[
                                                    'ba-item__buttons-offer-button-svg--opened']]:
                                                    selectedOffer === name,
                                            },
                                        )}
                                    />
                                )}
                            </Button>
                        )}
                    </div>
                </div>
            </div>
            {selectedOffer === name && (
                <OfferDropdown
                    {...offer}
                    onClick = {onSignUpButtonClick}
                />
            )}
        </li>
    )
}

BookmakerAccountItemMobile.propTypes = {
    name: propTypes.string.isRequired,
    loginType: propTypes.string.isRequired,
    isLogged: propTypes.bool,
    isRecent: propTypes.bool,
    isMobile: propTypes.bool,
    lastLoggedInDate: propTypes.string,
    offer: propTypes.object,
    balance: propTypes.string,
    onBookmakerClick: propTypes.func,
    onOfferClicked: propTypes.func,
    username: propTypes.string,
    selectedOffer: propTypes.string,
    isPopoverShown: propTypes.bool,
    bookmakerListPosition: propTypes.number,
    location: propTypes.string,
    onSignUpButtonClick: propTypes.func,
    displayName: propTypes.string,
}
