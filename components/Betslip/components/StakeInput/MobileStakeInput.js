import React, { useState, useEffect, memo } from 'react'
import propTypes from 'prop-types';
import classnames from 'classnames';

import {
    cleanValue,
    formatValue,
    padTrimValue,
    getFormattedStake,
} from './utils';

import Button from '../../../base/inputs/Button';
import { MinusIcon } from '../../../base/Icons/MinusIcon';
import { PlusIcon } from '../../../base/Icons/PlusIcon';

import StakeKeyboard from '../StakeKeyboard';

import styles from './StakeInput.module.scss';

export function MobileStakeInput({
    betStake,
    prefix,
    optionId,
    selectOption,
    updateCurrentStake,
    isSelected,
    limit,
    isDisabled,
}) {
    const PORTRAIT_ORIENTATION = 'portrait';
    const LANDSCAPE_ORIENTATION = 'landscape';

    const [stake, setStake] = useState(getFormattedStake(betStake, prefix));

    const currentOrientation = isLandscape() ? LANDSCAPE_ORIENTATION : PORTRAIT_ORIENTATION
    const [orientation, setOrientation] = useState(currentOrientation)

    // NOTE:
    // In case the prefix is changed after the betslip is opened
    useEffect(() => {
        setStake(getFormattedStake(betStake, prefix))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [prefix]);

    useEffect(() => {
        window.addEventListener('orientationchange', handleOrientationChange);
        return () => {
            window.removeEventListener('orientationchange', handleOrientationChange);
        }
    });

    function isLandscape() {
        return window.orientation === -90 || window.orientation === 90;
    }

    const handleOrientationChange = () => {
        return isLandscape() ?
            setOrientation(LANDSCAPE_ORIENTATION) : setOrientation(PORTRAIT_ORIENTATION)
    }

    const decreaseStakeClick = () => {
        const decreasedValue = betStake - 1;
        const shouldChange = decreasedValue >= 0;
        handleStakeClickChange(decreasedValue, shouldChange, 0)
    }

    const increaseStakeClick = () => {
        const increasedStake = betStake + 1;
        const shouldChange = increasedStake <= limit
        handleStakeClickChange(increasedStake, shouldChange, limit)
    }

    const handleStakeClickChange = (value, shouldChange, defaultValue) => {
        const currentValue = shouldChange ? value : defaultValue;

        const paddedValue = padTrimValue(currentValue)
        const formattedValue = formatValue(paddedValue, prefix);

        setStake(formattedValue);
        updateCurrentStake(currentValue);
    }

    const setEmptyStake = () => {
        updateCurrentStake(0);
        setStake('');
    }

    const handleInputFocus = (event) => {
        selectOption && selectOption(optionId);
        // NOTE:
        // Adding blur effect to hide iOS versions <13 default keyboard
        event.target.blur()
        setEmptyStake();
    }

    const handleStakeChange = (value) => {
        let cleanedValue = cleanValue(value, prefix)

        if (!cleanedValue) {
            setEmptyStake()
            return;
        }

        if (!Number.isNaN(cleanedValue) && cleanedValue >= 0) {
            if (parseFloat(cleanedValue) > limit) {
                cleanedValue = limit;
            }
            const formattedValue = formatValue(cleanedValue, prefix);

            updateCurrentStake(cleanedValue)
            setStake(formattedValue);
        }
    }

    const closeKeyboard = () => {
        selectOption && selectOption()
        const formattedValue = getFormattedStake(stake, prefix);
        setStake(formattedValue)
    }

    const addQuickValue = (value) => {
        const cleanedValue = cleanValue(stake, prefix)
        const newStake = parseFloat(cleanedValue) + value;
        handleStakeChange(newStake);
    }

    const addValueToStake = (value) => {
        const newValue = `${stake || ''}${value}`;
        handleStakeChange(newValue);
    }

    return (
        <>
            <Button
                styleType = "tertiary-icon"
                className = {classnames(
                    styles['bs-stake-input__button'],
                    styles['bs-stake-input__button--decrease'],
                )}
                onClick = {decreaseStakeClick}
                data-testid = "Button__StakeInputDecrease"
            >
                <MinusIcon />
            </Button>
            <input
                id = {optionId}
                type = "text"
                className = {styles['bs-stake-input__field']}
                inputMode = "none"
                name = "bs-stake-input[]"
                autoComplete = "off"
                onFocus = {handleInputFocus}
                onChange = {() => {}}
                value = {stake}
                disabled = {isDisabled}
                data-testid = "Input__StakeInput"
            />
            <Button
                styleType = "tertiary-icon"
                className = {classnames(
                    styles['bs-stake-input__button'],
                    styles['bs-stake-input__button--increase'],
                )}
                onClick = {increaseStakeClick}
                data-testid = "Button__StakeInputIncrease"
            >
                <PlusIcon />
            </Button>
            {
                isSelected && (
                    <StakeKeyboard
                        selectedOption = {optionId}
                        orientation = {orientation}
                        closeKeyboard = {closeKeyboard}
                        addQuickValue = {addQuickValue}
                        addValueToStake = {addValueToStake}
                        removeStake = {() => setEmptyStake()}
                    />
                )
            }
        </>
    )
}

export const MobileStakeInputMemo = memo(MobileStakeInput);

MobileStakeInput.propTypes = {
    betStake: propTypes.number.isRequired,
    prefix: propTypes.string.isRequired,
    optionId: propTypes.string.isRequired,
    selectOption: propTypes.func.isRequired,
    updateCurrentStake: propTypes.func.isRequired,
    isSelected: propTypes.bool.isRequired,
    limit: propTypes.number.isRequired,
    isDisabled: propTypes.bool,
}
