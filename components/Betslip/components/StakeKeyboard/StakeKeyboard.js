import React, {
    useEffect, useRef, memo, useCallback,
} from 'react';
import { createPortal } from 'react-dom';
import propTypes from 'prop-types';
import classnames from 'classnames';

import StakeKeyBoardPortrait from './components/StakeKeyBoardPortrait';
import StakeKeyBoardLandscape from './components/StakeKeyBoardLandscape';

import styles from './StakeKeyboard.module.scss';

export function StakeKeyboard({
    closeKeyboard,
    selectedOption,
    addQuickValue,
    addValueToStake,
    removeStake,
    orientation,
}) {
    const wrapperRef = useRef();

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    });

    const handleClickOutside = useCallback((event) => {
        if (!wrapperRef.current.contains(event.target) &&
            // NOTE:
            // Making addition check if the input field id is equal to the current selected option
            (event.target && event.target.id !== selectedOption)
        ) {
            closeKeyboard && closeKeyboard()
        }
    }, [closeKeyboard, selectedOption]);

    return createPortal(
        <div
            className = {
                classnames(
                    styles['bs-stake-keyboard'],
                    styles[`bs-stake-keyboard--${orientation}`],
                )
            }
            ref = {wrapperRef}
            data-testid = "Container__StakeKeyboard"
        >
            {
                orientation === 'portrait' ? (
                    <StakeKeyBoardPortrait
                        closeKeyboard = {closeKeyboard}
                        addQuickValue = {addQuickValue}
                        addValueToStake = {addValueToStake}
                        removeStake = {removeStake}
                    />
                ) : (
                    <StakeKeyBoardLandscape
                        closeKeyboard = {closeKeyboard}
                        addQuickValue = {addQuickValue}
                        addValueToStake = {addValueToStake}
                        removeStake = {removeStake}
                    />
                )
            }
        </div>,
        document.getElementById('bs-options-footer__keyboard'),
    )
}

export const StakeKeyboardMemo = memo(StakeKeyboard);

StakeKeyboard.propTypes = {
    closeKeyboard: propTypes.func.isRequired,
    selectedOption: propTypes.string.isRequired,
    addQuickValue: propTypes.func.isRequired,
    addValueToStake: propTypes.func.isRequired,
    removeStake: propTypes.func.isRequired,
    orientation: propTypes.string,
}
