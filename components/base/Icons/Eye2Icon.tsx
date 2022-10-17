/* eslint-disable max-len */
import React from 'react';
import { useIcons, UseIconsInterface } from './useIcons';

export const Eye2Icon : React.FunctionComponent<UseIconsInterface> = (props) => {
    const { className, dataTestId = 'Icon__Betslip', ...rest } = useIcons(props);
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
            <path
                fill = "#00A09B"
                d = "M9 2.5c-.331.005-.66.058-.976.156.146.258.224.548.226.844 0 .966-.783 1.75-1.75 1.75-.296-.002-.586-.08-.844-.226-.416 1.444.138 2.992 1.376 3.843 1.238.852 2.882.815 4.082-.09 1.199-.905 1.684-2.476 1.205-3.9C11.839 3.453 10.503 2.495 9 2.5zm8.891 3.044C16.197 2.237 12.841 0 9 0 5.158 0 1.803 2.239.109 5.544c-.145.287-.145.625 0 .912C1.803 9.763 5.159 12 9 12c3.842 0 7.197-2.239 8.891-5.544.145-.287.145-.625 0-.912zM9 10.5c-3.083 0-5.91-1.719-7.435-4.5C3.09 3.219 5.917 1.5 9 1.5c3.083 0 5.91 1.719 7.435 4.5C14.91 8.781 12.083 10.5 9 10.5z"
            />
        </svg>
    );
}
