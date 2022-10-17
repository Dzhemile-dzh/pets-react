/* eslint-disable max-len */
import React from 'react'
import { useIcons, UseIconsInterface } from './useIcons';

export const CrossIcon : React.FunctionComponent<UseIconsInterface> = (props) => {
    const { className, dataTestId = 'Icon__Cross', ...rest } = useIcons(props);
    return (
        <svg
            width = "13"
            height = "13"
            viewBox = "0 0 13 13"
            className = {className}
            data-testid = {dataTestId}
            {...rest}
        >
            <path fillRule = "nonzero" d = "M11.375 0L6.5 4.875 1.625 0 0 1.625 4.875 6.5 0 11.375 1.625 13l4.874-4.875L11.375 13 13 11.375 8.125 6.5 13 1.625z" />
        </svg>
    );
}
