import React from 'react';
import Image from 'next/image';
import classnames from 'classnames';

import { MenuItemInterface } from '../../../interfaces';
import { convertToPascalCase } from '../../../../project/utils/formatUtils';

import styles from './ResponsibleGamblingImages.module.scss';

const ITEM_ICONS = {
    'Gamble Responsibly 18+': 'logo-gamble-responsibly',
    GamStop: 'logo-gam-stop',
    BeGambleAware: 'logo-be-gamble-aware',
    'Gambling Therapy': 'logo-gambling-therapy',
    'Gambling Commission': 'logo-gambling-commision',
    Raig: 'logo-raig',
    'Gamblers Anonymous': 'logo-gamblers-anonymous',
}

interface ResponsibleGamblingImagesInterface {
    menuItem: MenuItemInterface;
}

export const ResponsibleGamblingImages = ({
    menuItem,
}: ResponsibleGamblingImagesInterface): JSX.Element => (
    <div
        className = {styles['responsible-gambling-images']}
        data-testid = "Container__ResponsibleGamblingImages"
    >
        <div
            className = {styles['responsible-gambling-images__content']}
            data-testid = "Container__ResponsibleGamblingImagesContent"
        >
            {
                menuItem.children.map(({ label, url, menuItemId }) => {
                    const icon = ITEM_ICONS[label];
                    const itemLabel = convertToPascalCase(label);

                    return (
                        <a
                            className = {styles['responsible-gambling-images__link']}
                            href = {url}
                            target = "_blank"
                            rel = "noreferrer"
                            data-testid = {`Link__${itemLabel}`}
                            key = {menuItemId}
                        >
                            <div
                                className = {classnames(
                                    styles['responsible-gambling-images__logo'],
                                    styles[`responsible-gambling-images__${icon}`],
                                )}
                                data-testid = {`Container__${itemLabel}`}
                            >
                                <Image
                                    src = {`/svgs/footer/${icon}.svg`}
                                    layout = "fill"
                                    objectFit = "cover"
                                    data-testid = {`Icon__${itemLabel}`}
                                />
                            </div>
                        </a>
                    )
                })
            }
        </div>
    </div>
)
