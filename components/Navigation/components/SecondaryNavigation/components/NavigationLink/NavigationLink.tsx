import { FC } from 'react'
import classnames from 'classnames';
import Link from 'next/link';
import SecondaryNavigationStyles from '../../SecondaryNavigation.module.scss'
import { convertToPascalCase } from '../../../../../../project/utils/formatUtils';

export interface NavigationProps {
    href: string,
    label: string,
    isActive: boolean,
    isNavigationLinkWithDivWrapper?: boolean,
}

export const NavigationLink: FC<NavigationProps> =
    ({
        href, label, isActive, isNavigationLinkWithDivWrapper,
    }) => {
        const content = (
            <Link href = {href}>
                <a
                    className = {SecondaryNavigationStyles['secondary-navigation__list-item-link']}
                    data-testid = {`Button__${convertToPascalCase(label)}`}
                >
                    {label}
                    {isActive && (
                        <div className = {
                            SecondaryNavigationStyles['secondary-navigation__list-item-active-tab']
                        }
                        />
                    )}
                </a>
            </Link>
        );

        return (
            isNavigationLinkWithDivWrapper ? (
                <div className = {classnames(
                    SecondaryNavigationStyles['secondary-navigation__list-item'],
                    {
                        [SecondaryNavigationStyles['secondary-navigation__list-item-active']]: isActive,
                    },
                )}
                >
                    {content}
                </div>
            ) : (
                <li className = {classnames(
                    SecondaryNavigationStyles['secondary-navigation__list-item'],
                    {
                        [SecondaryNavigationStyles['secondary-navigation__list-item-active']]: isActive,
                    },
                )}
                >
                    {content}
                </li>
            )
        );
    };
