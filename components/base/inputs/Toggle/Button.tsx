import React from 'react';
import classnames from 'classnames';

import { useToggleContext } from '../../../contexts/ToggleContext';

import styles from './Toggle.module.scss';

interface ButtonInterface {
    className: string;
    title?: string;
}

export const Button = ({
    className,
    title,
}: ButtonInterface): React.ReactElement => {
    const { isToggled, handleToggle } = useToggleContext();
    const buttonTitle = `${title || 'toggle'} ${isToggled ? 'on' : 'off'}`;

    return (
        <div className = {classnames(
            styles.toggle__background,
            styles[`${className}__background`],
        )}
        >
            <button
                type = "button"
                aria-label = {buttonTitle}
                className = {classnames(
                    styles.toggle__button,
                    styles[`${className}__button`],
                )}
                data-testid = "ToggleButton"
                onClick = {handleToggle}
                title = {buttonTitle}
            />
        </div>
    );
};
