import React, { useMemo } from 'react';
import propTypes from 'prop-types';
import useEffectOnce from '@components/custom-hooks/useEffectOnce';
import useEffectAfterMount from '../../../../custom-hooks/useEffectAfterMount';
import { useFormContext } from '../../../../contexts/FormContext';

interface FormControlProps {
    children: React.ReactElement,
    onValidate?: (fieldValue: string | boolean) => boolean,
    notValidErrorMessage?: string,
}

export const InnerFormControl = ({
    onValidate,
    notValidErrorMessage,
    children,
}: FormControlProps) : React.ReactElement => {
    const {
        formState,
        setFieldValue,
        clearFormErrors,
        isSubmitting,
        setFieldError,
        addFieldForValidation,
        markFieldAsValidated,
    } = useFormContext();

    const controlledChild = useMemo(() => {
        const child = React.Children.only(children);

        const { props: { name } } = child;

        return React.cloneElement(child, {
            onChange: setFieldValue,
            value: formState[name],
            onFocus: clearFormErrors,
        });
    }, [children, clearFormErrors, formState, setFieldValue])

    // Setting default value on mounting the children
    useEffectOnce(() => {
        const {
            props: {
                name,
                defaultValue,
            },
        } = controlledChild

        if (typeof onValidate === 'function') {
            addFieldForValidation(name)
        }

        if (!formState[name]) {
            setFieldValue(name, defaultValue)
        }
    })

    useEffectAfterMount(() => {
        if (isSubmitting) {
            const { props: { name } } = controlledChild

            if (typeof onValidate === 'function') {
                if (!onValidate(formState[name])) {
                    setFieldError(name, notValidErrorMessage)
                }

                markFieldAsValidated(name);
            }
        }
    }, [
        children,
        formState,
        isSubmitting,
        markFieldAsValidated,
        controlledChild,
        notValidErrorMessage,
        onValidate,
        setFieldError,
    ])

    return controlledChild
}

InnerFormControl.propTypes = {
    children: propTypes.any.isRequired,
    notValidErrorMessage: propTypes.string, // Error message when validation has failed
    onValidate: propTypes.func, // Pass validation method for this field
}

InnerFormControl.defaultProps = {
    notValidErrorMessage: 'Field is not invalid',
}

export const FormControl = React.memo(InnerFormControl);

FormControl.displayName = 'FormControl'
