/* eslint-disable max-len */
import React from 'react'
import { useIcons, UseIconsInterface } from './useIcons';

export const LoadingLogoIcon : React.FunctionComponent<UseIconsInterface> = (props) => {
    const { className, dataTestId = 'Icon__LoadingLogo', ...rest } = useIcons(props);
    return (
        <svg
            width = "160"
            height = "160"
            viewBox = "0 0 160 160"
            className = {className}
            data-testid = {dataTestId}
            {...rest}
        >
            <path
                fill = "#D11F25"
                d = "M80 0l.001 36.8H80c-23.859 0-43.2 19.341-43.2 43.2s19.341 43.2 43.2 43.2 43.2-19.341 43.2-43.2c0-9.11-2.82-17.561-7.634-24.529l30.287-20.89C154.773 47.486 160 63.136 160 80c0 44.16-35.84 80-80 80S0 124.16 0 80 35.84 0 80 0z"
            />
        </svg>

    );
}
