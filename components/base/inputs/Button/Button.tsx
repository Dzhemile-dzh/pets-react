import React from 'react';
import classnames from 'classnames';

import styles from './Button.module.scss';

export type Ref = HTMLButtonElement;

interface ButtonProps extends Omit<React.HTMLProps<HTMLButtonElement>, 'size'>{
    styleType?: string
    isDisabled?: boolean
    isActive?: boolean
    type?: 'button' | 'submit' | 'reset'
    size?: 'default'| 'tiny' | 'small' | 'large'
}

export const Button = React.forwardRef(({
    onClick,
    children,
    className,
    styleType = 'primary',
    type = 'button',
    isDisabled,
    size = 'default',
    isActive = false,
    ...otherProps
} : ButtonProps, ref : React.Ref<HTMLButtonElement>) => (
    <button
        // eslint-disable-next-line react/button-has-type
        type = {type}
        onClick = {onClick}
        disabled = {isDisabled}
        className = {classnames(
            styles['ui-btn'],
            styles[`ui-btn--${size}`],
            {
                [styles['ui-btn--active']]: isActive,
            },
            {
                [styles[`ui-btn--${className}`]]: className,
            },
            {
                [styles[`ui-btn--${className}--active`]]: className && isActive,
            },
            styles[`ui-btn--${styleType}`],
            className,
        )}
        {...otherProps}
        ref = {ref}
    >
        <span>{children}</span>
    </button>
));

Button.displayName = 'Button';
