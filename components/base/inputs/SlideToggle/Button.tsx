import React from 'react';
import classnames from 'classnames';

import { useSlideToggleContext } from '../../../contexts/SlideToggleContext';
import { convertToPascalCase } from '../../../../project/utils/formatUtils';

import styles from './SlideToggle.module.scss';

interface ButtonInterface {
    optionLabel?: string;
    optionValue: string;
    className?: string;
}

export const Button = ({
    optionLabel,
    optionValue,
    className,
}: ButtonInterface): React.ReactElement => {
    const { selectedOption, setSelectedOption } = useSlideToggleContext();
    const isActive = selectedOption === optionValue;

    return (
        <button
            className = {
                classnames(
                    styles['slide-toggle__button'],
                    {
                        [styles['slide-toggle__button--active']]: isActive,
                    },
                    className,
                )
            }
            data-testid = {`SlideToggleButton__${convertToPascalCase(optionLabel)}`}
            onClick = {() => setSelectedOption(optionValue)}
            type = "button"
        >
            {optionLabel || optionValue}
        </button>
    );
};
