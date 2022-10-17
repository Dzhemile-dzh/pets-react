import React from 'react';
import classnames from 'classnames';
import { useSelectContext } from '../../contexts/SelectContext';

import styles from './Select.module.scss';

export interface OptionInterface {
    children: React.ReactNode | React.ReactNode[],
    className?: string,
    value?: string,
}

export const Option = ({
    children,
    className,
    value,
}: OptionInterface): JSX.Element => {
    const {
        isOpen,
        selectedOption,
        setSelectedOption,
        hasCustomSelectedOption,
    } = useSelectContext();

    const isActive = selectedOption === value;

    return (isActive && !hasCustomSelectedOption) || isOpen ? (
        <div
            className = {classnames(
                styles.select__option,
                styles[`${className}__option`],
                {
                    [styles['select__option--active']]: isActive,
                },
                {
                    [styles[`${className}__option--active`]]: isActive,
                },
            )}
            onClick = {() => setSelectedOption(value)}
            data-testid = "Select__Option"
        >
            {children}
        </div>
    ) : null;
}
