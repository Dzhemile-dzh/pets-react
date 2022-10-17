import React from 'react';

import { MenuItemInterface } from '../interfaces';

import ResponsibleGamblingImages from './components/ResponsibleGamblingImages';
import SocialIcons from './components/SocialIcons';
import FooterMenuColumn from './components/FooterMenuColumn';

import styles from './Footer.module.scss';

interface FooterInterface {
    menu: Array<MenuItemInterface>,
}

const MENU_ITEM_CONTAINERS = {
    'Responsible Gambling Images': ResponsibleGamblingImages,
    'Racing Post': SocialIcons,
}

const MENU_COLUMN_ITEMS = [
    'About Us',
    'Members\' Club',
    'Gamble Responsibly',
    'Free Bets and Betting',
];

export const Footer = ({ menu }: FooterInterface): JSX.Element => {
    if (!menu || menu.length === 0) {
        return null;
    }

    return (
        <footer
            className = {styles.footer}
            data-testid = "Container__Footer"
        >
            {
                menu.map((item) => {
                    const Container = MENU_ITEM_CONTAINERS[item.label];

                    return Container && <Container key = {item.menuItemId} menuItem = {item} />;
                })
            }
            <div className = {styles['footer__column-items']}>
                {
                    menu
                        .filter((item) => MENU_COLUMN_ITEMS.includes(item.label))
                        .map((item, index) => (
                            <FooterMenuColumn
                                key = {item.menuItemId}
                                menuItem = {item}
                                index = {index}
                            />
                        ))
                }
            </div>
        </footer>
    );
}
