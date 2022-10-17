/* eslint-disable max-len */
import React from 'react'
import { useIcons, UseIconsInterface } from './useIcons';

export const HelpIcon : React.FunctionComponent<UseIconsInterface> = (props) => {
    const { className, dataTestId = 'Icon__Help', ...rest } = useIcons(props);

    return (
        <svg
            xmlns = "http://www.w3.org/2000/svg"
            width = "18"
            height = "12"
            viewBox = "0 0 18 12"
            className = {className}
            data-testid = {dataTestId}
            {...rest}
        >
            <g fill = "none" fillRule = "evenodd">
                <g>
                    <g>
                        <g>
                            <g>
                                <path
                                    fill = "#11C9C4"
                                    fillRule = "nonzero"
                                    d = "M18 8L16 8 16 6 14 6 14 8 12 8 12 10 14 10 14 12 16 12 16 10 18 10z"
                                    transform = "translate(-264.000000, -218.000000) translate(0.000000, 200.000000) translate(249.000000, 4.000000) translate(15.000000, 14.000000)"
                                />
                                <path fill = "#FFF" d = "M10 7v4H6V7h4zM4 7v4H0V7h4zm12-7v4h-4V0h4zm-6 0v4H6V0h4zM4 0v4H0V0h4z" transform = "translate(-264.000000, -218.000000) translate(0.000000, 200.000000) translate(249.000000, 4.000000) translate(15.000000, 14.000000)" />
                            </g>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
    );
}
