/* eslint-disable max-len */
import React from 'react'
import { useIcons, UseIconsInterface } from './useIcons';

export const MembersClubIcon : React.FunctionComponent<UseIconsInterface> = (props) => {
    const { className, dataTestId = 'Icon__MembersClub', ...rest } = useIcons(props);
    return (
        <svg
            width = "96"
            height = "96"
            viewBox = "0 0 96 96"
            className = {className}
            data-testid = {dataTestId}
            {...rest}
        >
            <defs>
                <path id = "xq1xqu3poa" d = "M48 0c26.496 0 48 21.504 48 48S74.496 96 48 96 0 74.496 0 48 21.504 0 48 0zm0 24c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24-10.745-24-24-24z" />
            </defs>
            <g fill = "none" fillRule = "evenodd">
                <g>
                    <g>
                        <g transform = "translate(-1044 -361) translate(932 239) translate(112 122)">
                            <mask id = "aloftsx55b" fill = "#fff">
                                <use xlinkHref = "#xq1xqu3poa" />
                            </mask>
                            <use fill = "#D11F25" fillRule = "nonzero" xlinkHref = "#xq1xqu3poa" />
                            <path fill = "#F2AF00" d = "M72 0H96V96H72z" mask = "url(#aloftsx55b)" />
                        </g>
                    </g>
                </g>
            </g>
        </svg>
    );
}
