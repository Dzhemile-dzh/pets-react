import { useMemo } from 'react';
import classnames from 'classnames';
import { useSelectContext } from '../../contexts/SelectContext';
import { BookmakerInterface } from '../../interfaces';

import styles from './Select.module.scss';

export interface SelectedOptionInterface {
    className?: string,
    prefix?: React.ReactNode | React.ReactNode[],
    postfix?: React.ReactNode | React.ReactNode[],
    options: Array<BookmakerInterface> | Array<unknown>,
    labelPropertyName: string,
    valuePropertyName: string,
    placeholder?: string,
    title?: string,
}

export const SelectedOption = ({
    className,
    prefix,
    postfix,
    options,
    labelPropertyName,
    valuePropertyName,
    placeholder,
    title,
}: SelectedOptionInterface) : JSX.Element => {
    const {
        isOpen,
        selectedOption,
    } = useSelectContext();

    const label = useMemo(() => {
        if (options && labelPropertyName && valuePropertyName) {
            const foundOption = options.find((item) => item[valuePropertyName] === selectedOption);

            return foundOption?.[labelPropertyName];
        }

        return selectedOption;
    }, [labelPropertyName, options, selectedOption, valuePropertyName]);

    return !isOpen ? (
        <div
            className = {classnames(
                styles[className],
                styles['select__custom-selected-option'],
            )}
            data-testid = "Select_CustomSelectedOption"
        >
            {prefix}
            <div
                className = {classnames(
                    styles['select__custom-selected-option-wrapper'],
                    styles[`${className}-wrapper`],
                )}
            >
                {title && (
                    <span
                        className = {classnames(
                            styles['select__custom-selected-option-title'],
                            styles[`${className}-title`],
                        )}
                    >
                        {title}
                    </span>
                )}
                <span
                    data-testid = "Text__SelectedOptionLabel"
                    className = {classnames(
                        styles['select__custom-selected-option-label'],
                        styles[`${className}-label`],
                    )}
                >
                    {label || placeholder}
                </span>
            </div>
            {postfix}
        </div>
    ) : null;
}

SelectedOption.displayName = 'SelectedOption';
