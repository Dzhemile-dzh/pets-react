import {
    useState, useEffect, useRef, memo,
} from 'react'
import propTypes from 'prop-types';

import Image from 'next/image';
import {
    cleanValue,
    formatValue,
    getFormattedStake,
} from './utils';

import styles from './StakeInput.module.scss';

export function DesktopStakeInput({
    betStake,
    optionId,
    updateCurrentStake,
    prefix,
    selectOption,
    limit,
    isDisabled,
}) {
    const [stake, setStake] = useState(getFormattedStake(betStake, prefix));
    const [cursor, setCursor] = useState(0);
    const inputRef = useRef(null);

    // NOTE:
    // In case the prefix is changed after the betslip is opened
    useEffect(() => {
        setStake(getFormattedStake(betStake, prefix))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [prefix]);

    useEffect(() => {
        if (inputRef &&
            inputRef.current &&
            document.activeElement === inputRef.current) {
            inputRef.current.setSelectionRange(cursor, cursor);
        }
    }, [cursor, inputRef, stake]);

    const setEmptyStake = () => {
        updateCurrentStake(0);
        setStake('');
    }

    const handleRemoveStakeClick = () => {
        if (isDisabled) return;
        updateCurrentStake(0);
        setStake(formatValue('0.00', prefix))
    }

    const handleInputFocus = () => {
        selectOption && selectOption(optionId);

        const value = cleanValue(stake, prefix);

        if (parseFloat(value) === 0) {
            setEmptyStake();
        }
    }

    const handleInputOnChange = ({
        target: { selectionStart, value },
    }) => {
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

            if (selectionStart) {
                // NOTE:
                // Since we have a space after the prefix we need to calculate the cursor
                // Or put it to minimum 2
                // If we didn't had space => minimum 1
                let currentCursor = selectionStart + (formattedValue.length - value.length);
                if (currentCursor < 2) {
                    currentCursor = 2;
                }

                // NOTE:
                // We need to calculate the cursor to be after the decimal point as well
                // When the value is between 0 and 1 and have 2 decimal points
                // We just need to move the cursor with 1 position further
                if (parseFloat(cleanedValue) > 0 &&
                    parseFloat(cleanedValue) < 1 &&
                    formattedValue.length === 6) {
                    currentCursor++;
                }

                setCursor(currentCursor);
            }
            setStake(formattedValue)
            updateCurrentStake(cleanedValue)
        }
    }

    const handleInputOnBlur = () => {
        selectOption && selectOption();
        const formattedValue = getFormattedStake(stake, prefix);
        setStake(formattedValue);
    }

    return (
        <div
            className = {styles['bs-stake-input__field-wrapper']}
            data-testid = "Container__StakeInputField"
        >
            <input
                id = {optionId}
                className = {styles['bs-stake-input__field']}
                inputMode = "decimal"
                name = "bs-stake-input[]"
                autoComplete = "off"
                onFocus = {handleInputFocus}
                onChange = {handleInputOnChange}
                onBlur = {handleInputOnBlur}
                ref = {inputRef}
                value = {stake}
                disabled = {isDisabled}
                data-testid = "Input__StakeInput"
            />
            <button
                className = {styles['bs-stake-input__button-remove']}
                onClick = {handleRemoveStakeClick}
                data-testid = "Button__StakeInputDelete"
                type = "button"
            >
                <div className = {styles['bs-stake-input__icon']}>
                    <Image
                        src = "/svgs/delete_stake.svg"
                        width = {18}
                        height = {18}
                    />
                </div>
            </button>
        </div>
    )
}

export const DesktopStakeInputMemo = memo(DesktopStakeInput);

DesktopStakeInput.propTypes = {
    betStake: propTypes.number.isRequired,
    updateCurrentStake: propTypes.func.isRequired,
    optionId: propTypes.string.isRequired,
    selectOption: propTypes.func.isRequired,
    prefix: propTypes.string.isRequired,
    limit: propTypes.number.isRequired,
    isDisabled: propTypes.bool,
}
