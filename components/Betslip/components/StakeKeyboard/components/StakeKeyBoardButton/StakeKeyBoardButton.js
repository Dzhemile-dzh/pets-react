import React from 'react'
import propTypes from 'prop-types';
import classnames from 'classnames';

import styles from '../../StakeKeyboard.module.scss';

export const StakeKeyBoardButton = ({
    label,
    onClick,
    className,
    isRegular,
}) => {
    return (
        <button
            onClick = {onClick}
            className = {classnames(
                styles['bs-stake-keyboard__btn'],
                isRegular ?
                    styles['bs-stake-keyboard__btn-number'] :
                    styles['bs-stake-keyboard__btn-special'],
                className,
            )}
            type = "button"
            data-testid = "Button__StakeKeyBoard"
        >
            {label}
        </button>
    )
}

StakeKeyBoardButton.propTypes = {
    label: propTypes.any,
    onClick: propTypes.func,
    className: propTypes.string,
    isRegular: propTypes.bool,
}
