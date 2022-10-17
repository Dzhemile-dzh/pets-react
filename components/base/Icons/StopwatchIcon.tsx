/* eslint-disable max-len */
import React from 'react'
import { useIcons, UseIconsInterface } from './useIcons';

export const StopwatchIcon : React.FunctionComponent<UseIconsInterface> = (props) => {
    const { className, dataTestId = 'Icon__Stopwatch', ...rest } = useIcons(props);

    return (
        <svg
            width = "17px"
            height = "19px"
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
                <g
                    id = "Summary-all-icons"
                    transform = "translate(-1287.000000, -1298.000000)"
                >
                    <g
                        id = "01-Atoms/Icons/Stopwatch"
                        transform = "translate(1283.000000, 1295.000000)"
                    >
                        <g>
                            <rect
                                id = "Rectangle"
                                x = "0"
                                y = "0"
                                width = "24"
                                height = "24"
                            />
                            <g
                                id = "bxs-stopwatch"
                                transform = "translate(4.000000, 3.000000)"
                                fill = "#000000"
                                fillRule = "nonzero"
                            >
                                <path
                                    d = "M8,3 C3.589,3 0,6.589 0,11 C0,15.411 3.589,19 8,19 C12.411,19 16,15.411 16,11 C16,6.589 12.411,3 8,3 Z M5,0 L11,0 L11,2 L5,2 L5,0 Z"
                                    id = "Shape"
                                    fill = "white"
                                />
                                <polygon
                                    id = "Path"
                                    fill = "white"
                                    transform = "translate(15.000000, 4.000000) rotate(45.001000) translate(-15.000000, -4.000000) "
                                    points = "13.586 3 16.414 3 16.414 5 13.586 5"
                                />
                            </g>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
    );
}
