import React from 'react';
import propTypes from 'prop-types';
import classnames from 'classnames';
import styles from './StartingPrice.module.scss';

export const StartingPrice = ({ isFav, startingPrice, shouldDisplayLabel }) => {
    return (
        <div className = {classnames(styles['starting-price'], styles['reader-only__parent'])}>
            {
                shouldDisplayLabel && (
                    <div
                        className = {styles['starting-price__label']}
                        aria-hidden = "true"
                    >
                        Starting price
                    </div>
                )
            }
            {
                isFav && (
                    <span className = {styles['starting-price__fav']} aria-hidden = "true">
                        FAV
                    </span>
                )
            }
            <span aria-hidden = "true">{startingPrice}</span>
        </div>
    );
}

StartingPrice.propTypes = {
    isFav: propTypes.bool,
    startingPrice: propTypes.string,
    shouldDisplayLabel: propTypes.bool,
};

StartingPrice.defaultProps = {
    shouldDisplayLabel: true,
}
