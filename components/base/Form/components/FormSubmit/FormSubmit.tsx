import React from 'react';
import classnames from 'classnames';

import { useFormContext } from '../../../../contexts/FormContext';
import { FieldProps } from '../../../../interfaces/Forms';

import styles from './FormSubmit.module.scss';

export const FormSubmit = (
    {
        className,
        label,
        ...rest
    } : Omit<FieldProps, 'type' | 'onChange' | 'name'>,
) : React.ReactElement => {
    const { isSubmitButtonEnabled } = useFormContext();

    return (
        <button
            className = {classnames(styles['form-submit'], className)}
            name = "form-submit"
            disabled = {!isSubmitButtonEnabled}
            type = "submit"
            {...rest}
        >
            {label}
        </button>
    )
}
