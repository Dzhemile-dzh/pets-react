import React from 'react';
import propTypes from 'prop-types';
import classnames from 'classnames';
import Link from 'next/link';
import { ChevronIcon } from '../Icons/ChevronIcon';
import { convertToPascalCase } from '../../../project/utils/formatUtils';

import styles from './Detail.module.scss';

export function Detail(props) {
    const {
        label,
        value,
        sup,
        isLink,
        asPath = '/',
        className,
        tooltipText,
        isResult,
        hideField,
        testIdPrefix,
    } = props;
    const detailClassName = classnames(
        styles.detail__item,
        {
            [styles[`detail__${label.replace(/\(*\)*/g, '').split(' ').join('-')}`]]: label,
        },
        {
            [styles[`detail__${label.replace(/\(*\)*/g, '').split(' ').join('-')}-no-value`]]:
            (label === 'starting price' || label === 'won by' || hideField) && isResult,
        },
        {
            [styles['detail__item--result']]: isResult,
        },
        styles[className],
    );

    return !value && !label ?
        null : (
            <div
                className = {detailClassName}
                title = {tooltipText}
                data-testid =
                    {testIdPrefix &&
                            `Container__${testIdPrefix}${convertToPascalCase(label)}`}
            >
                { label && (
                <span
                    className = {styles.detail__label}
                    aria-hidden = "true"
                    data-testid =
                        {testIdPrefix &&
                                `Text__${testIdPrefix}${convertToPascalCase(label)}Label`}
                >
                    {label}
                </span>
                ) }
                {!isLink && (
                <div
                    className = {styles.detail__value}
                    aria-hidden = "true"
                    data-testid =
                        {testIdPrefix &&
                                `Container__${testIdPrefix}${convertToPascalCase(label)}Value`}
                >
                    {value && value !== 'none' && (
                    <span
                        data-testid =
                            {testIdPrefix &&
                                    `Text__${testIdPrefix}${convertToPascalCase(label)}Value`}
                    >
                        {value}
                    </span>
                    )}
                    {sup && <sup>{sup}</sup>}
                </div>
                )}
                {isLink && (
                <Link
                    href = {asPath}
                >
                    <a
                        className = {styles.detail__value}
                        data-testid =
                            {testIdPrefix &&
                                        `Link__${testIdPrefix}${convertToPascalCase(label)}Value`}
                    >
                        {value && value !== 'none' && (
                        <span
                            data-testid =
                                {testIdPrefix &&
                                        `Text__${testIdPrefix}${convertToPascalCase(label)}Value`}
                        >
                            {value}
                        </span>
                        )}
                        {sup && <sup>{sup}</sup>}
                        {value && value !== 'none' && (
                        <ChevronIcon
                            size = "xs"
                            color = "primary"
                            data-testid =
                                {testIdPrefix &&
                                        `Icon__${testIdPrefix}${convertToPascalCase(label)}Icon`}
                        />
                        )}
                    </a>
                </Link>
                )}
            </div>
        );
}

Detail.propTypes = {
    label: propTypes.string,
    value: propTypes.oneOfType([
        propTypes.string,
        propTypes.node,
    ]),
    sup: propTypes.string,
    className: propTypes.string,
    tooltipText: propTypes.string,
    isLink: propTypes.bool,
    asPath: propTypes.string,
    isResult: propTypes.bool,
    hideField: propTypes.bool,
}
