import React from 'react';
import classnames from 'classnames';

import styles from './AdvertisementPlaceholder.module.scss';

interface AdvertisementPlaceholderInterface {
    className?: string;
}

export const AdvertisementPlaceholder = ({
    className,
}: AdvertisementPlaceholderInterface): JSX.Element => (
    <div
        className = {classnames(
            styles['ad-placeholder'],
            className,
        )}
        data-testid = "Conainer__AdvertisementPlaceholder"
    >
        <span className = {styles['ad-placeholder__label']}>
            Advertisement
        </span>
        <div className = {styles['ad-placeholder__container']} />
    </div>
)
