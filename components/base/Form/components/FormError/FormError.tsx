import React, { useEffect } from 'react';
import propTypes from 'prop-types';
import Image from 'next/image';
import { useFormContext } from '../../../../contexts/FormContext';

import styles from './FormError.module.scss'

interface FormErrorProps {
    children: React.ReactElement[] | React.ReactElement | string
}

export const FormError = ({ children } : FormErrorProps) : JSX.Element | null => {
    const {
        errors,
        setFieldError,
    } = useFormContext();

    useEffect(() => {
        if (children && errors && errors.outside !== children) {
            setFieldError('outside', children)
        }
    }, [children, errors, setFieldError])

    if (!children) return null;

    // When we need to handle internal field error handling
    // Use this logic

    // const formErrors = errors &&
    //     Object.keys(errors).map((fieldName) => {
    //         const error = errors[fieldName];

    //         return (
    //             <div key = {fieldName}>
    //                 {fieldName} is having error: {error}
    //             </div>
    //         )
    //     });

    return (
        <div className = {styles['form-error']}>
            <Image
                src = "/svgs/exclamation_primary.svg"
                width = {24}
                height = {24}
            />
            <span className = {styles['form-error__message']}>{children}</span>
        </div>
    )
}

FormError.propTypes = {
    children: propTypes.any,
}
