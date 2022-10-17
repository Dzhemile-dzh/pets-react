import React from 'react';
import Image from 'next/image';

import { MenuItemInterface } from '../../../interfaces';
import { convertToPascalCase } from '../../../../project/utils/formatUtils';

import styles from './SocialIcons.module.scss';

const ITEM_ICONS = {
    Instagram: 'social-instagram',
    Twitter: 'social-twitter',
    YouTube: 'social-youtube',
    Spotify: 'social-spotify',
    'Facebook Messenger': 'social-messenger',
    Facebook: 'social-facebook',
}

interface SocialIconsInterface {
    menuItem: MenuItemInterface;
}

export const SocialIcons = ({
    menuItem,
}: SocialIconsInterface): JSX.Element => (
    <div
        className = {styles['social-icons']}
        data-testid = "Container__SocialIcons"
    >
        <div
            className = {styles['social-icons__content']}
            data-testid = "Container__SocialIconsContent"
        >
            <div
                className = {styles['social-icons__logo-rp']}
                data-testid = "Container__RacingPostLogo"
            >
                <Image
                    src = "/svgs/rp_logo.svg"
                    width = {216}
                    height = {24}
                    data-testid = "Icon__RacingPostLogo"
                />
            </div>
            <div
                className = {styles['social-icons__logos']}
                data-testid = "Container__SocialIconsLogos"
            >
                {
                    menuItem.children.map(({ label, url, menuItemId }) => {
                        const itemLabel = convertToPascalCase(label);

                        return (
                            <a
                                className = {styles['social-icons__logo']}
                                href = {url}
                                key = {menuItemId}
                                target = "_blank"
                                rel = "noreferrer"
                                data-testid = {`Link__${itemLabel}`}
                            >
                                <Image
                                    src = {`/svgs/footer/${ITEM_ICONS[label]}.svg`}
                                    layout = "fill"
                                    objectFit = "cover"
                                    data-testid = {`Icon__${itemLabel}`}
                                />
                            </a>
                        )
                    })
                }
            </div>
        </div>
    </div>
)
