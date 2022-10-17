import React, { useCallback, useMemo, useState } from 'react';
import classnames from 'classnames';

import { ToggleContext } from '../../../contexts/ToggleContext';

import { Button } from './Button';
import { Label } from './Label';

import styles from './Toggle.module.scss';

interface ToggleInterface {
    children: React.ReactElement | React.ReactElement[];
    className: string;
    defaultOption: boolean;
    handleClick?: (value: boolean) => void;
    purpose: string;
}

export const Toggle = ({
    children,
    className,
    defaultOption,
    handleClick,
    purpose,
}: ToggleInterface): React.ReactElement => {
    const [isToggled, setIsToggled] = useState<boolean>(defaultOption);

    const handleToggle = useCallback(() => {
        if (handleClick) {
            handleClick(!isToggled);
        }

        setIsToggled((prevValue) => !prevValue);
    }, [handleClick, isToggled]);

    const contextValue = useMemo(() => ({
        isToggled,
        handleToggle,
    }), [
        isToggled,
        handleToggle,
    ]);

    return (
        <ToggleContext.Provider value = {contextValue}>
            <div
                className = {classnames(
                    styles.toggle,
                    styles[className],
                    {
                        [styles['toggle--on']]: isToggled,
                    },
                )}
                data-testid = {`Toggle__${purpose}`}
            >
                {children}
            </div>
        </ToggleContext.Provider>
    );
}

Toggle.Button = Button;
Toggle.Label = Label;
