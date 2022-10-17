/* eslint-disable max-len */
import React from 'react'
import { useIcons, UseIconsInterface } from './useIcons';

export const MenuIcon : React.FunctionComponent<UseIconsInterface> = (props) => {
    const { className, dataTestId = 'Icon__Menu', ...rest } = useIcons(props);

    return (
        <svg
            width = "16px"
            height = "12px"
            viewBox = "0 0 16 12"
            className = {className}
            data-testid = {dataTestId}
            {...rest}
        >
            <g
                stroke = "none"
                strokeWidth = "1"
                fill = "none"
                fillRule = "evenodd"
            >
                <g transform = "translate(-447.000000, -1197.000000)">
                    <g transform = "translate(443.000000, 1191.000000)">
                        <g>
                            <rect
                                x = "0"
                                y = "0"
                                width = "24"
                                height = "24"
                            />
                            <g transform = "translate(4.000000, 6.000000)" fill = "#171717">
                                <path d = "M0,0 L16,0 L16,2 L0,2 L0,0 Z M0,5 L16,5 L16,7 L0,7 L0,5 Z M0,10 L16,10 L16,12 L0,12 L0,10 Z" />
                            </g>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
    );
}
