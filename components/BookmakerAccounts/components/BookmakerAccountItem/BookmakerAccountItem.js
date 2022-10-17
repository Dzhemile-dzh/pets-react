/* eslint-disable max-len */
import { useCallback } from 'react';
import propTypes from 'prop-types';

import BookmakerAccountItemMobile from './BookmakerAccountItemMobile';
import BookmakerAccountItemDesktop from './BookmakerAccountItemDesktop';

import {
    bookmakerRegistrationTapEvent,
} from '../../../../project/segmentEvents';

export const BookmakerAccountItem = (props) => {
    const {
        bookmakerListPosition,
        displayName,
        isMobile,
        isNotLoggedIn,
        isRecent,
        location,
        offer,
        recentBookmakersCount,
        onOfferClicked,
    } = props;

    const additionalPositions = isNotLoggedIn && !isRecent ? recentBookmakersCount : 0;
    const bookmakerPosition = additionalPositions + bookmakerListPosition;

    const onSignUpButtonClick = useCallback((event) => {
        if (event) {
            event.stopPropagation();
        }

        bookmakerRegistrationTapEvent({
            location,
            bookmakerName: displayName,
            bookmakerListPosition: bookmakerPosition,
        });

        if (!offer.offer || !isMobile) {
            window.open(offer.signUpLink);
            return;
        }

        onOfferClicked(displayName);
    }, [bookmakerPosition, displayName, isMobile, location,
        offer.offer, offer.signUpLink, onOfferClicked]);

    return isMobile ? (
        <BookmakerAccountItemMobile
            {...props}
            onSignUpButtonClick = {onSignUpButtonClick}
            bookmakerListPosition = {bookmakerPosition}
        />
    ) : (
        <BookmakerAccountItemDesktop
            {...props}
            onSignUpButtonClick = {onSignUpButtonClick}
            bookmakerListPosition = {bookmakerPosition}
        />
    )
}

BookmakerAccountItem.propTypes = {
    bookmakerListPosition: propTypes.number,
    displayName: propTypes.string,
    isMobile: propTypes.bool,
    isNotLoggedIn: propTypes.bool,
    isRecent: propTypes.bool,
    location: propTypes.string,
    offer: propTypes.object,
    onOfferClicked: propTypes.func,
    recentBookmakersCount: propTypes.number,
}
