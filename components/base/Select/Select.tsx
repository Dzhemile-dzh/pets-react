/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, {
    useState, useMemo, useRef, useEffect,
} from 'react';
import classnames from 'classnames';
import { SelectContext } from '../../contexts/SelectContext';
import { Option } from './Option';
import { SelectedOption } from './SelectedOption';
import useEffectAfterMount from '../../custom-hooks/useEffectAfterMount';

import styles from './Select.module.scss';

interface SelectProviderInterface {
    children?: React.ReactNode | React.ReactNode[],
    value?: string,
    hasCustomSelectedOption?: boolean,
    className?: string,
    onSelect?: (value) => void,
}

export const Select = ({
    children,
    value: defaultValue,
    hasCustomSelectedOption,
    className,
    onSelect,
}: SelectProviderInterface) : JSX.Element => {
    const [selectedOption, setSelectedOption] = useState<string>(defaultValue);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const selectRef = useRef(null);

    useEffect(() => {
        const handleOutsideClick = (e: React.ChangeEvent<HTMLInputElement>) => {
            if (isOpen && selectRef.current && !selectRef.current.contains(e.target)) {
                setIsOpen((prevIsOpen) => !prevIsOpen);
            }
        }
        // @ts-ignore
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            // @ts-ignore
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [isOpen])

    useEffectAfterMount(() => {
        onSelect && onSelect(selectedOption);
    }, [selectedOption, onSelect])

    const contextValue = useMemo(() => ({
        selectedOption,
        setSelectedOption,
        isOpen,
        hasCustomSelectedOption,
    }), [
        selectedOption,
        setSelectedOption,
        isOpen,
        hasCustomSelectedOption,
    ]);
    return (
        <SelectContext.Provider value = {contextValue}>
            <div
                className = {classnames(
                    styles[className],
                    {
                        [styles[`${className}--open`]]: isOpen,
                    },
                    styles.select,
                )}
                onClick = {() => setIsOpen((prevIsOpen) => !prevIsOpen)}
                ref = {selectRef}
                data-testid = "Container__Select"
            >
                {children}
            </div>
        </SelectContext.Provider>
    )
}

Select.Option = Option;
Select.SelectedOption = SelectedOption;
