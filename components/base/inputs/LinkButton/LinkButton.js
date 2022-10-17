import React from 'react'
import propTypes from 'prop-types';
import classnames from 'classnames';
import { convertToPascalCase } from '../../../../project/utils/formatUtils';

import styles from './LinkButton.module.scss';

export const LinkButton = ({
    size = 'default',
    isActive,
    styleType,
    className,
    title,
    onClick,
    children,
}) => {
    return (
        <a
            className = {classnames(
                styles['ui-btn'],
                styles[`ui-btn--${size}`],
                {
                    [styles['ui-btn--active']]: isActive,
                },
                styles[`ui-btn--${styleType}`],
                className,
            )}
            title = {title}
            onClick = {onClick}
            data-testid = {title && `Link__LinkButton${convertToPascalCase(title)}`}
        >
            {children}
        </a>
    )
}

LinkButton.displayName = 'LinkButton';

LinkButton.propTypes = {
    onClick: propTypes.func,
    className: propTypes.string,
    title: propTypes.string,
    children: propTypes.any,
    size: propTypes.oneOf([
        'tiny',
        'small',
        'default',
        'large',
    ]),
    isActive: propTypes.bool,
    styleType: propTypes.string,
}
