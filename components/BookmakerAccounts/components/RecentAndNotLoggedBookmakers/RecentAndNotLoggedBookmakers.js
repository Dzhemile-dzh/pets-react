import React, { useMemo } from 'react';
import propTypes from 'prop-types';
import { sortBy } from 'lodash';
import FilteredBookmakers from '../FilteredBookmakers';

export const RecentAndNotLoggedBookmakers = ({
    bookmakers,
    bookmakerConfiguration,
    classNames,
    title,
    isLogged,
    location,
}) => {
    const additionalBookmakers = useMemo(() => {
        const filtered = bookmakers
            .filter((bookmaker) => (isLogged ? !bookmaker.isLogged : bookmaker.isRecent));

        return sortBy(filtered, (bookmaker) => !bookmaker.isRecent);
    }, [bookmakers, isLogged]);

    return (
        <FilteredBookmakers
            bookmakers = {additionalBookmakers}
            bookmakerConfiguration = {bookmakerConfiguration}
            classNames = {classNames}
            title = {title}
            isRecent
            isNotLoggedIn
            location = {location}
        />
    )
}

RecentAndNotLoggedBookmakers.propTypes = {
    bookmakers: propTypes.array.isRequired,
    classNames: propTypes.string,
    title: propTypes.string,
    bookmakerConfiguration: propTypes.object,
    isLogged: propTypes.bool,
    location: propTypes.string,
}
