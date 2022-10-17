import React from 'react';
import classnames from 'classnames';
import { useDispatch } from 'react-redux';

import { Actions } from '../../../../project/common';

import { useBreakPoint } from '../../../contexts/BreakPointContext';
import OptionsError from '../OptionsError';
import Button from '../../../base/inputs/Button';
import { BetslipEstimatedReturnInterface } from '../../../interfaces';

import { Constants } from '../../../../project/constants';

import {
    cleanValue,
    formatValue,
    padTrimValue,
} from '../StakeInput/utils';

import styles from './OptionsFooter.module.scss';

const { ERROR_CODES } = Constants;

export const OptionsFooter = ({
    totalEstimatedReturns: {
        currencySign,
        value: totalEstimatedReturnsValue,
    },
    totalStake: {
        value: totalCashStake,
    },
    totalFreeBetsStake: {
        value: totalFreeBetsValue,
    },
    combinedStake: {
        value: combinedStakeValue,
    },
    bookmakerName,
    selectedOption,
    betSelectionsCount,
    canPlaceBet,
    error,
    selectionError,
    toggleBetReceipt,
}: BetslipEstimatedReturnInterface): JSX.Element => {
    const { isMobile } = useBreakPoint();
    const dispatch = useDispatch();

    const EST_RETURNS_LIMIT = 1000000;
    const cleanedValue = parseFloat(cleanValue(totalEstimatedReturnsValue));
    let currentTotalEstReturns = totalEstimatedReturnsValue;

    if (cleanedValue > EST_RETURNS_LIMIT) {
        const paddedValue = padTrimValue(EST_RETURNS_LIMIT)
        currentTotalEstReturns = formatValue(paddedValue);
    }

    return (
        <>
            <div
                id = "bs-options-footer__keyboard"
                data-testid = "Container__OptionsFooterKeyboard"
            />
            {
                (!isMobile || !selectedOption) && (
                    <>
                        {
                            error &&
                            error.type !== ERROR_CODES.FORBIDDEN &&
                            error.type !== ERROR_CODES.FREE_BET_ERROR && (
                                <OptionsError
                                    error = {error}
                                    betSelectionsCount = {betSelectionsCount}
                                    bookmakerName = {bookmakerName}
                                />
                            )
                        }
                        <div
                            className = {styles['bs-options-footer']}
                            data-testid = "Container__OptionsFooter"
                        >
                            <div
                                className = {styles['bs-options-footer__main']}
                                data-testid = "Container__OptionsFooterMain"
                            >
                                <div
                                    className = {styles['bs-options-footer__main-group']}
                                    data-testid = "Container__OptionsFooterTotalStake"
                                >
                                    <p
                                        className = {styles['bs-options-footer__main-group-label']}
                                        data-testid = "Text__OptionsFooterTotalStakeLabel"
                                    >
                                        Total stake
                                    </p>
                                    <p
                                        className = {styles['bs-options-footer__main-group-value']}
                                        data-testid = "Text__OptionsFooterTotalStakeValue"
                                    >
                                        {currencySign} {totalCashStake}
                                    </p>
                                    {Number(totalFreeBetsValue) > 0 && (
                                        <p
                                            className = {
                                                styles['bs-options-footer__main-group-free-bets']
                                            }
                                            data-testid = "Text__OptionsFooterTotalFreeBetsStake"
                                        >
                                            + {currencySign} {totalFreeBetsValue} free bet
                                        </p>
                                    )}
                                </div>
                                <div
                                    className = {styles['bs-options-footer__main-group']}
                                    data-testid = "Container__OptionsFooterEstimatedReturn"
                                >
                                    <span
                                        className = {styles['bs-options-footer__main-group-label']}
                                        data-testid = "Text__OptionsFooterEstimatedReturnLabel"
                                    >
                                        Estimated returns
                                    </span>
                                    <div
                                        className = {styles['bs-options-footer__main-group-value']}
                                        data-testid = "Container__OptionsFooterEstimatedReturnValue"
                                    >
                                        {currencySign ? (
                                            <>
                                                <span
                                                    className = {
                                                        styles[
                                                            'bs-options-footer__' +
                                                            'est-returns-currency'
                                                        ]
                                                    }
                                                    data-testid =
                                                        "Text__OptionsFooterEstimatedReturnCurrency"
                                                >
                                                    {currencySign}
                                                </span>
                                                <span
                                                    className = {
                                                        styles[
                                                            'bs-options-footer__est-returns-value'
                                                        ]
                                                    }
                                                    data-testid =
                                                        "Text__OptionsFooterEstimatedReturnValue"
                                                >
                                                    {currentTotalEstReturns}
                                                </span>
                                            </>
                                        ) : (
                                            <span
                                                className = {
                                                    classnames(
                                                        styles[
                                                            'bs-options-footer__est-returns-value'
                                                        ],
                                                        styles[
                                                            'bs-options-footer__est-returns-value' +
                                                            '--na'
                                                        ],
                                                    )
                                                }
                                                data-testid =
                                                    "Text__OptionsFooterEstimatedReturnsValue"
                                            >
                                                {totalEstimatedReturnsValue}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div
                                className = {styles['bs-options-footer__secondary']}
                                data-testid = "Container__OptionsFooterSecondary"
                            >
                                {
                                    selectionError &&
                                    selectionError.type === ERROR_CODES.PRICE_CHANGED ?
                                        (
                                            <Button
                                                type = "button"
                                                styleType = "primary-yellow"
                                                className = {
                                                    styles['bs-options-footer__accept-odds-button']
                                                }
                                                onClick = {() => {
                                                    dispatch(Actions.acceptPriceChanges())
                                                }}
                                                data-testid = "Button__OptionsFooterAcceptOdds"
                                            >
                                                Accept odds changes
                                            </Button>
                                        ) :
                                        (
                                            <Button
                                                type = "button"
                                                className = {
                                                    styles['bs-options-footer__place-bet-button']
                                                }
                                                onClick = {() => {
                                                    dispatch(Actions.placeBet());
                                                    toggleBetReceipt();
                                                }}
                                                isDisabled = {
                                                    parseFloat(combinedStakeValue) === 0 ||
                                                    !canPlaceBet ||
                                                    Boolean(error)
                                                }
                                                data-testid = "Button__OptionsFooterPlaceBet"
                                            >
                                                Place bet
                                            </Button>
                                        )
                                }
                            </div>
                        </div>
                    </>

                )
            }
        </>
    )
};
