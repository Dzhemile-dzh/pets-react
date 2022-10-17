import React, { PureComponent } from 'react';
import propTypes from 'prop-types';
import classnames from 'classnames';

import BookmakerIcon from '../../../base/BookmakerIcon';

import styles from './BookmakerThumb.module.scss';

export class BookmakerThumb extends PureComponent {
    render() {
        const { size, bookmakerName, className } = this.props;
        return (
            <div
                className = {classnames(
                    styles['bs-bookmaker-thumb'],
                    styles[`bs-bookmaker-thumb--${size}`],
                    styles[`bs-bookmaker-thumb--${bookmakerName}`],
                    className,
                )}
                data-testid = "Container__BookmakerThumb"
            >
                <BookmakerIcon name = {bookmakerName} dataTestId = {`Icon__${bookmakerName}`} />
            </div>
        )
    }
}

BookmakerThumb.defaultProps = {
    size: 'large',
}

BookmakerThumb.propTypes = {
    bookmakerName: propTypes.string.isRequired,
    size: propTypes.string,
}
