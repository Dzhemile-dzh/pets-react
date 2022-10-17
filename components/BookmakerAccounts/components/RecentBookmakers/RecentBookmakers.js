import React, { useMemo } from 'react';
import propTypes from 'prop-types';
import FilteredBookmakers from '../FilteredBookmakers';

export const RecentBookmakers = ({
    bookmakers,
    classNames,
    title,
    loginBookmaker,
    setLoginBookmaker,
    removeLoginBookmaker,
    location,
}) => {
    const recentBookmakers = useMemo(() => {
        return bookmakers
            .filter((bookmaker) => (bookmaker.isRecent && !bookmaker.isLogged));
    }, [bookmakers]);

    return (
        <FilteredBookmakers
            bookmakers = {recentBookmakers}
            classNames = {classNames}
            title = {title}
            isRecent
            loginBookmaker = {loginBookmaker}
            setLoginBookmaker = {setLoginBookmaker}
            removeLoginBookmaker = {removeLoginBookmaker}
            location = {location}
        />
    )
}

RecentBookmakers.propTypes = {
    bookmakers: propTypes.array.isRequired,
    classNames: propTypes.string,
    title: propTypes.string,
    loginBookmaker: propTypes.string,
    setLoginBookmaker: propTypes.func,
    removeLoginBookmaker: propTypes.func,
    location: propTypes.string,
}
