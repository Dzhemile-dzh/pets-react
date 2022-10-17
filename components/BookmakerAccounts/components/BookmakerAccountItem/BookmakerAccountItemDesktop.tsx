/* eslint-disable max-len */
import React, { useCallback, useMemo, useState } from 'react';
import classnames from 'classnames';
import { ChevronIcon } from '../../../base/Icons/ChevronIcon';
import { InfoBlackIcon } from '../../../base/Icons/InfoBlackIcon';
import BookmakerThumb from '../../../Betslip/components/BookmakerThumb';
import OfferDropdown from './components/OfferDropdown';
import OfferPopover from './components/OfferPopover';
import Button from '../../../base/inputs/Button';
import Tooltip from '../../../base/Tooltip';
import LoginFormBookmakers from '../LoginFormBookmakers';
import { openPopUpWindow } from '../../../../project/utils/helpers';
import { bookmakerLoginOpenTapEvent } from '../../../../project/segmentEvents';
import { convertToPascalCase } from '../../../../project/utils/formatUtils';

import styles from './BookmakerAccountItem.module.scss';

export default function BookmakerAccountItemDesktop({
    name,
    displayName,
    isRecent,
    lastLoggedInDate,
    offer,
    onBookmakerClick,
    selectedOffer,
    isPopoverShown,
    loginType,
    loginBookmaker,
    setLoginBookmaker,
    removeLoginBookmaker,
    bookmakerListPosition,
    location,
    onSignUpButtonClick,
}) : React.ReactElement {
    const [isPopoverOpen, setIsPopoverOpen] = useState(null);

    const toggleOfferPopover = useCallback(() => {
        setIsPopoverOpen(!isPopoverOpen);
    }, [isPopoverOpen]);

    const loginForm = useMemo(() => (
        <LoginFormBookmakers
            name = {name}
            onClose = {removeLoginBookmaker}
            loginType = {loginType}
            onSuccess = {removeLoginBookmaker}
            bookmakerListPosition = {bookmakerListPosition}
            location = {location}
        />
    ), [name, removeLoginBookmaker, loginType, bookmakerListPosition, location]);

    const classes = useMemo(() => ({
        tooltip: classnames(
            styles['ba-item__login-wrapper-tooltip'],
            {
                [styles['ba-item__login-wrapper-tooltip--iframe']]: loginType === 'iframe',
            },
            styles[`ba-item__login-wrapper-tooltip--${name}`],
        ),
        arrow: styles['ba-item__login-wrapper-arrow'],
        popperArrow: styles['ba-item__login-wrapper-arrow--popper-arrow-right'],
    }
    ), [loginType, name])

    const onLogin = useCallback((event) => {
        event.stopPropagation();

        bookmakerLoginOpenTapEvent({
            location,
            bookmakerName: displayName,
            bookmakerListPosition,
        });

        setLoginBookmaker(name)

        if (loginType === 'window') {
            openPopUpWindow('WindowLogin');

            // By returning false, we are triggering a window popup
            // It doesn't work on all browsers
            // For example for mobile/tablet devices and
            // Safari on all devices
            // It will open the new window in a new tab
            return false;
        }
    }, [bookmakerListPosition, displayName, location, loginType, name, setLoginBookmaker]);
    return (
        <li
            className = {styles['ba-item']}
            onClick = {onBookmakerClick}
            data-testid = {displayName && `Container__BookmakerAccountItem${convertToPascalCase(displayName)}`}
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
                    {!isRecent && offer.offer && (
                        <div
                            className = {styles['ba-item__offer-container']}
                            data-testid = "Container__BookmakerAccountItemOfferContainer"
                        >
                            <div
                                className = {styles['ba-item__offer']}
                                data-testid = "Container__BookmakerAccountItemOffer"
                            >
                                {isPopoverShown && (
                                    <div
                                        className = {styles['ba-item__offer-info-container']}
                                        onClick = {toggleOfferPopover}
                                        data-testid = "Container__BookmakerAccountItemOfferInfo"
                                    >
                                        <InfoBlackIcon
                                            color = "default"
                                            size = "small"
                                            className = {styles['ba-item__offer-info-svg']}
                                        />
                                    </div>
                                )}
                                {isPopoverOpen && (
                                    <OfferPopover
                                        {...offer}
                                        setIsPopoverOpen = {setIsPopoverOpen}
                                    />
                                )}
                                <span>
                                    {offer.offer}
                                </span>
                                {!isPopoverShown && (
                                    <ChevronIcon
                                        size = "xs"
                                        color = "primary"
                                        className = {styles['ba-item__offer-chevron-svg']}
                                    />
                                )}
                            </div>
                        </div>
                    )}
                    {isRecent && lastLoggedInDate && (
                        <div
                            className = {styles['ba-item__last-logged']}
                            data-testid = "Container__BookmakerAccountItemLastLogin"
                        >
                            <span
                                className = {styles['ba-item__last-logged-text']}
                                data-testid = "Text__BookmakerAccountItemLastLogin"
                            >
                                {`Last logged in: ${lastLoggedInDate}`}
                            </span>
                        </div>
                    )}
                    <div
                        className = {styles['ba-item__buttons']}
                        data-testid = "Container__BookmakerAccountItemButtons"
                    >
                        <Tooltip
                            title = {loginForm}
                            arrow
                            open = {(loginBookmaker === name)}
                            placement = "right"
                            classes = {classes}
                        >
                            <Button
                                styleType = {loginBookmaker === name ? 'secondary' : 'tertiary'}
                                className = {styles['ba-item__buttons-login-button']}
                                onClick = {onLogin}
                                name = {name}
                                data-testid = "Button__BookmakerAccountItemLogin"
                            >
                                Log in
                            </Button>
                        </Tooltip>
                        {!isRecent && (
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
