import React from 'react'
import propTypes from 'prop-types'
import classnames from 'classnames';
import { PartialLogoIcon } from '../../../base/Icons/PartialLogoIcon';

import styles from './RaceIndexHeader.module.scss';

export const RaceIndexHeader = ({
    headerTitle,
    pageType,
}) => {
    return (
        <section
            className = {styles['race-index-header']}
            data-testid = "Container__RaceIndexHeader"
        >
            <div
                className = {styles['race-index-header__content']}
                data-testid = "Container__RaceIndexHeaderContent"
            >
                <div
                    className = {classnames(
                        styles['race-index-header__main'],
                        {
                            [styles['race-index-header__main--todays-page']]: pageType === '/today',
                        },
                    )}
                    data-testid = "Container__RaceIndexHeaderMain"
                >
                    <div
                        className = {styles['race-index-header__heading']}
                        data-testid = "Container__RaceIndexHeading"
                    >
                        <PartialLogoIcon
                            className = {styles['race-index-header__logo']}
                        />
                        <h1
                            className = {styles['race-index-header__title']}
                            data-testid = "Text__RaceIndexHeader"
                        >
                            {headerTitle}
                        </h1>
                    </div>
                </div>
            </div>
        </section>
    )
}

RaceIndexHeader.propTypes = {
    headerTitle: propTypes.string.isRequired,
    pageType: propTypes.string,
}
