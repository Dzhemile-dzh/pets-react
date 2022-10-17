import React, {
    useState, useMemo, useCallback, useEffect,
} from 'react';
import propTypes from 'prop-types';
import classnames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { Actions } from '@project/common';
import {
    BookmakerAccountsHeader,
    LoggedBookmakerItem,
    RecentBookmakers,
    NotLoggedInBookmakers,
} from './components';
import { bookmakerLoginSuccessEvent } from '../../project/segmentEvents';
import { Constants } from '../../project/constants';

import BookmakersDropdown from '../Race/components/BookmakersDropdown';

import styles from './BookmakerAccounts.module.scss';

const { BOOKMAKER_NAMES: { SKYBET } } = Constants;

export default function BookmakerAccountsDesktop({
    isLogged,
    isDropdownOpen,
    setDropdownOpen,
    setPreviousSelectedBookmaker,
    previousSelectedBookmaker,
    bookmakers,
    totalBalance,
    bookmakerConfiguration,
    isBookmakerSessionsLoading,
    location,
}) {
    const dispatch = useDispatch();

    const betHistoryUrls = useSelector((state) => state.betHistory.urls);
    const [loginBookmaker, setLoginBookmaker] = useState();

    const isSkybetLoggedIn = bookmakers
        .find((bookmaker) => bookmaker.name === SKYBET && bookmaker.isLogged);

    const removeLoginBookmaker = useCallback(
        () => setLoginBookmaker(),
        [],
    )

    useEffect(() => {
        if (loginBookmaker && !isBookmakerSessionsLoading) {
            const loggedInCurrentBookie = bookmakers
                .find((item) => item.name === loginBookmaker && item.isLogged);

            if (loggedInCurrentBookie) {
                const recentBookmakers = bookmakers
                    .filter((item) => item.isRecent)
                const nonRecentBookmakers = bookmakers
                    .filter((item) => !item.isRecent)

                const bookmakerListPosition = 1 + (
                    loggedInCurrentBookie.isRecent ?
                        recentBookmakers
                            .findIndex((item) => item.name === loggedInCurrentBookie.name) :
                        nonRecentBookmakers
                            .findIndex((item) => item.name === loggedInCurrentBookie.name) +
                            recentBookmakers.length
                );

                if (bookmakerListPosition) {
                    bookmakerLoginSuccessEvent({
                        location,
                        bookmakerName: loggedInCurrentBookie.displayName,
                        bookmakerListPosition,
                    });

                    removeLoginBookmaker()
                }
            }
        }
    }, [bookmakers, isBookmakerSessionsLoading, location, loginBookmaker, removeLoginBookmaker]);

    useEffect(() => {
        const { bookmakers: bookmakerUrls, isBetHistoryUrlLoading, error } = betHistoryUrls;

        if (isSkybetLoggedIn && !error && !bookmakerUrls[SKYBET] && !isBetHistoryUrlLoading) {
            dispatch(Actions.getBookmakerBetHistoryUrl(SKYBET));
        }
    }, [betHistoryUrls, bookmakers, dispatch, isSkybetLoggedIn])

    const getBetHistoryUrl = useCallback((bookmaker) => {
        if (bookmaker === SKYBET) {
            return betHistoryUrls.bookmakers[bookmaker];
        }

        return '';
    }, [betHistoryUrls]);

    const loggedBookmakers = useMemo(() => {
        const output = bookmakers
            .filter((bookmaker) => (bookmaker.isLogged));

        return output.length > 0 && (
            <div
                className = {styles['bookmaker-accounts__logged-bookmakers']}
                data-testid = "Container__BookmakerAccountsLogged"
            >
                <ul
                    className = {styles['bookmaker-accounts__bookies-logged']}
                    data-testid = "List__BookmakerAccountsLoggedBookies"
                >
                    {output.map((bookmaker) => (
                        <LoggedBookmakerItem
                            key = {bookmaker.name}
                            {...bookmaker}
                            skybetBetHistoryUrl = {getBetHistoryUrl(bookmaker.name)}
                        />
                    ))}
                </ul>
            </div>
        )
    }, [bookmakers, getBetHistoryUrl])

    return (
        <>
            <BookmakerAccountsHeader
                headerTitle = "My bookmakers"
                isLogged = {isLogged}
                bookmakers = {bookmakers}
                totalBalance = {totalBalance}
            />
            <div
                className = {styles['bookmaker-accounts__wrapper']}
                data-testid = "Container__BookmakerAccountsWrapper"
            >
                <div
                    className = {classnames(
                        styles['bookmaker-accounts__odds'],
                        {
                            [styles['bookmaker-accounts__odds--not-logged']]: !isLogged,
                        },
                    )}
                    data-testid = "Container__BookmakerAccountsOdds"
                >
                    <span
                        className = {styles['bookmaker-accounts__odds-text']}
                        data-testid = "Text__BookmakerAccountsOdds"
                    >
                        My selected odds
                    </span>
                    <BookmakersDropdown
                        isDropdownOpen = {isDropdownOpen}
                        setDropdownOpen = {setDropdownOpen}
                        setPreviousSelectedBookmaker = {setPreviousSelectedBookmaker}
                        previousSelectedBookmaker = {previousSelectedBookmaker}
                        isOnBookmakersPage
                        bookmakers = {bookmakers}
                    />
                    <span
                        className = {styles['bookmaker-accounts__odds-prices-text']}
                        data-testid = "Text__BookmakerAccountsOddsPrices"
                    >
                        These prices will show on all racecards
                    </span>
                </div>
                {isLogged && loggedBookmakers}
                <RecentBookmakers
                    bookmakers = {bookmakers}
                    classNames = "bookmaker-accounts"
                    title = "Recent Bookmakers"
                    loginBookmaker = {loginBookmaker}
                    setLoginBookmaker = {setLoginBookmaker}
                    removeLoginBookmaker = {removeLoginBookmaker}
                    location = {location}
                />
                <NotLoggedInBookmakers
                    bookmakers = {bookmakers}
                    classNames = "bookmaker-accounts"
                    title = "ADD BOOKMAKER ACCOUNT"
                    bookmakerConfiguration = {bookmakerConfiguration}
                    isPopoverShown
                    loginBookmaker = {loginBookmaker}
                    setLoginBookmaker = {setLoginBookmaker}
                    removeLoginBookmaker = {removeLoginBookmaker}
                    location = {location}
                />
            </div>
        </>
    )
}

BookmakerAccountsDesktop.displayName = 'BookmakerAccountsDesktop';

BookmakerAccountsDesktop.propTypes = {
    bookmakers: propTypes.array.isRequired,
    bookmakerConfiguration: propTypes.object,
    isLogged: propTypes.bool.isRequired,
    setPreviousSelectedBookmaker: propTypes.func,
    previousSelectedBookmaker: propTypes.object,
    isDropdownOpen: propTypes.bool,
    setDropdownOpen: propTypes.func,
    totalBalance: propTypes.string,
    location: propTypes.string,
    isBookmakerSessionsLoading: propTypes.bool,
    getBetHistoryUrl: propTypes.func,
    betHistoryUrls: propTypes.object,
};
