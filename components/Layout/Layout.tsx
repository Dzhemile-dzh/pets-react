import { FC, ReactElement } from 'react';
import { useSelector } from 'react-redux';

import { StateInterface } from '@components/interfaces';

import { Constants } from '@project/constants';

import Footer from '../Footer';

const {
    MENU_NAMES: {
        FOOTER_MENU,
    },
} = Constants;

interface LayoutInterface {
    children: [] | Array<ReactElement>;
}

export const Layout : FC<LayoutInterface> = ({
    children,
}) => {
    const menu = useSelector((state: StateInterface) => state.glide.menus?.[FOOTER_MENU])

    return (
        <>
            <div
                data-testid = "Container__Layout"
            >
                {children}
            </div>
            <Footer menu = {menu} />
        </>
    )
}
