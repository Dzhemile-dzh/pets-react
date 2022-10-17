/* eslint-disable max-len */
import React from 'react';
import { useIcons, UseIconsInterface } from './useIcons';

export const PlayIcon : React.FunctionComponent<UseIconsInterface> = (props) => {
    const { className, dataTestId = 'Icon__Play', ...rest } = useIcons(props);
    return (
        <svg
            width = "20"
            height = "20"
            viewBox = "0 0 20 20"
            className = {className}
            data-testid = {dataTestId}
            {...rest}
        >
            <g fillRule = "nonzero">
                <path d = "M10 0C4.486 0 0 4.486 0 10s4.486 10 10 10 10-4.486 10-10S15.514 0 10 0zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z" />
                <path d = "M7 15l8-5-8-5z" />
            </g>
        </svg>
    );
}
