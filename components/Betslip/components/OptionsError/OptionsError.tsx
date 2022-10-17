import React from 'react';
import Image from 'next/image';
import Button from '../../../base/inputs/Button';
import { betslipErrorBuildBetEvent } from '../../../../project/segmentEvents';
import { Constants } from '../../../../project/constants';
import { usePrevious } from '../../../custom-hooks/usePrevious';
import {
    BetOptionsInterface,
    ErrorInterface,
} from '../../../interfaces';

import styles from './OptionsError.module.scss';

const { ERROR_CODES } = Constants;

const errorTypes = {
    [ERROR_CODES.INSUFFICIENT_FUNDS]: {
        btnText: 'Deposit funds',
        btnOnClick: () => 'Deposit funds clicked',
    },
};

export const OptionsError = ({
    error,
    betSelectionsCount,
    bookmakerName,
}: BetOptionsInterface & ErrorInterface): JSX.Element => {
    const prevError = usePrevious(error);

    if (error.type !== ERROR_CODES.PRICE_CHANGED &&
        (prevError?.type !== error.type || prevError?.message !== error.message)) {
        betslipErrorBuildBetEvent({
            bookmakerName,
            betslipError: error,
            betSelectionsCount,
        });
    }

    return (
        <div
            className = {styles['bs-options-error']}
            data-testid = "Container__OptionsError"
        >
            <div
                className = {styles['bs-options-error__message']}
                data-testid = "Container__OptionsErrorMessage"
            >
                <Image
                    src = "/svgs/exclamation_white.svg"
                    width = {24}
                    height = {24}
                    data-testid = "Icon__OptionsError"
                />
                <p data-testid = "Text__OptionsErrorMessage">{error.message}</p>
            </div>
            {errorTypes[error.type] && (
                <Button
                    className = {styles['bs-options-error__button']}
                    styleType = "secondary"
                    onClick = {errorTypes[error.type].btnOnClick}
                    data-testid = "Button__OptionsError"
                >
                    {errorTypes[error.type].btnText}
                </Button>
            )}
        </div>
    )
};
