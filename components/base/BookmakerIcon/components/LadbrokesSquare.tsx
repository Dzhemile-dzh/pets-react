/* eslint-disable max-len */
import React from 'react';
import { IconInterface } from '../../../interfaces';

export default function LadbrokesSquare({ className, dataTestId }: IconInterface) : JSX.Element {
    return (
        <svg
            xmlns = "http://www.w3.org/2000/svg"
            xmlnsXlink = "http://www.w3.org/1999/xlink"
            width = "44"
            height = "44"
            viewBox = "0 0 44 44"
            className = {className}
            data-testid = {dataTestId}
        >
            <defs>
                <rect
                    id = "xv01ydv09a"
                    width = "44"
                    height = "44"
                    x = "0"
                    y = "0"
                    rx = "3"
                />
            </defs>
            <g fill = "none" fillRule = "evenodd">
                <g>
                    <g transform = "translate(-227.000000, -129.000000) translate(227.000000, 129.000000)">
                        <use fill = "#EB1C24" xlinkHref = "#xv01ydv09a" />
                        <path fill = "#FFF" d = "M31.345 32.91l-.075.076c-.494 1.29-.721 1.86-3.074 2.125-3.909.493-7.324.987-10.701 1.404-.266.038-.57.076-.835.076-1.973 0-2.732-1.138-3.264-2.125-.872-1.594-1.631-3.112-2.39-4.668-.683-1.366.417-3.415.835-4.174 1.593-2.922 9.069-16.545 9.373-17 .834-1.252 1.935-1.366 2.732-1.442.076 0 .152 0 .227-.038 1.556-.076 3.567-.114 4.554-.152L20.834 26.27c-.493 1.177-.304 1.936-.038 2.315.228.342.607.683 1.442.683.418 0 8.083-.152 10.55-.19-.38.987-1.063 2.77-1.443 3.833z" />
                    </g>
                </g>
            </g>
        </svg>

    );
}
