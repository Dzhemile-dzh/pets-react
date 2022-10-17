import { useCallback } from 'react';
import classnames from 'classnames';

import { FieldProps } from '../../../interfaces/Forms';
import { convertToPascalCase } from '../../../../project/utils/formatUtils';
import styles from './InputField.module.scss';

export const InputField = ({
    icon,
    label,
    onChange,
    value,
    type,
    name,
    placeholder,
    defaultValue = '',
    onFocus,
    className,
    ...rest
} : FieldProps) : React.ReactElement => {
    const handleChange = useCallback((event) => {
        onChange && onChange(name, event.target.value)
    }, [name, onChange])

    return (
        <div
            className = {classnames(className, styles['input-field'])}
            data-testid = {label && `Container__InputField${convertToPascalCase(label)}`}
        >
            {label && (
                <label
                    className = {styles['input-field__label']}
                    htmlFor = {name}
                    data-testid = {`Label__InputField${convertToPascalCase(label)}`}
                >
                    {label}
                </label>
            )}
            <div
                className = {styles['input-field__input-wrapper']}
                data-testid = {label && `Container__InputField${convertToPascalCase(label)}Wrapper`}
            >
                <input
                    className = {styles['input-field__input']}
                    onChange = {handleChange}
                    value = {typeof value !== 'undefined' ? value : defaultValue}
                    type = {type}
                    name = {name}
                    id = {name}
                    onFocus = {onFocus}
                    placeholder = {placeholder}
                    autoComplete = "off"
                    data-testid = {label && `Input__InputField${convertToPascalCase(label)}`}
                    {...rest}
                />
                {
                    icon && (
                        <div className = {styles['input-field__icon-right']}>
                            {icon}
                        </div>
                    )
                }
            </div>
        </div>
    )
}

InputField.defaultProps = {
    defaultValue: '',
}
