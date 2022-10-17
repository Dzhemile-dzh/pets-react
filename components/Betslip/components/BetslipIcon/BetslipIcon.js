import React, { PureComponent } from 'react';
import propTypes from 'prop-types';
import classnames from 'classnames';
import Image from 'next/image';

import styles from './BetslipIcon.module.scss';

export class BetslipIcon extends PureComponent {
    render() {
        const { type, count, clickHandler } = this.props;

        return (
            <div
                className = {classnames(
                    styles['bs-icon'],
                    styles[`bs-icon--${type}`],
                )}
                onClick = {clickHandler}
                data-testid = "Container__BetslipIcon"
            >
                <Image
                    src = "/svgs/betslip.svg"
                    width = {28}
                    height = {28}
                    data-testid = "Icon__BetslipIcon"
                />
                {type === 'counter' && count > 0 && (
                    <div
                        className = {styles['bs-icon__count']}
                        data-testid = "Icon__BetslipIconCount"
                    >
                        {count}
                    </div>
                )}
            </div>
        )
    }
}

BetslipIcon.propTypes = {
    type: propTypes.string.isRequired,
    count: propTypes.number,
    clickHandler: propTypes.func,
}

BetslipIcon.defaultProps = {
    count: 0,
    clickHandler: () => {},
}
