/* eslint-disable max-len */
import React from 'react'
import { useIcons, UseIconsInterface } from './useIcons';

export const PlusIcon : React.FunctionComponent<UseIconsInterface> = (props) => {
    const { className, dataTestId = 'Icon__Plus', ...rest } = useIcons(props);
    return (
        <svg
            width = "17"
            height = "17"
            viewBox = "0 0 17 17"
            className = {className}
            data-testid = {dataTestId}
            {...rest}
        >
            <path d = "M28 19L21 19 21 12 18 12 18 19 11 19 11 22 18 22 18 29 21 29 21 22 28 22z" transform = "translate(-11 -12)" />
        </svg>
    );
}
