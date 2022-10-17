import React, { useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import moment from 'moment';
import { groupBy } from 'lodash';
import Image from 'next/image';
import { MyBetsWrapperInterface } from '../interfaces';
import { filterOptions, FilterOptionValue } from './FilterOptionValue';
import SlideToggle from '../base/inputs/SlideToggle';
import { ChevronIcon } from '../base/Icons/ChevronIcon';
import { MyBetsHistoryItem } from '../MyRacingPost/components/MyBetsHistoryItem/MyBetsHistoryItem';

import { Constants } from '../../project/constants';
import Select from '../base/Select';
import NoRecentBetsMessage from './components/NoRecentBetsMessage';
import Loader from '../base/Loader';

import styles from './MyBets.module.scss';

const { DATE_FORMATS: { DD_MMM_YYYY } } = Constants;

export const MyBetsMobile = ({
    isLogged,
    unsettledBetHistory,
    settledBetHistory,
    onBookmakerFilterSelect,
    selectedBkmOption,
    loggedBookmakers,
    selectedFilterOption,
    onStatusFilterSelect,
}: MyBetsWrapperInterface) : JSX.Element => {
    const router = useRouter();

    const handleBackButtonClick = useCallback(() => {
        router.push('/my-bookmakers');
    }, [router])

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
                        <h3
                            className = {styles['my-bets__date']}
                            data-testid = "Text__Date"
                        >
                            {moment(item).format(DD_MMM_YYYY)}
                        </h3>
                        <ul
                            className = {styles['my-bets__list']}
                            data-testid = "List__MyBets"
                        >
                            {sortedSettledBets[item].map((bet) => (
                                <MyBetsHistoryItem
                                    key = {bet.betId}
                                    showReceipt
                                    isSettled
                                    betType = {bet.type}
                                    {...bet}
                                />
                            ))}
                        </ul>
                    </React.Fragment>
                )) : <NoRecentBetsMessage />;
    }, [settledBetHistory])

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
                        <h3
                            className = {styles['my-bets__date']}
                            data-testid = "Text__Date"
                        >
                            {moment(item).format(DD_MMM_YYYY)}
                        </h3>
                        <ul
                            className = {styles['my-bets__list']}
                            data-testid = "List__MyBets"
                        >
                            {sortedUnsettledBets[item].map((bet) => (
                                <MyBetsHistoryItem
                                    key = {bet.betId}
                                    betType = {bet.type}
                                    {...bet}
                                    showReceipt
                                />
                            ))}
                        </ul>
                    </React.Fragment>
                )) :
            <NoRecentBetsMessage />;
    }, [unsettledBetHistory]);

    return (
        <div
            className = {styles['my-bets']}
            data-testid = "Container__MyBets"
        >
            <div
                className = {styles['my-bets-header']}
                data-testid = "Container__MyBetsHeader"
            >
                <div
                    className = {styles['my-bets-header__title']}
                    data-testid = "Header__Title"
                >
                    <div
                        className = {styles['my-bets-header__title-text']}
                        data-testid = "Header__Title"
                    >
                        <div
                            onClick = {handleBackButtonClick}
                            className = {styles['my-bets-header__title-back-button']}
                            data-testid = "Header__BackButton"
                        >
                            <Image
                                src = "/svgs/chevron_left_black.svg"
                                width = {24}
                                height = {24}
                            />
                        </div>
                        MY BETS
                    </div>
                    {loggedBookmakers.length > 1 && (
                        <div
                            className = {styles['my-bets-header__sort-container']}
                            data-testid = "Container__Sort"
                        >
                            <Select
                                hasCustomSelectedOption
                                className = "my-bets-header__select"
                                onSelect = {onBookmakerFilterSelect}
                                value = {selectedBkmOption}
                            >
                                <Select.SelectedOption
                                    prefix = {(
                                        <div>
                                            <Image
                                                src = "/svgs/sort.svg"
                                                width = {24}
                                                height = {24}
                                                data-testid = "Select__FilterIcon"
                                            />
                                        </div>
                                    )}
                                    options = {loggedBookmakers}
                                    labelPropertyName = "displayName"
                                    valuePropertyName = "feed"
                                />
                                <Select.Option value = "all">
                                    <span data-testid = "Option__Label">all accounts</span>
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
                        </div>
                    )}
                </div>
                <div
                    className = {styles['my-bets-header__filters']}
                    data-testid = "Container__HeaderFilters"
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
                </div>
            </div>
            <div
                className = {styles['my-bets-body']}
                data-testid = "Container__MyBetsBody"
            >
                {!isLogged ? (
                    <div
                        className = {styles['my-bets-body__not-logged-in']}
                        data-testid = "MyBetsBody__NotLoggedIn"
                    >
                        <p data-testid = "NotLoggedIn__Text">
                            Sign up or log in to your bookmaker to see your bet history
                            {' '}
                            <Link href = "/my-bookmakers">
                                <a
                                    className = {styles['my-bets-body__login-link']}
                                    data-testid = "NotLoggedIn__Link"
                                >
                                    Log in
                                    <ChevronIcon />
                                </a>
                            </Link>
                        </p>
                    </div>
                ) : (
                    <div data-testid = "Container_MyBetsBody">
                        {FilterOptionValue.OPEN === selectedFilterOption && renderUnsettledBets}
                        {FilterOptionValue.SETTLED === selectedFilterOption && renderSettledBets}
                    </div>
                )}
            </div>
        </div>
    );
}
