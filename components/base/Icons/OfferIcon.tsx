/* eslint-disable max-len */
import React from 'react'
import { useIcons, UseIconsInterface } from './useIcons';

export const OfferIcon : React.FunctionComponent<UseIconsInterface> = (props) => {
    const { className, dataTestId = 'Icon__Offer', ...rest } = useIcons(props);
    return (
        <svg
            width = "31"
            height = "14"
            className = {className}
            data-testid = {dataTestId}
            {...rest}
        >
            <g fill = "none" fillRule = "evenodd">
                <g>
                    <g>
                        <g>
                            <rect
                                width = "31"
                                height = "14"
                                y = "1"
                                fill = "#A4E7CE"
                                rx = "1"
                            />
                            <text
                                fill = "#171717"
                                fontSize = "12"
                                letterSpacing = "-.2"
                            >
                                <tspan x = "2" y = "11">Offer</tspan>
                            </text>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
    );
}
