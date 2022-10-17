/* eslint-disable max-len */
import React from 'react'
import { useIcons, UseIconsInterface } from './useIcons';

export const SortIcon : React.FunctionComponent<UseIconsInterface> = (props) => {
    const { className, dataTestId = 'Icon__Sort', ...rest } = useIcons(props);

    return (
        <svg
            width = "16"
            height = "13"
            viewBox = "0 0 16 13"
            className = {className}
            data-testid = {dataTestId}
            {...rest}
        >
            <path fillRule = "nonzero" d = "M3.2 12.8l3.2-3.2H4V0H2.4v9.6H0l3.2 3.2zm4-9.6h7.2v1.6H7.2V3.2zm0 3.2h5.6V8H7.2V6.4zm0-6.4H16v1.6H7.2V0zm0 9.6h4v1.6h-4V9.6z" />
        </svg>
    );
}
