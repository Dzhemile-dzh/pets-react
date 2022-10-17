/* eslint-disable max-len */
import React from 'react'
import { useIcons, UseIconsInterface } from './useIcons';

export const InfoBlackIcon : React.FunctionComponent<UseIconsInterface> = (props) => {
    const { className, dataTestId = 'Icon__InfoBlack', ...rest } = useIcons(props);

    return (
        <svg
            width = "16"
            height = "16"
            viewBox = "0 0 16 16"
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
                <g transform = "translate(-93.000000, -745.000000)">
                    <g transform = "translate(0.000000, 513.000000)">
                        <g transform = "translate(16.000000, 203.000000)">
                            <g transform = "translate(77.000000, 29.000000)">
                                <circle
                                    id = "Oval"
                                    fill = "#11C9C4"
                                    cx = "8"
                                    cy = "8"
                                    r = "8"
                                />
                                <polygon
                                    fill = "#171717"
                                    fillRule = "nonzero"
                                    points = "9 13 7 13 7 6 9 6"
                                />
                                <polygon
                                    fill = "#171717"
                                    fillRule = "nonzero"
                                    points = "9 5 7 5 7 3 9 3"
                                />
                            </g>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
    );
}
