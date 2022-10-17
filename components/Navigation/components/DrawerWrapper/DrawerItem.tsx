import React from 'react';
import classnames from 'classnames';

import HybridLink from '@components/base/HybridLink';
import Image from 'next/image';
import { formatHybridNavigationItemWithPrefTab } from '@project/utils/formatUtils';
import styles from './DrawerWrapper.module.scss';

interface DrawerItemProps {
    isActive: boolean;
    item: {
        id: number,
        path: string,
        text: string,
        info: string,
        openInNewTab?: boolean,
    };
    dataTestId: string;
}

export const DrawerItem = ({ isActive, item, dataTestId }: DrawerItemProps) => (
    <li
        className = {classnames(
            styles['drawer__list-item'],
            {
                [styles['drawer__list-item-active']]: isActive,
            },
        )}
        data-testid = {dataTestId}
    >
        <HybridLink
            hybridUrl = {formatHybridNavigationItemWithPrefTab(item.path)}
            url = {item.path}
            openInNewTab = {item.openInNewTab}
            availableClassName = {styles['drawer__list-item-link']}
            availableDataTestId = "Button__DrawerItemLink"
        >
            {isActive &&
                    (
                        <span
                            className = {styles['drawer__list-item-active-indicator']}
                            data-testid = "Indicator__DrawerItemActive"
                        />
                    )}
            <span
                className = {classnames(
                    styles['drawer__list-item-text'],
                    {
                        [styles['drawer__list-item-active-text']]: isActive,
                    },
                )}
                data-testid = "Text__DrawerItemText"
            >
                {item.text}
            </span>
            {item.info &&
                    (
                        <span
                            className = {styles['drawer__list-item-info']}
                            data-testid = "Text__DrawerItemInfo"
                        >
                            {item.info}
                        </span>
                    )}
        </HybridLink>
        <span className = {styles['drawer__link-icon']}>
            { item.id === 1 ? (
                <Image
                    src = "/svgs/login_icon_mobile.svg"
                    width = {22}
                    height = {20}
                />
            ) : (
                <Image
                    src = "/svgs/chevron_right_black_small.svg"
                    width = {10}
                    height = {6}
                />
            ) }
        </span>
    </li>
)
