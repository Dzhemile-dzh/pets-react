import React from 'react';
import propTypes from 'prop-types';
import {
    LoggedInBookmakers,
    BookmakerAccountsHeaderMobile,
    NotLoggedInBookmakers,
    RecentAndNotLoggedBookmakers,
    RecentBookmakers,
    BookmakerAccountPage,
} from './components'

import styles from './BookmakerAccounts.module.scss';

export default function BookmakerAccountsMobile({
    currentBookmaker,
    onBackButtonClick,
    clearBetslip,
    setPreviousSelectedBookmaker,
    previousSelectedBookmaker,
    selectedBookmaker,
    setSelectedBookmaker,
    bookmakers,
    isLogged,
    onBookmakerClick,
    bookmakerConfiguration,
    bookmakerLogout,
    urlLogoutSuccess,
    location,
    betHistoryUrls,
    getBookmakerBetHistoryUrl,
}) {
    return (
        <div
            className = {styles['bookmaker-accounts__wrapper']}
            data-testid = "Container__BookmakerAccountsWrapper"
        >
            {currentBookmaker ? (
                <BookmakerAccountPage
                    clearBetslip = {clearBetslip}
                    setPreviousSelectedBookmaker = {setPreviousSelectedBookmaker}
                    previousSelectedBookmaker = {previousSelectedBookmaker}
                    selectedBookmaker = {selectedBookmaker}
                    setSelectedBookmaker = {setSelectedBookmaker}
                    bookmaker = {currentBookmaker}
                    onBackButtonClick = {onBackButtonClick}
                    bookmakers = {bookmakers}
                    betHistoryUrls = {betHistoryUrls}
                    getBookmakerBetHistoryUrl = {getBookmakerBetHistoryUrl}
                />
            ) : (
                <>
                    <BookmakerAccountsHeaderMobile
                        headerTitle = "MY ACCOUNT"
                    />
                    <div
                        className = {styles['bookmaker-accounts__bookies-wrapper']}
                        data-testid = "Container__BookmakerAccountsBookiesWrapper"
                    >
                        {isLogged ? (
                            <>
                                <LoggedInBookmakers
                                    bookmakers = {bookmakers}
                                    classNames = "bookmaker-accounts"
                                    title = "My Bookmakers"
                                    bookmakerConfiguration = {bookmakerConfiguration}
                                    onBookmakerClick = {onBookmakerClick}
                                    bookmakerLogout = {bookmakerLogout}
                                    urlLogoutSuccess = {urlLogoutSuccess}
                                />
                                <RecentAndNotLoggedBookmakers
                                    bookmakers = {bookmakers}
                                    classNames = "bookmaker-accounts"
                                    title = "Recent and additional bookmakers"
                                    isLogged = {isLogged}
                                    bookmakerConfiguration = {bookmakerConfiguration}
                                    location = {location}
                                />
                            </>
                        ) : (
                            <>
                                <RecentBookmakers
                                    bookmakers = {bookmakers}
                                    classNames = "bookmaker-accounts"
                                    title = "Recent bookmakers"
                                    bookmakerConfiguration = {bookmakerConfiguration}
                                    location = {location}
                                />
                                <NotLoggedInBookmakers
                                    bookmakers = {bookmakers}
                                    classNames = "bookmaker-accounts"
                                    title = "Add Bookmakers"
                                    bookmakerConfiguration = {bookmakerConfiguration}
                                    location = {location}
                                />
                            </>
                        )}
                    </div>
                </>
            )}
        </div>
    )
}

BookmakerAccountsMobile.displayName = 'BookmakerAccountsMobile';

BookmakerAccountsMobile.propTypes = {
    bookmakers: propTypes.array.isRequired,
    isLogged: propTypes.bool.isRequired,
    currentBookmaker: propTypes.object,
    onBackButtonClick: propTypes.func.isRequired,
    onBookmakerClick: propTypes.func.isRequired,
    bookmakerConfiguration: propTypes.object,
    clearBetslip: propTypes.func,
    setPreviousSelectedBookmaker: propTypes.func,
    previousSelectedBookmaker: propTypes.object,
    selectedBookmaker: propTypes.string,
    setSelectedBookmaker: propTypes.func,
    bookmakerLogout: propTypes.func,
    urlLogoutSuccess: propTypes.func,
    location: propTypes.string,
    getBookmakerBetHistoryUrl: propTypes.func,
    betHistoryUrls: propTypes.object,
};
