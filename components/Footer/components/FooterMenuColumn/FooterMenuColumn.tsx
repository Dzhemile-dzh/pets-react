import React from 'react';
import Image from 'next/image';
import classnames from 'classnames';

import Accordion from '@components/shared/Accordion';
import { MenuItemInterface } from '@components/interfaces';
import { convertToPascalCase } from '@project/utils/formatUtils';
import { useBreakPoint } from '@components/contexts/BreakPointContext';

import styles from './FooterMenuColumn.module.scss';

interface FooterMenuColumnInterface {
    menuItem: MenuItemInterface;
    index: number;
}

const ITEM_ICONS = {
    'Gamble Responsibly': 'logo-18',
}

export const FooterMenuColumn = ({ menuItem, index }: FooterMenuColumnInterface): JSX.Element => {
    const { isDesktop } = useBreakPoint();
    const { label, children } = menuItem;
    const menuIitemLabel = convertToPascalCase(label);

    const content = (
        <div
            className = {classnames(
                styles['footer-menu-column__links'],
                {
                    [styles['footer-menu-column__links--first']]: index === 0,
                },
                {
                    [styles['footer-menu-column__links--last']]: index === 3,
                },
            )}
            data-testid = "Container__Links"
        >
            {
                children.map(({ label: childLabel, url, menuItemId }) => {
                    const childItemLabel = convertToPascalCase(childLabel);

                    return (
                        <a
                            className = {styles['footer-menu-column__link']}
                            href = {url}
                            target = "_blank"
                            rel = "noreferrer"
                            data-testid = {`Link__${childItemLabel}`}
                            key = {menuItemId}
                        >
                            {childLabel}
                        </a>
                    )
                })
            }
        </div>
    )

    return isDesktop ? (
        <div
            className = {styles['footer-menu-column']}
            data-testid = "Container__MenuColumn"
        >
            <div
                className = {classnames(
                    styles['footer-menu-column__title'],
                    {
                        [styles['footer-menu-column__title--first']]: index === 0,
                    },
                )}
                data-testid = "Container__Title"
            >
                <span
                    className = {styles['footer-menu-column__label']}
                    data-testid = "Text__Label"
                >
                    {label}
                </span>
                {ITEM_ICONS[label] && (
                    <div
                        className = {styles['footer-menu-column__logo']}
                        data-testid = {`Container__${menuIitemLabel}`}
                    >
                        <Image
                            src = {`/svgs/footer/${ITEM_ICONS[label]}.svg`}
                            layout = "fill"
                            objectFit = "cover"
                            data-testid = {`Icon__${menuIitemLabel}`}
                        />
                    </div>
                )}
            </div>
            {content}
        </div>
    ) : (
        <Accordion>
            <Accordion.Item>
                <div
                    className = {styles['footer-menu-column']}
                    data-testid = "Container__MenuColumn"
                >
                    <Accordion.ItemHeaderSmart>
                        {(isOpen) => (
                            <div
                                className = {styles['footer-menu-column__title']}
                                data-testid = "Container__Title"
                            >
                                <span
                                    className = {styles['footer-menu-column__label']}
                                    data-testid = "Text__Label"
                                >
                                    {label}
                                </span>
                                <div
                                    className = {classnames(
                                        styles['footer-menu-column__chevron'],
                                        {
                                            [styles['footer-menu-column__chevron--open']]: isOpen,
                                        },
                                    )}
                                    data-testid = {`Container__${menuIitemLabel}`}
                                >
                                    <Image
                                        src = "/svgs/chevron_right_red.svg"
                                        layout = "fill"
                                        objectFit = "cover"
                                        data-testid = "Icon__Chevron"
                                    />
                                </div>
                            </div>
                        )}
                    </Accordion.ItemHeaderSmart>
                    <Accordion.ItemBody>
                        {content}
                    </Accordion.ItemBody>
                </div>
            </Accordion.Item>
        </Accordion>
    )
}
