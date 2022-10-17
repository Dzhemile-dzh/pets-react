import React from 'react';
import propTypes from 'prop-types';
import classnames from 'classnames';

import BetslipIcon from '../BetslipIcon';

import styles from './BetslipTabs.module.scss';

export const BetslipTabs = ({
    isOpened,
    toggleBetslip,
    selectionCount,
}) => {
    const renderSelectedTabShadow = (key) => {
        // NOTE: pass key of selected tab to render a shadow
        return (
            <div
                className = {classnames(
                    styles['bs-tabs__item'],
                    styles['bs-tabs__item--active'],
                    styles[`bs-tabs__item--shadow-${key}`],
                )}
                data-testid = "Container__BetslipTabsItemSelected"
            />
        )
    }

    return (
        <nav
            className = {styles['bs-tabs']}
            data-testid = "Container__BetslipTabs"
        >
            <ul
                className = {styles['bs-tabs__items']}
                data-testid = "List__BetslipTabsItems"
            >
                <li
                    key = {1}
                    className = {classnames(
                        styles['bs-tabs__item'],
                        {
                            [styles['bs-tabs__item--inactive']]: selectionCount === 0,
                        },
                        {
                            [styles['bs-tabs__item--active']]: selectionCount > 0,
                        },
                        {
                            [styles['bs-tabs__item--selected']]: selectionCount > 0,
                        },
                    )}
                    onClick = {() => {
                        if (selectionCount > 0 && !isOpened) {
                            toggleBetslip();
                        }
                    }}
                    data-testid = "Container__BetslipTabsItemFirst"
                >
                    {selectionCount > 0 &&
                        (
                            <BetslipIcon
                                type = "counter"
                                count = {selectionCount}
                            />
                        )}
                </li>
                <li
                    key = {2}
                    className = {classnames(
                        styles['bs-tabs__item--inactive'],
                        styles['bs-tabs__item'],
                    )}
                    data-testid = "Container__BetslipTabsItemSecond"
                />
                <li
                    key = {3}
                    className = {classnames(
                        styles['bs-tabs__item--inactive'],
                        styles['bs-tabs__item'],
                    )}
                    data-testid = "Container__BetslipTabsItemThird"
                />
            </ul>
            {selectionCount > 0 && renderSelectedTabShadow(1)}
        </nav>
    )
}

BetslipTabs.displayName = 'BetslipTabs';

BetslipTabs.propTypes = {
    isOpened: propTypes.bool.isRequired,
    toggleBetslip: propTypes.func.isRequired,
    selectionCount: propTypes.number.isRequired,
}
