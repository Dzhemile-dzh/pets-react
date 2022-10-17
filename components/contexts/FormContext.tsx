import { createContext, useContext } from 'react';

type ErrorType = {
    outside?: string
}

interface FormContextProps {
    formState: unknown,
    setFieldValue: (name, defaultValue)=> void,
    clearFormErrors: () => void,
    isSubmitting: boolean,
    setFieldError: (name, errorMessage)=> void,
    addFieldForValidation: (name)=> void,
    markFieldAsValidated: (name)=> void,
    errors: ErrorType,
    submitForm: ()=> void,
    isSubmitButtonEnabled: boolean
}

export const FormContext = createContext<Partial<FormContextProps>>({});

export function useFormContext() : Partial<FormContextProps> {
    const context = useContext(FormContext)
    if (!context) {
        throw new Error(
            'Form compound components cannot be rendered outside the Form component',
        )
    }
    return context
}
