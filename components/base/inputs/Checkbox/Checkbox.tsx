import React, { useCallback } from 'react';
import classnames from 'classnames';
import Image from 'next/image';

import { FieldProps } from '../../../interfaces/Forms';

import styles from './Checkbox.module.scss';

interface CheckBoxProps extends Omit<FieldProps, 'type' | 'defaultValue' | 'value'> {
    defaultValue?: boolean;
    value?: boolean;
}

export const Checkbox = ({
    label,
    value = false,
    onChange,
    defaultValue = false,
    name,
    className,
    ...rest
} : CheckBoxProps) : React.ReactElement => {
    const isChecked = typeof value !== 'undefined' ? value : defaultValue;

    const handleOnClick = useCallback((event) => {
        event.stopPropagation();
        onChange && onChange(name, !isChecked)
    }, [isChecked, name, onChange])

    return (
        <div className = {classnames(styles.checkbox, className)} {...rest}>
            <div
                onClick = {handleOnClick}
                className = {styles.checkbox__field}
            >
                {
                    isChecked && (
                        <Image
                            src = "/svgs/tick_primary.svg"
                            width = {28}
                            height = {28}
                        />
                    )
                }
            </div>

            {label && (
                <span
                    className = {styles.checkbox__label}
                >
                    {label}
                </span>
            )}
        </div>
    )
}
