import React, { useCallback, useMemo, useState } from 'react';
import propTypes from 'prop-types';
import BookmakerAccountItem from '../BookmakerAccountItem';
import { convertToPascalCase } from '../../../../project/utils/formatUtils';
import { useBreakPoint } from '../../../contexts/BreakPointContext';
import styles from './FilteredBookmakers.module.scss';

export const FilteredBookmakers = ({
    bookmakers,
    bookmakerConfiguration,
    isPopoverShown,
    onBookmakerClick,
    classNames,
    title,
    isRecent,
    loginBookmaker,
    setLoginBookmaker,
    removeLoginBookmaker,
    location,
    isNotLoggedIn,
    recentBookmakersCount,
}) => {
    const [selectedOffer, setSelectedOffer] = useState(null);
    const bookmakersType = isRecent ? 'recent' : 'all';
    const { isMobile } = useBreakPoint();

    const onOfferClicked = useCallback((name) => {
        if (selectedOffer === name) {
            return setSelectedOffer(null);
        }
        setSelectedOffer(name);
    }, [selectedOffer])

    const renderBookmakerItem = useCallback(
        (bookmaker, index) => {
            return (
                <BookmakerAccountItem
                    key = {bookmaker.name}
                    {...bookmaker}
                    onBookmakerClick = {() => onBookmakerClick && onBookmakerClick(bookmaker)}
                    onOfferClicked = {onOfferClicked}
                    selectedOffer = {selectedOffer}
                    isPopoverShown = {isPopoverShown}
                    loginType = {bookmaker.loginType}
                    loginBookmaker = {loginBookmaker}
                    setLoginBookmaker = {setLoginBookmaker}
                    removeLoginBookmaker = {removeLoginBookmaker}
                    bookmakerListPosition = {index + 1}
                    location = {location}
                    isNotLoggedIn = {isNotLoggedIn}
                    recentBookmakersCount = {recentBookmakersCount}
                    isMobile = {isMobile}
                />
            )
        },
        [
            isNotLoggedIn,
            selectedOffer,
            isPopoverShown,
            location,
            loginBookmaker,
            onBookmakerClick,
            onOfferClicked,
            recentBookmakersCount,
            removeLoginBookmaker,
            setLoginBookmaker,
            isMobile,
        ],
    )

    const output = useMemo(
        () => {
            const offerType = isMobile ? 'mobile' : 'desktop';

            return bookmakers
                .map((bookmaker) => {
                    const offerData = bookmakerConfiguration?.[bookmaker.name]?.[offerType] || {};

                    return {
                        ...bookmaker,
                        offer: {
                            offer: offerData.offer || '',
                            tsAndCs: offerData.tsAndCs || '',
                            linkText: offerData.linkText || '',
                            signUpLink: offerData.signUpLink1 || '',
                        },
                    }
                })
                .map(renderBookmakerItem)
        },
        [bookmakerConfiguration, bookmakers, isMobile, renderBookmakerItem],
    )

    return output.length > 0 && (
        <div
            className = {styles[`${classNames}__${bookmakersType}-bookmakers`]}
            data-testid = {`Container__BookmakerAccounts${convertToPascalCase(bookmakersType)}`}
        >
            <span
                className = {styles[`${classNames}__${bookmakersType}-bookmakers-text`]}
                data-testid = {`Text__BookmakerAccounts${convertToPascalCase(bookmakersType)}`}
            >
                {title}
            </span>
            <ul
                className = {styles[`${classNames}__bookies`]}
                data-testid =
                    {`Container__BookmakerAccounts${convertToPascalCase(bookmakersType)}Bookies`}
            >
                {output}
            </ul>
        </div>
    )
}

FilteredBookmakers.propTypes = {
    bookmakers: propTypes.array.isRequired,
    isMobile: propTypes.bool,
    classNames: propTypes.string,
    title: propTypes.string,
    bookmakerConfiguration: propTypes.object,
    isPopoverShown: propTypes.bool,
    onBookmakerClick: propTypes.func,
    isRecent: propTypes.bool,
    loginBookmaker: propTypes.string,
    setLoginBookmaker: propTypes.func,
    removeLoginBookmaker: propTypes.func,
    urlLogoutSuccess: propTypes.func,
    location: propTypes.string,
    isNotLoggedIn: propTypes.bool,
    recentBookmakersCount: propTypes.number,
}
