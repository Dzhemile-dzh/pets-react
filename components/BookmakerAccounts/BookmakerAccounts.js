import React, { useState } from 'react';
import propTypes from 'prop-types';

import { withBookmakerAccounts, withBetSlip } from '../../store/providers';
import BookmakerAccountsDesktop from './BookmakerAccountsDesktop';
import BookmakerAccountsMobile from './BookmakerAccountsMobile';

import LoginLayoutProvider from '../base/LoginLayoutProvider/index.tsx';

import { Constants } from '../../project/constants';
import { useBreakPoint } from '../contexts/BreakPointContext';

import styles from './BookmakerAccounts.module.scss';

const { ANALYTICS_LOCATIONS } = Constants;

export const BookmakerAccounts = (props) => {
    const {
        bookmakers,
    } = props;

    const { isMobile } = useBreakPoint();

    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [previousSelectedBookmaker, setPreviousSelectedBookmaker] = useState(null);
    const [currentBookmaker, setCurrentBookmaker] = useState();

    const isLogged = bookmakers.some((bookmaker) => bookmaker.isLogged);

    const handleBookmakerClick = (bookmakerData) => {
        // this feature is only for logged in bookmakers
        if (!bookmakerData.isLogged) {
            return;
        }

        setCurrentBookmaker(bookmakerData);
    }

    const handleBackButtonClick = () => {
        setCurrentBookmaker(null);
    }

    return (
        <LoginLayoutProvider>
            <main
                className = {styles['bookmaker-accounts__container']}
                data-testid = "Container__BookmakerAccounts"
            >
                {isMobile ? (
                    <BookmakerAccountsMobile
                        isLogged = {isLogged}
                        currentBookmaker = {currentBookmaker}
                        onBackButtonClick = {handleBackButtonClick}
                        onBookmakerClick = {handleBookmakerClick}
                        setPreviousSelectedBookmaker = {setPreviousSelectedBookmaker}
                        previousSelectedBookmaker = {previousSelectedBookmaker}
                        location = {ANALYTICS_LOCATIONS.MY_BOOKMAKERS}
                        {...props}
                    />
                ) : (
                    <BookmakerAccountsDesktop
                        isLogged = {isLogged}
                        setDropdownOpen = {setDropdownOpen}
                        isDropdownOpen = {isDropdownOpen}
                        setPreviousSelectedBookmaker = {setPreviousSelectedBookmaker}
                        previousSelectedBookmaker = {previousSelectedBookmaker}
                        location = {ANALYTICS_LOCATIONS.MY_BOOKMAKERS}
                        {...props}
                    />
                )}
            </main>
        </LoginLayoutProvider>
    )
}

BookmakerAccounts.propTypes = {
    bookmakers: propTypes.array.isRequired,
    bookmakerConfiguration: propTypes.object,
    totalBalance: propTypes.string,
}

const BookmakerAccountsWrapperWithBetSlip = withBetSlip(
    BookmakerAccounts,
    undefined,
    null,
)

export const BookmakerAccountsWith = withBookmakerAccounts(
    BookmakerAccountsWrapperWithBetSlip,
    undefined,
    null,
)
