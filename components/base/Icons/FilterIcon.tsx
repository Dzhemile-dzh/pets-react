/* eslint-disable max-len */
import React from 'react'
import { useIcons, UseIconsInterface } from './useIcons';

export const FilterIcon : React.FunctionComponent<UseIconsInterface> = (props) => {
    const { className, dataTestId = 'Icon__Filter', ...rest } = useIcons(props);

    return (
        <svg
            xmlns = "http://www.w3.org/2000/svg"
            width = "24"
            height = "24"
            viewBox = "0 0 24 24"
            className = {className}
            data-testid = {dataTestId}
            {...rest}
        >
            <g fill = "none" fillRule = "evenodd">
                <g fillRule = "nonzero">
                    <g>
                        <g>
                            <g fill = "#000">
                                <path d = "M7 11h10v2H7v-2zM4 7h16v2H4V7zm6 8h4v2h-4v-2z" transform = "translate(-722.000000, -207.000000) translate(713.000000, 199.000000) translate(9.000000, 8.000000)" />
                            </g>
                            <path d = "M0 0H24V24H0z" transform = "translate(-722.000000, -207.000000) translate(713.000000, 199.000000) translate(9.000000, 8.000000)" />
                        </g>
                    </g>
                </g>
            </g>
        </svg>
    );
}
