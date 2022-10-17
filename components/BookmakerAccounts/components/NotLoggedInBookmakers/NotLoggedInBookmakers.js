import React, { useMemo } from 'react';
import propTypes from 'prop-types';
import FilteredBookmakers from '../FilteredBookmakers';

export const NotLoggedInBookmakers = ({
    bookmakers,
    bookmakerConfiguration,
    classNames,
    title,
    isPopoverShown,
    loginBookmaker,
    setLoginBookmaker,
    removeLoginBookmaker,
    location,
}) => {
    const notLoggedBookmakers = useMemo(() => {
        return bookmakers
            .filter((bookmaker) => (!bookmaker.isRecent));
    }, [bookmakers])

    return (
        <FilteredBookmakers
            bookmakers = {notLoggedBookmakers}
            bookmakerConfiguration = {bookmakerConfiguration}
            classNames = {classNames}
            title = {title}
            isPopoverShown = {isPopoverShown}
            loginBookmaker = {loginBookmaker}
            setLoginBookmaker = {setLoginBookmaker}
            removeLoginBookmaker = {removeLoginBookmaker}
            location = {location}
            isNotLoggedIn
            recentBookmakersCount = {bookmakers
                .filter((bookmaker) => (bookmaker.isRecent && !bookmaker.isLogged)).length}
        />
    )
}

NotLoggedInBookmakers.propTypes = {
    bookmakers: propTypes.array.isRequired,
    classNames: propTypes.string,
    title: propTypes.string,
    bookmakerConfiguration: propTypes.object,
    isPopoverShown: propTypes.bool,
    loginBookmaker: propTypes.string,
    setLoginBookmaker: propTypes.func,
    removeLoginBookmaker: propTypes.func,
    location: propTypes.string,
}
