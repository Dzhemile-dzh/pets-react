/* eslint-disable max-len */
import {
    useCallback, useState, useEffect, useMemo,
} from 'react';
import propTypes from 'prop-types';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import classnames from 'classnames';

import { Actions } from '../../../../project/common';
import BookmakerLogoutButton from '../../../base/BookmakerLogoutButton';
import StyledCheckbox from '../../../base/inputs/StyledCheckbox';
import BookmakerThumb from '../../../Betslip/components/BookmakerThumb';
import WindowMyBetsHistory from '../../../MyBets/components/WindowMyBetsHistory';
import { useModal } from '../../../base/Modal';
import OddsModal from '../../../base/OddsModal';
import { Constants } from '../../../../project/constants';
import useEffectOnce from '../../../custom-hooks/useEffectOnce';
import { setAppCookie, openPopUpWindow } from '../../../../project/utils/helpers';
import { setSessionStorageItem } from '../../../../project/utils/storage';
import { convertToPascalCase } from '../../../../project/utils/formatUtils'
import { useBreakPoint } from '../../../contexts/BreakPointContext';
import FreeBets from '../FreeBets';
import styles from './BookmakerAccountPage.module.scss';

const {
    DEFAULT_BOOKIE,
    SELECTED_BOOKMAKER_COOKIE,
    BET_HISTORY_STORAGE_ITEM,
    BOOKMAKER_NAMES: { SKYBET },
} = Constants;

const MenuItem = ({
    icon, text, onClick, info,
}) => {
    return (
        <li
            className = {styles['ba-page__list-item']}
            onClick = {onClick}
            data-testid = {`Container__BookmakerAccountPageListItem${convertToPascalCase(text)}`}
        >
            {icon}
            <span
                className = {styles['ba-page__list-item-text']}
                data-testid = {`Text__BookmakerAccountPageListItem${convertToPascalCase(text)}`}
            >
                {text}
            </span>
            <Image
                src = "/svgs/chevron_right_black.svg"
                className = {styles['ba-page__list-item-chevron']}
                width = {24}
                height = {24}
            />
            <span
                className = {styles['ba-page__list-item-info']}
                data-testid = {`Text__BookmakerAccountPageListItemInfo${convertToPascalCase(info)}`}
            >
                {info}
            </span>
        </li>
    );
}

const oddsMessageText = (
    <>
        These Prices will show on all racecards
        and default to <b>Best Odds</b> in
        the Betslip until you select another bookmaker.
    </>
);

MenuItem.propTypes = {
    icon: propTypes.node,
    text: propTypes.string.isRequired,
    onClick: propTypes.func,
}

export const BookmakerAccountPage = ({
    bookmaker,
    onBackButtonClick,
    setPreviousSelectedBookmaker,
    previousSelectedBookmaker,
    selectedBookmaker,
    bookmakers,
}) => {
    const [isOddsCheckboxChecked, setOddsCheckbox] = useState(false);
    const [isMyBetsHistoryWindowOpen, setIsMyBetsHistoryWindowOpen] = useState(false);
    const [isFreeBetsOpen, setIsFreeBetsOpen] = useState(false);

    const dispatch = useDispatch();
    const betHistoryUrls = useSelector((state) => state.betHistory.urls)

    const {
        name,
        displayName,
        balance,
        username,
        currencySign,
        freeBets,
        freeBetBalance,
    } = bookmaker;
    const skybetBetHistoryUrl = betHistoryUrls.bookmakers[SKYBET];
    const freeBetBalanceText = `+ ${freeBetBalance} Free Bets`;

    const { isMobile } = useBreakPoint();

    const router = useRouter();

    useEffect(() => {
        if (selectedBookmaker === bookmaker.feed) {
            setOddsCheckbox(true);
        }
    }, [bookmaker.feed, selectedBookmaker]);

    const {
        isModalOpen,
        showModal,
        hideModal,
    } = useModal('BookmakerAccountItem');

    const bookmakersList = useMemo(() => {
        return [
            {
                displayName: 'Best Odds',
                feed: DEFAULT_BOOKIE,
                name: 'bestoddsbookmaker',
            },
            ...bookmakers,
        ].sort((first, second) => first.displayName.localeCompare(second.displayName))
    }, [bookmakers])

    const selectedBookmakerFeed = selectedBookmaker || DEFAULT_BOOKIE;

    const selectedBookmakerData = bookmakersList.find(
        (item) => item.feed === selectedBookmakerFeed,
    )

    const handleCheckboxClick = useCallback(() => {
        if (!isOddsCheckboxChecked) {
            showModal();
            setBookmaker(bookmaker.feed);
            setOddsCheckbox(true);
            return;
        }

        showModal();
        setOddsCheckbox(false);
        setBookmaker(DEFAULT_BOOKIE);
    }, [bookmaker.feed, isOddsCheckboxChecked, setBookmaker, showModal])

    const onFreeBetsClick = useCallback(() => {
        setIsFreeBetsOpen(!isFreeBetsOpen);
    }, [isFreeBetsOpen])

    const onBetHistoryClick = useCallback(() => {
        const isSkybet = name === SKYBET;

        if (isSkybet && skybetBetHistoryUrl) {
            setIsMyBetsHistoryWindowOpen(true);
            openPopUpWindow('MyBetsHistory');
            return false;
        }

        if (!isSkybet) {
            setSessionStorageItem(BET_HISTORY_STORAGE_ITEM, bookmaker.feed);
            router.push('/my-bets');
        }
    }, [bookmaker.feed, name, router, skybetBetHistoryUrl])

    const setBookmaker = useCallback((feed) => {
        if (feed !== selectedBookmakerFeed) {
            setPreviousSelectedBookmaker(selectedBookmakerData)
            setAppCookie(SELECTED_BOOKMAKER_COOKIE, feed);
            dispatch(Actions.setSelectedBookmaker(feed));
            dispatch(Actions.clearBetslip());
        }
    }, [dispatch, selectedBookmakerData, selectedBookmakerFeed, setPreviousSelectedBookmaker]);

    useEffectOnce(() => {
        const { bookmakers: bookmakerUrls, isBetHistoryUrlLoading, error } = betHistoryUrls;

        if (name === SKYBET && !error && !bookmakerUrls[SKYBET] && !isBetHistoryUrlLoading) {
            dispatch(Actions.getBookmakerBetHistoryUrl(SKYBET));
        }
    })

    const oddsMainText = `You've deselected
    ${previousSelectedBookmaker?.displayName || ''}
    as your default odds to be displayed. Racing Post will now show:`;

    return isFreeBetsOpen ? (
        <FreeBets
            freeBets = {freeBets}
            freeBetBalance = {freeBetBalance}
            bookmakerName = {name}
            currencySign = {currencySign}
            onBackBtnClick = {onFreeBetsClick}
        />
    ) : (
        <>
            <header
                className = {classnames(
                    styles['ba-page__header'],
                    styles[`ba-page__header--${name}`],
                )}
                data-testid = {`Header__BookmakerAccountPageHeader${convertToPascalCase(name)}`}
            >
                <div
                    className = {styles['ba-page__header-navigation']}
                    data-testid = "Container__BookmakerAccountPageHeaderNavigation"
                >
                    <div
                        className = {styles['ba-page__header-back-button']}
                        onClick = {onBackButtonClick}
                        data-testid = "Container__BookmakerAccountPageHeaderBackButton"
                    >
                        <Image
                            src = "/svgs/chevron_left_white.svg"
                            width = {24}
                            height = {24}
                        />
                        <span
                            className = {styles['ba-page__header-username']}
                            data-testid = "Text__BookmakerAccountPageHeaderUsername"
                        >
                            {username}
                        </span>
                    </div>
                    <BookmakerLogoutButton
                        className = {styles['ba-page__header-logout-button']}
                        bookmakerName = {name}
                        icon = {(
                            <div className = {styles['ba-page__header-logout-button-svg']}>
                                <Image
                                    src = "/svgs/logout.svg"
                                    width = {24}
                                    height = {24}
                                />
                            </div>
                            )}
                        onSuccess = {onBackButtonClick}
                    />
                </div>

                <div
                    className = {styles['ba-page__header-bookmaker-info']}
                    data-testid = "Container__BookmakerAccountPageHeaderBookmakerInfo"
                >
                    <BookmakerThumb
                        className = {styles[`ba-page__header-bookmaker-thumb--${name}`]}
                        bookmakerName = {name}
                        size = "extra-large"
                    />

                    <h2
                        className = {classnames(
                            styles['ba-page__header-balance'],
                            styles[`ba-page__header-balance--${name}`],
                        )}
                        data-testid = "Text__BookmakerAccountPageHeaderBalance"
                    >
                        <span
                            data-testid = "Text__BookmakerAccountPageHeaderBalanceLabel"
                        >
                            Balance
                        </span>
                        <em
                            data-testid = "Text__BookmakerAccountPageHeaderBalanceValue"
                        >
                            {balance || `${currencySign}0.00`}
                        </em>
                    </h2>
                </div>
            </header>
            <ul
                className = {styles['ba-page__list']}
                data-testid = "List__BookmakerAccountPageList"
            >
                {freeBets.length > 0 && (
                <MenuItem
                    icon = {(
                        <Image
                            src = "/svgs/free_bets.svg"
                            width = {24}
                            height = {24}
                        />
                            )}
                    text = "Free Bets"
                    info = {freeBetBalanceText}
                    onClick = {onFreeBetsClick}
                />
                )}
                <MenuItem
                    icon = {(
                        <Image
                            src = "/svgs/deposit_funds.svg"
                            width = {24}
                            height = {24}
                        />
                        )}
                    text = "Deposit funds"
                />
                <MenuItem
                    icon = {(
                        <Image
                            src = "/svgs/withdraw_funds.svg"
                            width = {24}
                            height = {24}
                        />
                        )}
                    text = "Withdraw funds"
                />
                <MenuItem
                    icon = {(
                        <Image
                            src = "/svgs/bet_history.svg"
                            width = {24}
                            height = {24}
                        />
                        )}
                    text = "Bet history"
                    onClick = {onBetHistoryClick}
                />
                <MenuItem
                    icon = {(
                        <Image
                            src = "/svgs/tnc.svg"
                            width = {24}
                            height = {24}
                        />
                        )}
                    text = "Terms and Conditions"
                />
                <li
                    className = {styles['ba-page__list-item']}
                    data-testid = "Container__BookmakerAccountPageListItemDefaultOdds"
                >
                    <div
                        onClick = {handleCheckboxClick}
                        data-testid = "Container__BookmakerAccountPageListItemDefaultOddsCheckbox"
                    >
                        <StyledCheckbox
                            className = {styles['ba-page__checkbox']}
                            checked = {isOddsCheckboxChecked}
                            label = {`Show ${displayName} odds as default`}
                        />
                    </div>

                    <span
                        className = {styles['ba-page__list-item-checkbox-description']}
                        data-testid = "Text__BookmakerAccountPageListItemDefaultOddsDescription"
                    >
                        All odds displayed in racecards and the betslip will show {displayName} odds
                    </span>
                </li>
            </ul>
            {
                isModalOpen && (
                    <OddsModal
                        closeModal = {hideModal}
                        selectedBookmakerData = {selectedBookmakerData}
                        previousSelectedBookmaker = {previousSelectedBookmaker}
                        oddsMainText = {!isOddsCheckboxChecked ? oddsMainText : undefined}
                        oddsMessageText = {!isOddsCheckboxChecked ? oddsMessageText : undefined}
                        showPreviouslyViewed = {isOddsCheckboxChecked && isMobile}
                    />
                )
            }
            {
                isMyBetsHistoryWindowOpen && !!skybetBetHistoryUrl && (
                    <WindowMyBetsHistory
                        onClose = {() => setIsMyBetsHistoryWindowOpen(false)}
                        url = {skybetBetHistoryUrl}
                    />
                )
            }
        </>
    )
}

BookmakerAccountPage.propTypes = {
    bookmaker: propTypes.object,
    onBackButtonClick: propTypes.func.isRequired,
    setPreviousSelectedBookmaker: propTypes.func,
    previousSelectedBookmaker: propTypes.object,
    selectedBookmaker: propTypes.string,
    bookmakers: propTypes.array,
}
