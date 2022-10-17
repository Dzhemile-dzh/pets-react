/* eslint-disable max-len */
import React from 'react'
import { useIcons, UseIconsInterface } from './useIcons';

export const EllipsisIcon : React.FunctionComponent<UseIconsInterface> = (props) => {
    const { className, dataTestId = 'Icon__Ellipsis', ...rest } = useIcons(props);
    return (
        <svg
            width = "40"
            height = "24"
            viewBox = "0 0 40 24"
            className = {className}
            data-testid = {dataTestId}
            {...rest}
        >
            <g transform = "translate(-836 -316) translate(251 302) translate(585 14)">
                <rect
                    width = "40"
                    height = "24"
                    fill = "#ECEBEB"
                    rx = "3"
                />
                <path fill = "#797676" d = "M15 12c0 1.105-.895 2-2 2s-2-.895-2-2 .895-2 2-2 2 .895 2 2zm7 0c0 1.105-.895 2-2 2s-2-.895-2-2 .895-2 2-2 2 .895 2 2zm7 0c0 1.105-.895 2-2 2s-2-.895-2-2 .895-2 2-2 2 .895 2 2z" />
            </g>
        </svg>
    );
}
