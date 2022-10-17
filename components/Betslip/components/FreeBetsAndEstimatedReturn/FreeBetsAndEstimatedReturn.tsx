import React from 'react';
import Image from 'next/image';
import classnames from 'classnames';
import { useDispatch } from 'react-redux';

import { Actions } from '../../../../project/common';
import Button from '../../../base/inputs/Button';
import { EstimatedReturnsAndStakeInterface, FreeBetSelectionInterface } from '../../../interfaces';

import styles from './FreeBetsAndEstimatedReturn.module.scss';

interface FreeBetsAndEstimatedReturnInterface extends
    EstimatedReturnsAndStakeInterface, FreeBetSelectionInterface {
    betType: string;
    isDisabled: boolean;
}

export const FreeBetsAndEstimatedReturn = ({
    currencySign,
    value: estimatedReturn,
    optionId,
    freeBetId,
    freeBetStake,
    isStraightLineBet = true,
    areAllFreeBetsSelected,
    areFreeBetsAvailable,
    openModalForSpecificOption,
    betType,
    isDisabled,
}: FreeBetsAndEstimatedReturnInterface): JSX.Element => {
    const dispatch = useDispatch();

    return (
        <div
            className = {styles['free-bets-er__free-bets-estimate-return']}
            data-testid = {`Container__${betType}ItemFreeBetsAndEstimatedReturns`}
        >
            {areFreeBetsAvailable && !freeBetId && (
                <Button
                    className = {classnames(
                        styles['free-bets-er__toggle-free-bet-modal'],
                        {
                            [styles['free-bets-er__toggle-free-bet-modal--disabled']]:
                                areAllFreeBetsSelected || !isStraightLineBet,
                        },
                    )}
                    styleType = ""
                    onClick = {() => openModalForSpecificOption(optionId)}
                    data-testid = {`Button__${betType}ItemToggleFreeBet`}
                >
                    Use your Free Bet
                    <Image
                        src = {`/svgs/chevron_right_${
                            areAllFreeBetsSelected || !isStraightLineBet ? 'grey_secondary' : 'red'
                        }.svg`}
                        width = {6}
                        height = {9}
                    />
                </Button>
            )}
            {freeBetId && (
                <div
                    className = {styles['free-bets-er__remove-selected-free-bet']}
                    data-testid = {`Text__${betType}ItemSelectedFreeBet`}
                >
                    <span data-testid = {`Text__${betType}ItemFreeBet`}>
                        + {currencySign}{freeBetStake} free bet
                    </span>
                    <button
                        onClick = {() => dispatch(Actions.removeFreeBetSelection(
                            optionId,
                            currencySign,
                        ))}
                        data-testid = {`Button__${betType}ItemRemoveFreeBet`}
                        type = "button"
                    >
                        <Image
                            src = "/svgs/cross_fast_orange_darker.svg"
                            width = {12}
                            height = {12}
                        />
                    </button>
                </div>
            )}
            <div
                className = {classnames(
                    styles['free-bets-er__returns'],
                    {
                        [styles['free-bets-er__returns--disabled']]: isDisabled,
                    },
                )}
                data-testid = {`Container__${betType}ItemReturns`}
            >
                <span
                    className = {styles['free-bets-er__returns-label']}
                    data-testid = {`Text__${betType}ItemReturns`}
                >
                    Estimated returns
                </span>
                <div
                    className = {styles['free-bets-er__returns-ammount']}
                    data-testid = {`Container__${betType}ItemReturnsAmount`}
                >
                    <span
                        className = {styles['free-bets-er__returns-currency']}
                        data-testid = {`Text__${betType}ItemReturnsAmountCurrency`}
                    >
                        {currencySign}
                    </span>
                    <span
                        className = {styles['free-bets-er__returns-value']}
                        data-testid = {`Text__${betType}ItemReturnsAmountValue`}
                    >
                        {estimatedReturn}
                    </span>
                </div>
            </div>
        </div>
    )
}
