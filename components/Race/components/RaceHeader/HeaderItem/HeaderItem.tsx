import React, { ReactElement } from 'react';
import classnames from 'classnames';

import { convertToPascalCase } from '../../../../../project/utils/formatUtils';

import styles from './HeaderItem.module.scss';

interface HeaderItemInterface {
    label: string,
    value: unknown,
    type: 'result' | 'racecard',
}

export const HeaderItem = ({
    label,
    value,
    type,
}: HeaderItemInterface): ReactElement => (
    <div
        className = {classnames(
            styles['header-item'],
            styles[`header-item--${type}`],
        )}
        data-testid = {label && `Container__RaceHeader${convertToPascalCase(label)}`}
    >
        {
            label && (
                <span
                    className = {styles['header-item__label']}
                    data-testid = {label && `Text__RaceHeader${convertToPascalCase(label)}Label`}
                >
                    {label}
                </span>
            )
        }
        {
            value && (
                <span
                    className = {styles['header-item__value']}
                    data-testid = {label && `Text__RaceHeader${convertToPascalCase(label)}Value`}
                >
                    {value}
                </span>
            )
        }
    </div>
);
