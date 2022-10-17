import React, { useMemo } from 'react';
import propTypes from 'prop-types';
import FilteredBookmakers from '../FilteredBookmakers';

export const LoggedInBookmakers = ({
    bookmakers,
    bookmakerConfiguration,
    classNames,
    title,
    onBookmakerClick,
}) => {
    const loggedBookmakers = useMemo(
        () => bookmakers
            .filter((bookmaker) => (bookmaker.isLogged)),
        [bookmakers],
    );

    return (
        <FilteredBookmakers
            bookmakers = {loggedBookmakers}
            bookmakerConfiguration = {bookmakerConfiguration}
            classNames = {classNames}
            title = {title}
            onBookmakerClick = {onBookmakerClick}
        />
    )
}

LoggedInBookmakers.propTypes = {
    bookmakers: propTypes.array.isRequired,
    classNames: propTypes.string,
    title: propTypes.string,
    bookmakerConfiguration: propTypes.object,
    onBookmakerClick: propTypes.func,
}
