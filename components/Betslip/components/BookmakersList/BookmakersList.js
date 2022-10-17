import React, { useEffect, useCallback, useMemo } from 'react';
import propTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import { withAllBookmakers } from '../../../../store/providers';
import { setAppCookie } from '../../../../project/utils/helpers';
import { Constants } from '../../../../project/constants';
import { Actions } from '../../../../project/common';

import { useBreakPoint } from '../../../contexts/BreakPointContext';

import BookmakerItem from '../BookmakerItem';
import BestOddsIcon from '../BestOddsIcon';

import styles from './BookmakersList.module.scss';

const findFirstBkmWithOfferNotLogged = (
    bookmakers,
    bookmakerConfiguration,
    device,
    bookmakerConfig,
) => {
    return bookmakers.find((bookmaker) => {
        return !bookmaker.isLoggedIn &&
            bookmakerConfiguration?.[bookmakerConfig.name]?.[device]?.offer
    }) || {};
}

export const BookmakersList = ({
    allBookmakers,
    focusBookmaker,
    focusedBookmaker,
    showBookmakersList,
    toggleBookmakersList,
    openModal,
    selectedBookmaker,
    setBookmakersWithFreeBets,
}) => {
    const { isMobile } = useBreakPoint();
    const dispatch = useDispatch();
    const bookmakersDetails = useSelector((state) => state.bookmakersDetails);
    const bookmakerConfiguration = useSelector(
        (state) => state.bookmakerConfiguration.bookmakerConfigs,
    );

    const device = isMobile ? 'mobile' : 'desktop';

    useEffect(() => {
        dispatch(Actions.subscribeAllBookmakers(isMobile));
    }, [dispatch, isMobile]);

    useEffect(() => {
        const bookmakersWithFreeBets = allBookmakers
            .filter((bookmaker) => bookmaker.freeBets.length > 0)
            .map((bookmaker) => bookmaker.feed);

        setBookmakersWithFreeBets(bookmakersWithFreeBets);
    }, [allBookmakers, setBookmakersWithFreeBets]);

    const bookmakersData = useMemo(
        () => {
            const rawBookmaker = findFirstBkmWithOfferNotLogged(
                allBookmakers,
                bookmakerConfiguration,
                device,
                bookmakersDetails.find(
                    (bookmaker) => selectedBookmaker === bookmaker.feed,
                ) || {},
            );

            const firstWithOffer = bookmakersDetails.find(
                (bookmaker) => rawBookmaker.feed === bookmaker.feed,
            ) || {};

            return allBookmakers
                .map((bookmaker) => {
                    const bookmakerConfig = bookmakersDetails.find(
                        (bkmr) => bookmaker.feed === bkmr.feed,
                    );

                    const stubsConfiguration =
                    bookmakerConfiguration?.[bookmakerConfig.name]?.[device] || {};

                    const shouldShowNewCustomerOffer = bookmakerConfig.name === firstWithOffer.name;

                    const { displayData } = bookmaker;

                    return {
                        userBalance: bookmaker.userBalance,
                        isLoggedIn: bookmaker.isLoggedIn || false,
                        loginUrl: bookmaker.loginUrl || '',
                        logoutUrl: bookmaker.logoutUrl || '',
                        forgottenUrl: stubsConfiguration.forgottenUrl || '',
                        // every sign up button has a url for tracking which button
                        // has been clicked. For the "claim this offer" we use the 2nd link.
                        signUpUrl: stubsConfiguration.signUpLink2 || '',
                        bookmakerName: bookmakerConfig.name,
                        loginType: bookmakerConfig.loginType,
                        isBog: displayData?.odd !== 'SP' ?
                            (displayData?.isBog || false) : false,
                        odd: displayData ? displayData.odd : '',
                        isWinOnly: displayData?.eachWayTerms ?
                            displayData.eachWayTerms.isWinOnly : true,
                        payOut: displayData?.eachWayTerms ?
                            displayData.eachWayTerms.payOut : '',
                        places: displayData?.eachWayTerms ?
                            displayData.eachWayTerms.places : '',
                        isBookmakerFocused: focusedBookmaker === bookmakerConfig.name,
                        offer: stubsConfiguration.offer || '',
                        offerDescription: stubsConfiguration.tsAndCs || '',
                        isOfferShownOnce: stubsConfiguration.isOfferShownOnce || false,
                        shouldShowNewCustomerOffer,
                        freeBetBalance: bookmaker.freeBetBalance,
                        freeBets: bookmaker.freeBets,
                    };
                });
        },
        [
            allBookmakers,
            bookmakerConfiguration,
            bookmakersDetails,
            device,
            focusedBookmaker,
            selectedBookmaker,
        ],
    );

    const selectBetslipBookmaker = useCallback((bookmaker) => {
        const { feed } = bookmakersDetails.find(
            (bkmr) => bookmaker === bkmr.name,
        );
        const isLoggedInBookmaker = allBookmakers.find((item) => (
            item.feed === feed && item.isLoggedIn
        ));

        if (!isLoggedInBookmaker) {
            return focusBookmaker(bookmaker);
        }

        dispatch(Actions.updateBetSelectionsAndSelectBookmaker(feed));

        setAppCookie(Constants.SELECTED_BOOKMAKER_COOKIE, feed);

        openModal(feed);

        focusBookmaker();

        if (showBookmakersList) {
            toggleBookmakersList();
        }
    }, [
        allBookmakers,
        bookmakersDetails,
        dispatch,
        focusBookmaker,
        openModal,
        showBookmakersList,
        toggleBookmakersList,
    ]);

    const bookmakers = useMemo(() => {
        return (
            <ul
                className = {styles['bs-bookmakers-list__bookies']}
                data-testid = "List__BookmakersListBookies"
            >
                {bookmakersData.map((bookmaker, index) => {
                    const { displayName, feed } = bookmakersDetails.find(
                        (bkmr) => bookmaker.bookmakerName === bkmr.name,
                    );

                    const isBookmakerSelected = selectedBookmaker === feed;

                    return (
                        <BookmakerItem
                            clickHandler = {selectBetslipBookmaker}
                            key = {bookmaker.bookmakerName}
                            bookmakerDisplayName = {displayName}
                            bookmakerListPosition = {index + 1}
                            isBookmakerSelected = {isBookmakerSelected}
                            bookmakerSignupLink = {
                                bookmakerConfiguration
                                    ?.[bookmaker.bookmakerName]
                                    ?.[device]
                                    ?.signUpLink2
                            }
                            {...bookmaker}
                        />
                    )
                })}
            </ul>
        )
    }, [bookmakersData,
        bookmakersDetails,
        selectedBookmaker,
        selectBetslipBookmaker,
        bookmakerConfiguration, device]);

    return (
        <div
            className = {styles['bs-bookmakers-list']}
            data-testid = "Container__BookmakersList"
        >
            <div
                className = {styles['bs-bookmakers-list__choose-label']}
                data-testid = "Container__BookmakersListChooseLabel"
            >
                <span
                    className = {styles['bs-bookmakers-list__choose-label-text']}
                    data-testid = "Text__BookmakersListChooseLabel"
                >
                    Choose a bookmaker to place your bet
                </span>
            </div>
            <div
                className = {styles['bs-bookmakers-list__best-odds-label']}
                data-testid = "Container__BookmakersListBestOddsLabel"
            >
                <BestOddsIcon />
                <span
                    className = {styles['bs-bookmakers-list__best-odds-text']}
                    data-testid = "Text__BookmakersListBestOddsLabel"
                >
                    Indicates best odds guaranteed
                </span>
            </div>
            {bookmakers}
        </div>
    );
}

BookmakersList.propTypes = {
    allBookmakers: propTypes.array.isRequired,
    focusBookmaker: propTypes.func.isRequired,
    focusedBookmaker: propTypes.string.isRequired,
    showBookmakersList: propTypes.bool.isRequired,
    toggleBookmakersList: propTypes.func.isRequired,
    openModal: propTypes.func.isRequired,
    selectedBookmaker: propTypes.string,
    setBookmakersWithFreeBets: propTypes.func,
}

export const BookmakersListWith = withAllBookmakers(
    BookmakersList,
    ['allBookmakers'],
    null,
)
