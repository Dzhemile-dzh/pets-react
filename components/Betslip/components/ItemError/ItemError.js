import React from 'react';
import propTypes from 'prop-types';
import Image from 'next/image';
import classnames from 'classnames';
import { Constants } from '../../../../project/constants';

import { betslipErrorBuildBetEvent } from '../../../../project/segmentEvents';
import { usePrevious } from '../../../custom-hooks/usePrevious';

import styles from './ItemError.module.scss';

const { ERROR_CODES } = Constants;

export const ItemError = ({ error, betSelectionsCount, bookmakerName }) => {
    const prevError = usePrevious(error);

    // Note: currently we should only trigger the event for bet selections of type 'single';
    // will add handling for multiples in the future, once a story is created
    if (error.type !== ERROR_CODES.PRICE_CHANGED &&
        (prevError?.type !== error.type || prevError?.message !== error.message) &&
        betSelectionsCount) {
        betslipErrorBuildBetEvent({
            bookmakerName,
            betslipError: error,
            betSelectionsCount,
        });
    }

    const errorType = error.type === ERROR_CODES.PRICE_CHANGED ? 'warning' : 'critical';

    const errorClassName = classnames(
        styles['bs-single-item-error'],
        styles[`bs-single-item-error--${errorType}`],
    );

    return (
        <div
            className = {errorClassName}
            data-testid = "Container__SingleItemError"
        >
            {errorType === 'warning' ? (
                <Image
                    src = "/svgs/info_white.svg"
                    width = {24}
                    height = {24}
                    data-testid = "Icon__SingleItemWarning"

                />
            ) : (
                <Image
                    src = "/svgs/exclamation_white.svg"
                    width = {24}
                    height = {24}
                    data-testid = "Icon__SingleItemError"
                />
            )}
            <p data-testid = "Text__SingleItemError">{error.message}</p>
        </div>
    )
}

ItemError.propTypes = {
    error: propTypes.shape({
        type: propTypes.string,
        message: propTypes.string,
    }),
    betSelectionsCount: propTypes.number,
    bookmakerName: propTypes.string,
}
