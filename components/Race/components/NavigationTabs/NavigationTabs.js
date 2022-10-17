/* eslint-disable max-len */
import React from 'react';
import classnames from 'classnames';
import propTypes from 'prop-types';
import Link from 'next/link';
import Button from '../../../base/inputs/Button/index.tsx';
import { convertToPascalCase } from '../../../../project/utils/formatUtils';

import styles from './NavigationTabs.module.scss';

export const NavigationTabs = ({ url, tabs, activeTab }) => (
    <nav
        className = {styles['navigation-tabs__container']}
        data-testid = "Container__NavigationTabsContainer"
    >
        <div
            className = {styles['navigation-tabs__container-wrapper']}
        >
            <ul
                className = {styles['navigation-tabs']}
                data-testid = "Container__NavigationTabs"
            >
                {tabs.map((tab, index) => {
                    const tabClassName = classnames(
                        styles['navigation-tabs__tab'],
                        {
                            [styles['navigation-tabs__tab--active']]: activeTab === tab,
                        },
                    );
                    return (
                        <li
                            key = {index}
                            className = {tabClassName}
                            tabname = {tab}
                            data-testid = {`Container__NavigationTabs${convertToPascalCase(tab)}`}
                        >
                            <Link
                                href = {`${url}${tab !== 'racecard' ? `/${tab.replaceAll(' ', '-')}` : ''}`}
                                shallow
                            >
                                <a data-testid = "Link__NavigationTab">
                                    <hr />
                                    <span data-testid = "Text__NavigationTab">
                                        {tab}
                                    </span>
                                </a>
                            </Link>
                        </li>
                    )
                })}
            </ul>
            <Button
                styleType = "tertiary-icon"
                size = "tiny"
                className = {styles['navigation-tabs__btn']}
            >
                Jump to race data
            </Button>
        </div>
    </nav>
);

NavigationTabs.propTypes = {
    url: propTypes.string,
    activeTab: propTypes.string,
    tabs: propTypes.array,
}
