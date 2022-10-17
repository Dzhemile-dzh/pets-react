import React, { useMemo, useState } from 'react'
import classnames from 'classnames'

import { Button } from './Button';
import { SlideToggleContext } from '../../../contexts/SlideToggleContext';
import useEffectAfterMount from '../../../custom-hooks/useEffectAfterMount';

import styles from './SlideToggle.module.scss';

interface SlideToggleInterface {
    children: React.ReactElement | React.ReactElement[];
    className?: string;
    currentOption: string;
    handleClick?: (value?: string) => void;
    purpose: string;
    type?: string;
}

export const SlideToggle = ({
    children,
    className,
    currentOption,
    handleClick,
    purpose,
    type = 'horizontal',
}: SlideToggleInterface): React.ReactElement => {
    const [selectedOption, setSelectedOption] = useState<string>(currentOption);

    useEffectAfterMount(() => {
        handleClick && handleClick(selectedOption);
    }, [selectedOption])

    const contextValue = useMemo(() => ({
        selectedOption,
        setSelectedOption,
    }), [
        selectedOption,
        setSelectedOption,
    ]);

    return (
        <SlideToggleContext.Provider value = {contextValue}>
            <div
                className = {classnames(
                    styles['slide-toggle'],
                    styles[`slide-toggle--${type}`],
                    className,
                )}
                data-testid = {`SlideToggle__${purpose}`}
            >
                {children}
            </div>
        </SlideToggleContext.Provider>
    )
}

SlideToggle.Button = Button;
