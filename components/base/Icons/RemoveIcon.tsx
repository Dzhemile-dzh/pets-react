/* eslint-disable max-len */
import React from 'react';
import { useIcons, UseIconsInterface } from './useIcons';

export const RemoveIcon : React.FunctionComponent<UseIconsInterface> = (props) => {
    const { className, dataTestId = 'Icon__Remove', ...rest } = useIcons(props);
    return (
        <svg
            width = "15"
            height = "16"
            viewBox = "0 0 15 16"
            data-testid = {dataTestId}
            className = {className}
            {...rest}
        >
            <path fill = "#D11F25" d = "M9.6 0c.882 0 1.6.718 1.6 1.6v1.6h3.2v1.6h-1.6v9.6c0 .882-.718 1.6-1.6 1.6h-8c-.882 0-1.6-.718-1.6-1.6V4.8H0V3.2h3.2V1.6C3.2.718 3.918 0 4.8 0zm1.6 4.8h-8v9.6h8V4.8zM6.4 6.4v6.4H4.8V6.4h1.6zm3.2 0v6.4H8V6.4h1.6zm0-4.8H4.8v1.6h4.8V1.6z" />
        </svg>
    );
}
