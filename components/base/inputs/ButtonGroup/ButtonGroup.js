import React from 'react';
import propTypes from 'prop-types';
// Comment for now - storybooks does not work well with classNames
import classnames from 'classnames';
import Button from '../Button';

import styles from './ButtonGroup.module.scss';

export const ButtonGroup = ({
    buttons,
}) => {
    return (
        <div
            className = {styles['button-group']}
            data-testid = "Container__ButtonGroup"
        >
            {buttons.map((button, index) => {
                const {
                    text, icon, onClick, isActive, isDisabled, testid,
                } = button;
                return (
                    <Button
                        key = {index}
                        styleType = "group"
                        onClick = {onClick}
                        isActive = {isActive}
                        isDisabled = {isDisabled}
                        className = {classnames(
                            styles['button-group__button'],
                            {
                                [styles['button-group__button--active']]: isActive,
                            },
                            {
                                [styles['button-group__button--disabled']]: isDisabled,
                            },
                        )}
                        data-testid = {testid && `Button__${testid}`}
                    >
                        {icon}
                        <span data-testid = {testid && `Text__${testid}`}>{text}</span>
                    </Button>
                );
            })}
        </div>
    )
};

ButtonGroup.propTypes = {
    buttons: propTypes.arrayOf(
        propTypes.shape({
            text: propTypes.string,
            iconName: propTypes.string,
            onClick: propTypes.func,
            isActive: propTypes.bool,
        }),
    ),
}
