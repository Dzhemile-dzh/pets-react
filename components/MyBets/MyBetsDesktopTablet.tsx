import React, { useMemo } from 'react';
import Link from 'next/link';
import moment from 'moment';
import { groupBy } from 'lodash';
import { MyBetsWrapperInterface } from '../interfaces';
import SlideToggle from '../base/inputs/SlideToggle';
import { PartialLogoIcon } from '../base/Icons/PartialLogoIcon';
import { ChevronIcon } from '../base/Icons/ChevronIcon';
import { FilterIcon } from '../base/Icons/FilterIcon';
import Select from '../base/Select';
import { filterOptions, FilterOptionValue } from './FilterOptionValue';
import MyBookmakerAccountsBalance from '../BookmakerAccounts/components/MyBookmakerAccountsBalance';
import MyBetsHistory from './components/MyBetsHistory';
import { Constants } from '../../project/constants';
import Loader from '../base/Loader';
import NoRecentBetsMessage from './components/NoRecentBetsMessage';

import styles from './MyBets.module.scss';

const { DATE_FORMATS: { dddd_D_MMMM } } = Constants;

export const MyBetsDesktopTablet = ({
    isLogged,
    bookmakers,
    totalBalance,
    totalFreeBetsBalance,
    unsettledBetHistory,
    settledBetHistory,
    isTablet,
    onBookmakerFilterSelect,
    selectedBkmOption,
    loggedBookmakers,
    selectedFilterOption,
    onStatusFilterSelect,
}: MyBetsWrapperInterface) : JSX.Element => {
    const renderUnsettledBets = useMemo(() => {
        const { isUnsettledBetHistoryLoading, unsettledBetHistoryBets } = unsettledBetHistory;

        if (isUnsettledBetHistoryLoading) {
            return (
                <div
                    className = {styles['my-bets__loader']}
                    data-testid = "Container__MyBetsLoader"
                >
                    <Loader />
                </div>
            );
        }

        const sortedUnsettledBets = groupBy(unsettledBetHistoryBets
            ?.slice(0, 10), (item) => item.date)

        return Object.keys(sortedUnsettledBets).length !== 0 ?
            Object.keys(sortedUnsettledBets)
                .map((item) => (
                    <React.Fragment
                        key = {item}
                    >
                        <div
                            className = {styles['my-bets__date']}
                        >
                            {moment(item).format(dddd_D_MMMM)}
                        </div>
                        <ul
                            className = {styles['my-bets__list']}
                            data-testid = "List__MyBets"
                        >
                            {sortedUnsettledBets[item].map((bet) => (
                                <MyBetsHistory
                                    key = {bet.betId}
                                    betId = {bet.betId}
                                    bookmakerName = {bet.bookmakerName}
                                    selections = {bet.selections}
                                    totalStake = {bet.totalStake}
                                    betType = {bet.type}
                                    currencySign = {bet.currencySign}
                                    numberOfLines = {bet.numberOfLines}
                                    stakePerLine = {bet.stakePerLine}
                                    date = {bet.date}
                                    estimatedReturns = {bet.estimatedReturns}
                                    isEachWay = {bet.isEachWay}
                                    time = {bet.time}
                                    isTablet = {isTablet}
                                    freeBetStake = {bet.freeBetStake}
                                />
                            ))}
                        </ul>
                    </React.Fragment>
                )) : <NoRecentBetsMessage />;
    }, [isTablet, unsettledBetHistory])

    const renderSettledBets = useMemo(() => {
        const { isSettledBetHistoryLoading, settledBetHistoryBets } = settledBetHistory;

        if (isSettledBetHistoryLoading) {
            return (
                <div
                    className = {styles['my-bets__loader']}
                    data-testid = "Container__MyBetsLoader"
                >
                    <Loader />
                </div>
            );
        }

        const sortedSettledBets = groupBy(settledBetHistoryBets
            ?.slice(0, 10), (item) => item.date);

        return Object.keys(sortedSettledBets).length !== 0 ?
            Object.keys(sortedSettledBets)
                .map((item) => (
                    <React.Fragment
                        key = {item}
                    >
                        <div
                            className = {styles['my-bets__date']}
                        >
                            {moment(item).format(dddd_D_MMMM)}
                        </div>
                        <ul
                            className = {styles['my-bets__list']}
                            data-testid = "List__MyBets"
                        >
                            {sortedSettledBets[item].map((bet) => (
                                <MyBetsHistory
                                    key = {bet.betId}
                                    betId = {bet.betId}
                                    bookmakerName = {bet.bookmakerName}
                                    selections = {bet.selections}
                                    totalStake = {bet.totalStake}
                                    betType = {bet.type}
                                    currencySign = {bet.currencySign}
                                    numberOfLines = {bet.numberOfLines}
                                    stakePerLine = {bet.stakePerLine}
                                    date = {bet.date}
                                    estimatedReturns = {bet.estimatedReturns}
                                    isEachWay = {bet.isEachWay}
                                    time = {bet.time}
                                    isSettled
                                    isWinning = {bet.isWinning}
                                    returns = {bet.returns}
                                    isTablet = {isTablet}
                                    freeBetStake = {bet.freeBetStake}
                                />
                            ))}
                        </ul>
                    </React.Fragment>
                )) : <NoRecentBetsMessage />;
    }, [isTablet, settledBetHistory])

    return (
        <div
            className = {styles['my-bets']}
            data-testid = "Container__MyBets"
        >
            <div
                className = {styles['my-bets-header']}
                data-testid = "Header__MyBets"
            >
                <div
                    className = {styles['my-bets-header__left-side']}
                    data-testid = "Header__MyBetsLeftSide"
                >
                    <div
                        className = {styles['my-bets-header__title']}
                        data-testid = "Header__TitleIcon"
                    >
                        <PartialLogoIcon
                            color = "primary"
                        />
                        <h1 data-testid = "Header__Title">MY BETS</h1>
                    </div>
                    <div
                        className = {styles['my-bets-header__filters']}
                        data-testid = "Container__MyBetsHeaderFilters"
                    >
                        <SlideToggle
                            className = {styles['my-bets-header__slide-toggle']}
                            currentOption = {selectedFilterOption}
                            purpose = "BetType"
                            handleClick = {(value) => onStatusFilterSelect(value)}
                        >
                            {filterOptions.map((option, index) => (
                                <SlideToggle.Button
                                    key = {index}
                                    optionLabel = {option.label}
                                    optionValue = {option.value}
                                />
                            ))}
                        </SlideToggle>
                        {loggedBookmakers.length > 1 && (
                            <Select
                                hasCustomSelectedOption
                                className = "my-bets-header__select"
                                onSelect = {onBookmakerFilterSelect}
                                value = {selectedBkmOption}
                            >
                                <Select.SelectedOption
                                    prefix = {(
                                        <div className = {styles['my-bets-header__filter-icon']}>
                                            <FilterIcon
                                                data-testid = "Select__FilterIcon"
                                            />
                                        </div>
                                    )}
                                    options = {bookmakers}
                                    labelPropertyName = "displayName"
                                    valuePropertyName = "feed"
                                    placeholder = "All Bookmakers"
                                />
                                <Select.Option value = "all">
                                    <span data-testid = "Option__Label">all bookmakers</span>
                                </Select.Option>
                                {loggedBookmakers.map((bookmaker) => (
                                    <Select.Option
                                        key = {bookmaker.displayName}
                                        value = {bookmaker.feed}
                                        className = "my-bets-header"
                                    >
                                        <span data-testid = "Option__Label">
                                            {bookmaker.displayName} only
                                        </span>
                                    </Select.Option>
                                ))}
                            </Select>
                        )}
                    </div>
                </div>
                <div
                    className = {styles['my-bets-header__right-side']}
                    data-testid = "Header__MyBetsRightSide"
                >
                    {!isLogged ? (
                        <div
                            className = {styles['my-bets__login-warning-container']}
                            data-testid = "Container__MyBetsHeaderNotLoggedIn"
                        >
                            <p
                                className = {styles['my-bets__login-warning-text']}
                                data-testid = "MyBetsHeaderNotLoggedIn__Text"
                            >
                                Your account balance will show here when you
                                sign up or log in to your bookmaker
                            </p>
                            <Link href = "/my-bookmakers">
                                <a
                                    className = {styles['my-bets__login-link']}
                                    data-testid = "MyBetsHeaderNotLoggedIn__Link"
                                >
                                    Log in
                                    <ChevronIcon
                                        className = {styles['my-bets__login-link-svg']}
                                    />
                                </a>
                            </Link>
                        </div>
                    ) : (
                        <>
                            <MyBookmakerAccountsBalance
                                bookmakers = {bookmakers}
                                totalBalance = {totalBalance}
                                totalFreeBetsBalance = {totalFreeBetsBalance}
                                wrapperClassName = "mba-wrapper__my-bets"
                                mbaListClassName = "mba-list__my-bets"
                                mbaBalanceClassName = "mba-balance__container-my-bets"
                            />
                            <div
                                className = {styles['my-bets-header__additional-actions']}
                                data-testid = "Container__MyBetsHeaderAdditionalActions"
                            >
                                <Link href = "/my-bookmakers">
                                    <a
                                        className = {styles['my-bets-header__manage-bookmakers']}
                                        data-testid = "ManageBookmakers__Link"
                                    >
                                        Manage bookmakers
                                        <ChevronIcon />
                                    </a>
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <div
                className = {styles['my-bets-body']}
                data-testid = "Container__MyBetsBody"
            >
                {!isLogged ? (
                    <div
                        className = {styles['my-bets-body__not-logged-in']}
                        data-testid = "Container__MyBetsBodyNotLoggedIn"
                    >
                        <p data-testid = "MyBetsBody__NotLoggedInText">
                            Sign up or log in to your bookmaker to see your bet history
                            {' '}
                            <Link href = "/my-bookmakers">
                                <a
                                    className = {styles['my-bets-body__login-link']}
                                    data-testid = "MyBetsBody__NotLoggedInLink"
                                >
                                    Log in
                                    <ChevronIcon />
                                </a>
                            </Link>
                        </p>
                    </div>
                ) : (
                    <div
                        data-testid = "Container_MyBetsBody"
                        className = {styles['my-bets-body__logged-in']}
                    >
                        {FilterOptionValue.OPEN === selectedFilterOption && renderUnsettledBets}
                        {FilterOptionValue.SETTLED === selectedFilterOption && renderSettledBets}
                    </div>
                )}
            </div>
        </div>
    )
}
