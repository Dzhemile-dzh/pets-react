/* eslint-disable max-len */
import React from 'react'; import { useIcons, UseIconsInterface } from './useIcons';

export const VideoIcon : React.FunctionComponent<UseIconsInterface> = (props) => {
    const { className, dataTestId = 'Icon__Video', ...rest } = useIcons(props);
    return (
        <svg
            width = "24px"
            height = "24px"
            viewBox = "0 0 24 24"
            version = "1.1"
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
                <g transform = "translate(-696.000000, -1711.000000)">
                    <g transform = "translate(696.000000, 1711.000000)">
                        <rect
                            x = "0"
                            y = "0"
                            width = "24"
                            height = "24"
                        />
                        <g transform = "translate(2.000000, 5.000000)" fill = "#171717">
                            <path d = "M16,2 C16,0.897 15.103,0 14,0 L2,0 C0.897,0 0,0.897 0,2 L0,12 C0,13.103 0.897,14 2,14 L14,14 C15.103,14 16,13.103 16,12 L16,8.667 L20,12 L20,2 L16,5.333 L16,2 Z" id = "Path" />
                        </g>
                    </g>
                </g>
            </g>
        </svg>
    );
}
