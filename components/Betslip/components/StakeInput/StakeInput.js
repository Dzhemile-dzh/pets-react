import { memo, useCallback } from 'react'
import propTypes from 'prop-types';
import classnames from 'classnames';
import { useDispatch } from 'react-redux';
import { Actions } from '../../../../project/common';

import { useBreakPoint } from '../../../contexts/BreakPointContext';
import { DesktopStakeInputMemo as DesktopStakeInput } from './DesktopStakeInput';
import { MobileStakeInputMemo as MobileStakeInput } from './MobileStakeInput';

import styles from './StakeInput.module.scss';

export function StakeInput({
    betStake,
    optionId,
    currencySign,
    selectOption,
    selectedOption,
    userBalance,
    isDisabled,
    error,
}) {
    const dispatch = useDispatch();

    const { isMobile } = useBreakPoint();
    const prefix = `${currencySign || '£'} `;
    const LIMIT = 99999.99;

    const updateCurrentStake = useCallback((value) => {
        const floatValue = parseFloat(value);
        if (betStake !== floatValue) {
            dispatch(Actions.updateStake(optionId, floatValue, userBalance, currencySign))
        }
    }, [betStake, currencySign, dispatch, optionId, userBalance])

    return (
        <div
            className = {classnames(
                styles['bs-stake-input'],
                {
                    [styles['bs-stake-input--error']]: error,
                },
            )}
            data-testid = "Container__StakeInput"
        >
            {
                isMobile ? (
                    <MobileStakeInput
                        betStake = {betStake}
                        optionId = {optionId}
                        prefix = {prefix}
                        selectOption = {selectOption}
                        updateCurrentStake = {updateCurrentStake}
                        isSelected = {selectedOption === optionId}
                        limit = {LIMIT}
                        isDisabled = {isDisabled}
                    />
                ) : (
                    <DesktopStakeInput
                        betStake = {betStake}
                        optionId = {optionId}
                        updateCurrentStake = {updateCurrentStake}
                        selectOption = {selectOption}
                        prefix = {prefix}
                        limit = {LIMIT}
                        isDisabled = {isDisabled}
                    />
                )
            }
        </div>
    )
}

export const StakeInputMemo = memo(StakeInput);

StakeInput.propTypes = {
    betStake: propTypes.number.isRequired,
    selectOption: propTypes.func.isRequired,
    optionId: propTypes.string.isRequired,
    currencySign: propTypes.string,
    selectedOption: propTypes.string,
    userBalance: propTypes.number,
    error: propTypes.object,
    isDisabled: propTypes.bool,
}
