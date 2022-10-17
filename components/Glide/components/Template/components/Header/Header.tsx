import React from 'react'
import Link from 'next/link';
import { PartialLogoIcon } from '../../../../../base/Icons/PartialLogoIcon';
import { ChevronIcon } from '../../../../../base/Icons/ChevronIcon';

import styles from './Header.module.scss';

export const Header = () : JSX.Element => (
    <div
        className = {styles.header}
        data-testid = "Container__Header"
    >
        <div className = {styles.header__container}>
            <div className = {styles.header__title}>
                <div className = {styles.header__icon}>
                    <PartialLogoIcon />
                </div>
                <span
                    className = {styles['header__title-text']}
                    data-testid = "Text__HeaderTitle"
                >
                    News
                </span>
            </div>
            <div className = {styles['header__link-container']}>
                <Link href = "/horse-racing/news">
                    <a
                        className = {styles.header__link}
                        data-testid = "Link__AllNews"
                    >
                        <span className = {styles['header__link-text']}>
                            All news
                        </span>
                        <div className = {styles['header__link-icon']}>
                            <ChevronIcon color = "primary" size = "small" />
                        </div>
                    </a>
                </Link>
            </div>
        </div>
    </div>
)
