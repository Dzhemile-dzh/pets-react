import {
    useState, useCallback, useEffect, ReactElement,
} from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';

import RaceIndexHeader from '../RaceCards/components/RaceIndexHeader';
import {
    MyBookmakersButtons,
    MyRecentBets,
    RacingPostProfile,
} from './components';
import { EllipsisIcon } from '../base/Icons/EllipsisIcon';
import {
    MyBookmakerAccountsBalance,
    RecentBookmakers,
    NotLoggedInBookmakers,
} from '../BookmakerAccounts/components';
import BookmakersDropdown from '../Race/components/BookmakersDropdown';
import { bookmakerLoginSuccessEvent } from '../../project/segmentEvents';
import {
    BookmakerAccountProviderInterface,
    StateInterface,
} from '../interfaces';

import styles from './MyRacingPost.module.scss';

const headerTitle = 'My racing post';

export interface MyRacingPostDesktopInterface extends Partial<BookmakerAccountProviderInterface>{
    isZeroBalance: boolean;
    isLogged: boolean;
    isDropdownOpen: boolean;
    setDropdownOpen: (value: boolean) => void;
    previousSelectedBookmaker: Record<string, unknown>,
    setPreviousSelectedBookmaker: (value) => void,
    location: string;
}

export default function MyRacingPostDesktop({
    totalBalance,
    bookmakers,
    isZeroBalance,
    isLogged,
    isDropdownOpen,
    setDropdownOpen,
    previousSelectedBookmaker,
    setPreviousSelectedBookmaker,
    location,
}: MyRacingPostDesktopInterface): ReactElement {
    const [loginBookmaker, setLoginBookmaker] = useState();

    const bookmakerConfiguration = useSelector(
        (state: StateInterface) => state.bookmakerConfiguration.bookmakerConfigs,
    )

    const isBookmakerSessionsLoading = useSelector(
        (state: StateInterface) => state.bookmakerSessions.isBookmakerSessionsLoading,
    )

    const unsettledBetHistory = useSelector((state: StateInterface) => state.betHistory.unsettled)

    const removeLoginBookmaker = useCallback(() => setLoginBookmaker(null), [setLoginBookmaker]);

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

    return (
        <>
            <RaceIndexHeader
                headerTitle = {headerTitle}
            />
            <div
                className = {styles['my-racing-post__wrapper']}
                data-testid = "Container__MyRacingPostWrapper"
            >
                <div
                    className = {styles['my-racing-post__content']}
                    data-testid = "Container__MyRacingPostContent"
                >
                    <div
                        className = {styles['my-racing-post__odds']}
                        data-testid = "Container__MyRacingPostOdds"
                    >
                        <span
                            className = {styles['my-racing-post__odds-text']}
                            data-testid = "Text__MyRacingPostSelectedOdds"
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
                            className = {styles['my-racing-post__odds-prices-text']}
                            data-testid = "Text__MyRacingPostOddsPrices"
                        >
                            These prices will show on all racecards
                        </span>
                    </div>
                    <div
                        className = {styles['my-racing-post__my-bookmakers']}
                        data-testid = "Container__MyRacingPostBookmakers"
                    >
                        <div
                            className = {styles['my-racing-post__my-bookmakers-title']}
                            data-testid = "Container__MyRacingPostBookmakersTitle"
                        >
                            <span
                                className = {styles['my-racing-post__my-bookmakers-title-text']}
                                data-testid = "Text__MyRacingPostBookmakersTitle"
                            >
                                My bookmakers
                            </span>
                            <Link
                                href = "/my-bookmakers"
                            >
                                <a
                                    className = {styles['my-racing-post__my-bookmakers-title-link']}
                                    data-testid = "Link__MyRacingPostBookmakersTitle"
                                >
                                    <div
                                        className =
                                            {styles['my-racing-post__my-bookmakers-title-button']}
                                    >
                                        <EllipsisIcon
                                            size = "large"
                                        />
                                    </div>
                                </a>

                            </Link>
                        </div>
                        {
                            isLogged ? (
                                <div
                                    className =
                                        {styles['my-racing-post__my-bookmakers-wrapper-logged-in']}
                                    data-testid = "Container__MyRacingPostMyBookmakersLoggedWrapper"
                                >
                                    <MyBookmakerAccountsBalance
                                        bookmakers = {bookmakers}
                                        totalBalance = {totalBalance}
                                        mbaListClassName = "mba-list__my-racing-post"
                                    />
                                    <div
                                        className = {styles[
                                            'my-racing-post__my-bookmakers-buttons']}
                                        data-testid = "Container__MyRacingPostMyBookmakersButtons"
                                    >
                                        <MyBookmakersButtons
                                            isZeroBalance = {isZeroBalance}
                                            isAddBtnShown = {false}
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div
                                    className = {styles['my-racing-post__my-bookmakers-wrapper']}
                                    data-testid = "Container__MyRacingPostMyBookmakersWrapper"
                                >
                                    <span
                                        className =
                                            {styles['my-racing-post__my-bookmakers-log-in-text']}
                                        data-testid = "Text__MyRacingPostBookmakersLogIn"
                                    >
                                        Log in to your bookmaker or sign up
                                        below to see your account details.
                                    </span>
                                    <RecentBookmakers
                                        bookmakers = {bookmakers}
                                        classNames = "my-racing-post"
                                        title = "Recent Bookmakers"
                                        loginBookmaker = {loginBookmaker}
                                        setLoginBookmaker = {setLoginBookmaker}
                                        removeLoginBookmaker = {removeLoginBookmaker}
                                        location = {location}
                                    />
                                    <NotLoggedInBookmakers
                                        bookmakers = {bookmakers}
                                        bookmakerConfiguration = {bookmakerConfiguration}
                                        classNames = "my-racing-post"
                                        title = "Add Bookmakers"
                                        loginBookmaker = {loginBookmaker}
                                        setLoginBookmaker = {setLoginBookmaker}
                                        removeLoginBookmaker = {removeLoginBookmaker}
                                        location = {location}
                                    />
                                </div>
                            )
                        }
                    </div>
                    {isLogged && (
                        <MyRecentBets
                            unsettledBetHistory = {unsettledBetHistory}
                        />
                    )}
                </div>
                <div
                    className = {styles['racing-post-profile-container']}
                    data-testid = "Container__MyRacingPostProfileContainer"
                >
                    <RacingPostProfile />
                </div>
            </div>
        </>
    )
}

MyRacingPostDesktop.displayName = 'MyRacingPostDesktop';
