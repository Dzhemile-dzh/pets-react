/* eslint-disable max-len */
import React from 'react'
import { useIcons, UseIconsInterface } from './useIcons';

export const NoRacesIcon : React.FunctionComponent<UseIconsInterface> = (props) => {
    const { className, dataTestId = 'Icon__NoRaces', ...rest } = useIcons(props);
    return (
        <svg
            xmlns = "http://www.w3.org/2000/svg"
            width = "50"
            height = "50"
            viewBox = "0 0 50 50"
            className = {className}
            data-testid = {dataTestId}
            {...rest}
        >
            <defs>
                <filter id = "9mpca62yha">
                    <feColorMatrix in = "SourceGraphic" values = "0 0 0 0 0.474510 0 0 0 0 0.462745 0 0 0 0 0.462745 0 0 0 1.000000 0" />
                </filter>
            </defs>
            <g fill = "none" fillRule = "evenodd">
                <g filter = "url(#9mpca62yha)" transform = "translate(-155.000000, -411.000000)">
                    <g>
                        <g fill = "#FFF" transform = "translate(155.000000, 411.000000) translate(12.000000, 7.000000)">
                            <path d = "M13.5 0C20.956 0 27 6.044 27 13.5S20.956 27 13.5 27 0 20.956 0 13.5 6.044 0 13.5 0zm0 5C8.806 5 5 8.806 5 13.5S8.806 22 13.5 22s8.5-3.806 8.5-8.5S18.194 5 13.5 5z" />
                            <rect
                                width = "3"
                                height = "7"
                                x = "12"
                                y = "29"
                                rx = "1"
                            />
                        </g>
                    </g>
                </g>
            </g>
        </svg>
    );
}
