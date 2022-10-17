import React from 'react';
import propTypes from 'prop-types';
import { useSelector } from 'react-redux';

import {
    MyBookmakersButtons,
    MyRecentBets,
} from './components/index';
import {
    MyBookmakerAccountsBalance,
    BookmakerAccountsHeaderMobile,
    RecentBookmakers,
    LoggedInBookmakers,
    NotLoggedInBookmakers,
    RecentAndNotLoggedBookmakers,
} from '../BookmakerAccounts/components/index';
import Button from '../base/inputs/Button/index.tsx';
import BookmakersDropdown from '../Race/components/BookmakersDropdown';

import styles from './MyRacingPost.module.scss';

export default function MyRacingPostMobile({
    isLogged,
    totalBalance,
    bookmakers,
    isZeroBalance,
    isDropdownOpen,
    setDropdownOpen,
    previousSelectedBookmaker,
    setPreviousSelectedBookmaker,
    location,
}) {
    const unsettledBetHistory = useSelector((state) => state.betHistory.unsettled)
    const bookmakerConfiguration = useSelector(
        (state) => state.bookmakerConfiguration.bookmakerConfigs,
    )
    return (
        <div
            className = {styles['my-racing-post__wrapper']}
            data-testid = "Container__MyRacingPostWrapper"
        >
            {isLogged ? (
                <>
                    <BookmakerAccountsHeaderMobile
                        headerTitle = "Account"
                        totalBalance = {totalBalance}
                    />

                    <div
                        className = {styles['my-racing-post__my-bookmakers-wrapper-logged-in']}
                        data-testid = "Container__MyRacingPostMyBookmakersLoggedInWrapper"
                    >
                        <div
                            className = {styles['my-racing-post__my-bookmakers-accounts']}
                            data-testid = "Container__MyRacingPostMyBookmakersAccounts"
                        >
                            <MyBookmakerAccountsBalance
                                bookmakers = {bookmakers}
                                totalBalance = {totalBalance}
                            />
                            <div
                                className = {styles['my-racing-post__my-bookmakers-buttons']}
                                data-testid = "Container__MyRacingPostMyBookmakersButtons"
                            >
                                <MyBookmakersButtons
                                    isZeroBalance = {isZeroBalance}
                                />
                            </div>
                        </div>
                        <div
                            className = {styles['my-racing-post__my-bookmakers-ba-log-in']}
                            data-testid = "Container__MyRacingPostMyBookmakersLogIn"
                        >
                            <span
                                className =
                                    {styles['my-racing-post__my-bookmakers-ba-log-in-text']}
                                data-testid = "Text__MyRacingPostMyBookmakersLogIn"
                            >
                                Can't see all your bookmaker accounts?
                            </span>
                            <Button
                                className = {styles['my-racing-post__my-bookmakers-ba-log-in-btn']}
                                styleType = "tertiary"
                                data-testid = "Button__MyRacingPostMyBookmakersLogIn"
                            >
                                Log in
                            </Button>
                        </div>
                        <MyRecentBets
                            unsettledBetHistory = {unsettledBetHistory}
                        />
                        <div
                            className = {styles['my-racing-post__odds']}
                            data-testid = "Container__MyRacingPostOdds"
                        >
                            <BookmakersDropdown
                                isDropdownOpen = {isDropdownOpen}
                                setDropdownOpen = {setDropdownOpen}
                                setPreviousSelectedBookmaker = {setPreviousSelectedBookmaker}
                                previousSelectedBookmaker = {previousSelectedBookmaker}
                                oddsText = "Odds Displayed"
                                isOddsInner
                                isOnBookmakersPage
                                bookmakers = {bookmakers}
                            />
                        </div>
                        <div
                            className = {styles['my-racing-post__all-bookmakers-wrapper']}
                            data-testid = "Container__MyRacingPostAllBookmakersWrapper"
                        >
                            <LoggedInBookmakers
                                bookmakers = {bookmakers}
                                bookmakerConfiguration = {bookmakerConfiguration}
                                classNames = "my-racing-post"
                                title = "My Bookmakers"
                            />
                            <RecentAndNotLoggedBookmakers
                                bookmakers = {bookmakers}
                                bookmakerConfiguration = {bookmakerConfiguration}
                                classNames = "my-racing-post"
                                title = "Recent and additional bookmakers"
                                isLogged = {isLogged}
                                location = {location}
                            />
                        </div>
                    </div>
                </>
            ) : (
                <div
                    className = {styles['my-racing-post__my-bookmakers-wrapper']}
                    data-testid = "Container__MyRacingPostMyBookmakersWrapper"
                >
                    <RecentBookmakers
                        bookmakers = {bookmakers}
                        classNames = "my-racing-post"
                        title = "Recent Bookmakers"
                        location = {location}
                    />
                    <NotLoggedInBookmakers
                        bookmakers = {bookmakers}
                        bookmakerConfiguration = {bookmakerConfiguration}
                        classNames = "my-racing-post"
                        title = "Add Bookmakers"
                        location = {location}
                    />
                </div>
            )}
        </div>
    )
}

MyRacingPostMobile.displayName = 'MyRacingPostMobile';

MyRacingPostMobile.propTypes = {
    bookmakers: propTypes.array.isRequired,
    totalBalance: propTypes.string,
    isLogged: propTypes.bool.isRequired,
    isZeroBalance: propTypes.bool.isRequired,
    setPreviousSelectedBookmaker: propTypes.func,
    previousSelectedBookmaker: propTypes.object,
    isDropdownOpen: propTypes.bool,
    setDropdownOpen: propTypes.func,
    location: propTypes.string,
}
