/* eslint-disable max-len */
import React from 'react';
import { useIcons, UseIconsInterface } from './useIcons';

export const ChevronIcon : React.FunctionComponent<UseIconsInterface> = (props) => {
    const { className, dataTestId = 'Icon__Chevron', ...rest } = useIcons(props);
    return (
        <svg
            x = "0px"
            y = "0px"
            viewBox = "0 0 256 256"
            className = {className}
            data-testid = {dataTestId}
            {...rest}
        >
            <g>
                <polygon points = "225.813,48.907 128,146.72 30.187,48.907 0,79.093 128,207.093 256,79.093" />
            </g>
        </svg>
    )
}
