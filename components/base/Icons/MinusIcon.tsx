/* eslint-disable max-len */
import React from 'react'
import { useIcons, UseIconsInterface } from './useIcons';

export const MinusIcon : React.FunctionComponent<UseIconsInterface> = (props) => {
    const { className, dataTestId = 'Icon__Minus', ...rest } = useIcons(props);

    return (
        <svg
            width = "17"
            height = "3"
            viewBox = "0 0 17 3"
            className = {className}
            data-testid = {dataTestId}
            {...rest}
        >
            <path d = "M28 22L28 19 11 19 11 22z" transform = "translate(-11 -19)" />
        </svg>
    );
}
