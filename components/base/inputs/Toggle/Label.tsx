import React from 'react';
import classnames from 'classnames';

import { convertToPascalCase } from '../../../../project/utils/formatUtils';

import styles from './Toggle.module.scss';

interface LabelInterface {
    className: string;
    label: string;
}

export const Label = ({
    className,
    label,
}: LabelInterface): React.ReactElement => (
    <label
        className = {
            classnames(
                styles.toggle__label,
                styles[`${className}__label`],
            )
        }
        data-testid = {`Label__${convertToPascalCase(label)}`}
    >
        {label}
    </label>
);
