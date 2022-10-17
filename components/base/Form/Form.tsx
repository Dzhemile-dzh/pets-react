import React, {
    useState, useCallback, useMemo, memo,
} from 'react';
import classnames from 'classnames';
import Loader from '../Loader';
import useEffectAfterMount from '../../custom-hooks/useEffectAfterMount';
import { FormContext } from '../../contexts/FormContext';

import styles from './Form.module.scss';

interface FormProps {
    onSubmit: (args) => void,
    isFormLoading?: boolean,
    className?: string,
    clearErrors?: () => void,
    children?: React.ReactElement[]
}

const defaultFormState = {
    errors: {},
}

const checkIfShouldEnableSubmitButton = ({
    formState, isSubmitButtonEnabled, setIsSubmitButtonEnabled,
}) => {
    const isEveryTextFieldNotEmpty = Object.keys(formState).every((fieldName) => {
        if (typeof formState[fieldName] === 'string') {
            return formState[fieldName] !== '';
        }

        return true;
    })

    if (
        isSubmitButtonEnabled !== (
            isEveryTextFieldNotEmpty &&
            Object.keys(formState.errors).length === 0
        )
    ) {
        setIsSubmitButtonEnabled(isEveryTextFieldNotEmpty &&
            Object.keys(formState.errors).length === 0);
    }
}

// Validating if the submitting and field validations should continue
// And whether or not we can submit the values we receive from the form
const validateFieldsAndSubmit = ({
    isSubmitting, formState, fieldsToValidate, onSubmit, setIsSubmitting,
}) => {
    if (isSubmitting) {
        const errorsCount = Object.keys(formState.errors).length;

        const isEveryFieldValidated = fieldsToValidate.every((field) => field.isValidated)

        if (isEveryFieldValidated) {
            if (errorsCount === 0) {
                onSubmit(formState)
            }
            setIsSubmitting(false);
        }
    }
}

export const InnerForm = ({
    onSubmit,
    clearErrors,
    className,
    isFormLoading,
    children,
} : FormProps) : React.ReactElement => {
    const [formState, setFormState] = useState(defaultFormState);
    const [fieldsToValidate, setFieldsToValidate] = useState([]);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const [isSubmitButtonEnabled, setIsSubmitButtonEnabled] = useState(false);

    useEffectAfterMount(() => checkIfShouldEnableSubmitButton({
        formState, isSubmitButtonEnabled, setIsSubmitButtonEnabled,
    }), [formState, isSubmitButtonEnabled])

    useEffectAfterMount(
        () => validateFieldsAndSubmit({
            isSubmitting, formState, fieldsToValidate, onSubmit, setIsSubmitting,
        }),
        [
            formState,
            fieldsToValidate.length,
            isSubmitting,
            onSubmit,
        ],
    )

    const setFieldValue = useCallback((field, value) => setFormState((prev) => {
        return {
            ...prev,
            [field]: value,
        }
    }), []);

    const setFieldError = useCallback((field, error) => setFormState((prev) => {
        const prevErrors = prev.errors;
        return {
            ...prev,
            errors: {
                ...prevErrors,
                [field]: error,
            },
        }
    }), [])

    const addFieldForValidation = useCallback((field) => setFieldsToValidate((prev) => prev.concat(
        { fieldName: field, isValidated: false },
    )), [])

    const markFieldAsValidated = useCallback(
        (field) => {
            return setFieldsToValidate((prev) => prev.map((currentField) => {
                if (currentField.fieldName === field) {
                    return {
                        ...currentField,
                        isValidated: true,
                    }
                }
                return currentField
            }))
        },
        [],
    )

    const clearFormErrors = useCallback(() => {
        if (Object.keys(formState.errors).length > 0) {
            clearErrors && clearErrors();
            setFormState((prev) => ({
                ...prev,
                errors: {},
            }))
        }
    }, [clearErrors, formState.errors]);

    const submitForm = useCallback((event) => {
        event.preventDefault();
        setFieldsToValidate((prev) => prev.map((item) => {
            return {
                ...item,
                isValidated: false,
            }
        }))
        setIsSubmitting(true);
    }, [])

    const contextValue = useMemo(() => ({
        formState,
        setFieldValue,
        isSubmitting,
        setFieldError,
        clearFormErrors,
        errors: formState.errors,
        addFieldForValidation,
        markFieldAsValidated,
        isSubmitButtonEnabled,
    }), [
        addFieldForValidation,
        clearFormErrors,
        formState,
        isSubmitButtonEnabled,
        isSubmitting,
        markFieldAsValidated,
        setFieldError,
        setFieldValue,
    ])

    return (
        <FormContext.Provider value = {contextValue}>
            {
                isFormLoading ? (
                    <div className = {styles.form__loader}>
                        <Loader />
                    </div>
                ) : (
                    <form
                        className = {classnames(className, styles.form)}
                        onSubmit = {submitForm}
                    >
                        {children}
                    </form>
                )
            }
        </FormContext.Provider>
    )
}

export const Form = memo(InnerForm)

Form.displayName = 'Form';
