/* eslint-disable max-len */
import React from 'react'
import { useIcons, UseIconsInterface } from './useIcons';

export const Eye1Icon : React.FunctionComponent<UseIconsInterface> = (props) => {
    const { className, dataTestId = 'Icon__Eye1', ...rest } = useIcons(props);
    return (
        <svg
            width = "22"
            height = "14"
            viewBox = "0 0 22 14"
            className = {className}
            data-testid = {dataTestId}
            {...rest}
        >
            <path d = "M11 0c7.633 0 9.927 6.617 9.949 6.684l.105.316-.106.316C20.927 7.383 18.633 14 11 14c-7.633 0-9.927-6.617-9.949-6.684L.946 7l.106-.316C1.073 6.617 3.367 0 11 0zm0 2C5.652 2 3.578 5.842 3.074 7c.502 1.154 2.575 5 7.926 5 5.348 0 7.422-3.842 7.926-5-.502-1.154-2.575-5-7.926-5zm0 2c1.641 0 3 1.359 3 3 0 1.642-1.359 3-3 3-1.642 0-3-1.358-3-3 0-1.641 1.358-3 3-3z" />
        </svg>
    );
}
