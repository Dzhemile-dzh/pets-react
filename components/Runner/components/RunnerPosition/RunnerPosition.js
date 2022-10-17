import React from 'react'
import propTypes from 'prop-types';
import { subscript } from '../../../../project/utils/subscriptUtils';

import styles from './RunnerPosition.module.scss';

export const RunnerPosition = ({ place, isNonRunner, saddleClothNumber }) => {
    return (
        place && (
            <div
                className = {styles['runner-position']}
            >
                <span className = {styles['runner-position__place']}>
                    {isNonRunner ? saddleClothNumber : place}
                </span>
                    {!isNonRunner && (
                        <sup className = {styles['runner-position__sup']}>
                            {subscript(place)}
                        </sup>
                    )}
            </div>
        )
    )
}

RunnerPosition.propTypes = {
    place: propTypes.string.isRequired,
    isNonRunner: propTypes.bool.isRequired,
    saddleClothNumber: propTypes.string.isRequired,
}
