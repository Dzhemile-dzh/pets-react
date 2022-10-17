import React from 'react';
import propTypes from 'prop-types';
import classnames from 'classnames';
import styles from './ShowMoreButton.module.scss';

export function ShowMoreButton(props) {
    const {
        openedLabel,
        closedLabel,
        isOpen,
        onClickMethod,
        className,
        focused,
    } = props;

    return (
        <button
            type = "button"
            className = {classnames(
                styles['show-more-button'],
                isOpen ? styles['show-more-button--collapse'] : styles['show-more-button--expand'],
                !focused && styles['show-more-button--not-focused'],
                className,
            )}
            onClick = {onClickMethod}
            aria-expanded = {isOpen ? 'true' : 'false'}
            data-testid = "Button__RaceShowMoreButton"
        >
            {
                isOpen ? openedLabel : closedLabel
            }
        </button>
    );
}

ShowMoreButton.propTypes = {
    focused: propTypes.bool,
    openedLabel: propTypes.string,
    closedLabel: propTypes.string,
    isOpen: propTypes.bool,
    onClickMethod: propTypes.func,
    className: propTypes.string,
}

ShowMoreButton.defaultProps = {
    focused: false,
}
