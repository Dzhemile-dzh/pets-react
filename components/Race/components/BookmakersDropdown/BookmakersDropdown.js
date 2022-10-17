/* eslint-disable max-len */
import {
    useEffect, useRef, useMemo, useCallback,
} from 'react'
import propTypes from 'prop-types';
import classnames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';

import { Actions } from '@project/common';
import { Constants } from '@project/constants';
import { convertToPascalCase } from '@project/utils/formatUtils';

import { ChevronIcon } from '@components/base/Icons/ChevronIcon';
import { useModal } from '@components/base/Modal';
import OddsModal from '@components/base/OddsModal';
import { useBreakPoint } from '@components/contexts/BreakPointContext';

import styles from './BookmakersDropdown.module.scss';

export const BookmakersDropdown = ({
    bookmakers,
    isDropdownOpen,
    isOddsInner,
    isOnBookmakersPage,
    oddsText,
    previousSelectedBookmaker,
    setDropdownOpen,
    setPreviousSelectedBookmaker,
}) => {
    const wrapperRef = useRef(null);
    const dispatch = useDispatch();

    const { isMobile } = useBreakPoint();

    const {
        isModalOpen,
        showModal,
        hideModal,
    } = useModal('BookmakersDropdown');

    const selectedBookmaker = useSelector((state) => state.selectedBookmaker)

    const handleClickOutside = useCallback(
        (event) => {
            if (wrapperRef.current &&
                    !wrapperRef.current.contains(event.target) &&
                    !document.getElementById('modal').contains(event.target)
            ) {
                setDropdownOpen(false);
            }
        },
        [setDropdownOpen],
    );

    useEffect(() => {
        // When we switch from tablet/desktop to mobile
        // We don't receive information for Betway
        // So we need to reset the selected bookmaker and previous to default
        if (isMobile && selectedBookmaker === 'BETWAY') {
            dispatch(Actions.setSelectedBookmaker(Constants.DEFAULT_BOOKIE));
            setPreviousSelectedBookmaker(null)
        }

        document.addEventListener('mouseup', handleClickOutside, false);
        return () => document.removeEventListener('mouseup', handleClickOutside, false);
    }, [handleClickOutside, isMobile, selectedBookmaker, setPreviousSelectedBookmaker, dispatch])

    // Initially we don't receive the Best odds information from the bookmakers
    // So we need to add it
    const bookmakersList = useMemo(() => {
        return [
            {
                displayName: 'Best Odds',
                feed: Constants.DEFAULT_BOOKIE,
                name: 'bestoddsbookmaker',
            },
            ...bookmakers,
        ].sort((first, second) => first.displayName.localeCompare(second.displayName))
    }, [bookmakers])

    const selectedBookmakerFeed = selectedBookmaker || Constants.DEFAULT_BOOKIE;

    const selectedBookmakerData = bookmakersList.find(
        (item) => item.feed === selectedBookmakerFeed,
    )

    const dropdownBookmakers = useMemo(
        () => (bookmakersList.filter((item) => item.feed !== selectedBookmakerFeed)),
        [bookmakersList, selectedBookmakerFeed],
    )

    const selectBookmaker = useCallback((feed) => {
        if (isDropdownOpen) {
            if (feed !== selectedBookmakerFeed) {
                setPreviousSelectedBookmaker(selectedBookmakerData)
                dispatch(Actions.setSelectedBookmaker(feed));
                dispatch(Actions.clearBetslip());
                showModal();
            }

            setDropdownOpen(false);
        }
    }, [isDropdownOpen, selectedBookmakerFeed, setDropdownOpen, setPreviousSelectedBookmaker, selectedBookmakerData, dispatch, showModal])

    const closeModal = useCallback(
        () => {
            hideModal();
            setDropdownOpen(false);
        },
        [hideModal, setDropdownOpen],
    )

    return (
        <div
            className = {classnames(
                styles['bookmakers-dropdown'],
                {
                    [styles['bookmakers-dropdown__bookmakers-page']]: isOnBookmakersPage,
                },
            )}
            data-testid = "Container__BookmakersDropdown"
        >
            {!isOddsInner && (
                <span
                    className = {styles['bookmakers-dropdown__label']}
                    data-testid = "Text__BookmakersDropdownLabel"
                >
                    {oddsText}
                </span>
            )}
            <div
                className = {classnames(
                    styles['bookmakers-dropdown__container'],
                    {
                        [styles['bookmakers-dropdown__bookmakers-page-container']]: isOnBookmakersPage,
                    },
                    {
                        [styles['bookmakers-dropdown__container--opened']]: isDropdownOpen,
                    },
                    {
                        [styles['bookmakers-dropdown__bookmakers-page-container--opened']]: isDropdownOpen && isOnBookmakersPage,
                    },
                )}
                onClick = {() => !isDropdownOpen && setDropdownOpen(true)}
                ref = {wrapperRef}
                data-testid = "Container__BookmakersDropdownContainer"
            >
                {isOddsInner && (
                    <span
                        className = {classnames(
                            styles['bookmakers-dropdown__label-inner'],
                            {
                                [styles['bookmakers-dropdown__bookmakers-page-label-inner']]: isOnBookmakersPage,
                            },
                        )}
                        data-testid = "Text__BookmakersDropdownLabelInner"
                    >
                        {oddsText}
                    </span>
                )}
                <div
                    className = {styles['bookmakers-dropdown__selected-bookmaker']}
                    onClick = {() => selectBookmaker(selectedBookmakerFeed)}
                    data-testid = "Container__BookmakersDropdownSelected"
                >
                    <span
                        className = {classnames(
                            styles['bookmakers-dropdown__selected-name'],
                            {
                                [styles['bookmakers-dropdown__bookmakers-page-selected-name']]: isOnBookmakersPage,
                            },
                        )}
                        data-testid = "Text__BookmakersDropdownSelectedName"
                    >
                        {selectedBookmakerData?.displayName}
                    </span>
                    <ChevronIcon
                        color = "black"
                        size = "normal"
                        className = {classnames(
                            styles['bookmakers-dropdown__icon'],
                            {
                                [styles['bookmakers-dropdown__icon--opened']]: isDropdownOpen,
                            },
                        )}
                    />
                </div>
                {
                    isDropdownOpen && (
                        <div
                            className = {classnames(
                                styles['bookmakers-dropdown__list'],
                                {
                                    [styles['bookmakers-dropdown__bookmakers-page-list']]: isOnBookmakersPage,
                                },
                            )}
                            data-testid = "Container__BookmakersDropdownList"
                        >
                            <ul
                                className = {classnames(
                                    styles['bookmakers-dropdown__list-options'],
                                    {
                                        [styles['bookmakers-dropdown__bookmakers-page-list-options']]: isOnBookmakersPage,
                                    },
                                )}
                                data-testid = "Container__BookmakersDropdownListOptions"
                            >
                                {
                                    dropdownBookmakers.map((item) => (
                                        <li
                                            className = {styles['bookmakers-dropdown__list-option']}
                                            key = {item.feed}
                                            onClick = {() => selectBookmaker(item.feed)}
                                            data-testid = {`Text__BookmakersDropdownList${convertToPascalCase(item.displayName)}`}
                                        >
                                            {item.displayName}
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    )
                }
            </div>
            {
                isModalOpen && (
                    <OddsModal
                        closeModal = {closeModal}
                        selectedBookmakerData = {selectedBookmakerData}
                        previousSelectedBookmaker = {previousSelectedBookmaker}
                        showPreviouslyViewed
                    />
                )
            }
        </div>
    )
}

BookmakersDropdown.propTypes = {
    bookmakers: propTypes.array.isRequired,
    setPreviousSelectedBookmaker: propTypes.func,
    previousSelectedBookmaker: propTypes.object,
    isDropdownOpen: propTypes.bool,
    setDropdownOpen: propTypes.func,
    oddsText: propTypes.string,
    isOddsInner: propTypes.bool,
    isOnBookmakersPage: propTypes.bool,
}
