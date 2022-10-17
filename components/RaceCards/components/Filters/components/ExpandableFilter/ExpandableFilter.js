import React, { useCallback, memo } from 'react';
import propTypes from 'prop-types';

import { useBreakPoint } from '../../../../../contexts/BreakPointContext';
import { ChevronIcon } from '../../../../../base/Icons/ChevronIcon';

import styles from './ExpandableFilter.module.scss';

export function ExpandableFilter({
    className,
    onFilterClick,
    name,
    label,
    icon,
    displayName,
    isFocused,
    mobileExpandedContent,
}) {
    const { isMobile } = useBreakPoint();

    const onClick = useCallback(() => {
        onFilterClick(name)
    }, [name, onFilterClick])

    return (
        <>
            <div
                className = {className}
                onClick = {onClick}
            >
                <div className = {styles[`filters__${name}-label`]}>
                    {icon}
                    <span>{label}</span>
                </div>
                <div className = {styles[`filters__${name}-value`]}>
                    <span>{displayName}</span>
                    {!isMobile && (
                        <ChevronIcon
                            color = "black"
                            size = "normal"
                            transform = {isFocused ? 'rotate' : ''}
                        />
                    )}
                </div>
            </div>
            {isMobile && isFocused && (
                <div className = {styles['filters__more-content']}>
                    {mobileExpandedContent}
                </div>
            )}
        </>
    )
}

export const ExpandableFilterMemo = memo(ExpandableFilter);

ExpandableFilter.propTypes = {
    className: propTypes.string.isRequired,
    onFilterClick: propTypes.func.isRequired,
    name: propTypes.string.isRequired,
    label: propTypes.string,
    icon: propTypes.node,
    displayName: propTypes.string.isRequired,
    isFocused: propTypes.bool.isRequired,
    mobileExpandedContent: propTypes.object,
}
