/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable max-len */
import React from 'react';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import { useUser } from '@auth0/nextjs-auth0';
import Link from 'next/link';
import { IS_REDIRECT_TO_RP1_ENABLED } from '@project/featureFlags';
import {
    upperLinks,
    upperLinksHybrid,
    bottomLinks,
    bottomLinksHybrid,
    bottomRightLinks,
} from '@project/NavigationMenus';
import HybridLink from '@components/base/HybridLink';
import Image from 'next/image';
import { NavigationRenderPropsInterface } from './interfaces';
import NextRaceNavigator from './components/NextRaceNavigator/index';
import SearchBar from '../base/SearchBar';
import RacingPostLogo from '../base/RacingPostLogo';
import { convertToPascalCase, formatHybridNavigationItemWithPrefTab } from '../../project/utils/formatUtils';

import styles from './Navigation.module.scss';

const AuthLinks = () => {
    const { user } = useUser();

    return user ? (
        <li className = {styles['navigation__upper-list-item']}>
            <a
                className = {styles.navigation__link}
                data-testid = "Link__Logout"
                href = "/api/auth/logout"
            >
                Logout
            </a>
        </li>
    ) : (
        <li className = {styles['navigation__upper-list-item']}>
            <a
                className = {classnames(
                    styles.navigation__link,
                    styles['navigation__link-with-icon'],
                )}
                data-testid = "Link__Login"
                href = "/api/auth/login"
            >
                <span
                    className = {styles['navigation__link-icon']}
                >
                    <Image
                        src = "/svgs/login_icon_desktop.svg"
                        width = {16}
                        height = {16}
                    />
                </span>
                Login
            </a>
        </li>
    )
}

export const DesktopNavigation = ({
    isMobile,
    nextThreeRacesData,
}: NavigationRenderPropsInterface) => {
    const { route } = useRouter();

    if (isMobile) {
        return null;
    }

    return (
        <nav
            className = {styles.navigation__container}
            data-testid = "Container__DesktopNavigation"
        >
            <div className = {styles['navigation__upper-wrapper']}>
                <div
                    className = {styles.navigation__upper}
                    data-testid = "Container__DesktopNavigationUpper"
                >
                    <ul className = {styles['navigation__upper-list']}>
                        {(IS_REDIRECT_TO_RP1_ENABLED ? upperLinksHybrid : upperLinks).map((link, index) => (
                            <li className = {styles['navigation__upper-list-item']} key = {index}>
                                <HybridLink
                                    hybridUrl = {link.path}
                                    url = {link.path}
                                    openInNewTab = {link.openInNewTab}
                                >
                                    <span
                                        className = {styles.navigation__link}
                                        data-testid = {`Link__${convertToPascalCase(link.text)}`}
                                    >
                                        {link.text}
                                    </span>
                                </HybridLink>
                                <span className = {styles['navigation__upper-list-item-divider']} />
                            </li>
                        ))}
                        <AuthLinks />
                    </ul>
                </div>
            </div>
            <div className = {styles['navigation__middle-wrapper']}>
                <div
                    className = {styles.navigation__middle}
                    data-testid = "Container__DesktopNavigationMiddle"
                >
                    <ul className = {styles['navigation__middle-list']}>
                        <li className = {styles['navigation__middle-list-item']}>
                            <Link href = "/">
                                <a
                                    aria-label = "Racing Post"
                                    className = {classnames(
                                        styles.navigation__link,
                                        styles.racing_post_logo__header,
                                    )}
                                    data-testid = "Link__RacingPostLogo"
                                >
                                    <RacingPostLogo
                                        width = "180px"
                                        height = "20px"
                                    />
                                </a>
                            </Link>
                        </li>
                    </ul>
                    <div className = {styles['navigation__middle-search-bar']}>
                        <SearchBar text = "Search horses, jockeys and trainers … " />
                    </div>
                    <NextRaceNavigator
                        shouldShowTooltip = {!isMobile}
                        nextThreeRacesData = {nextThreeRacesData}
                    />
                </div>
            </div>
            <div className = {styles['navigation__bottom-wrapper']}>
                <div
                    className = {styles.navigation__bottom}
                    data-testid = "Container__DesktopNavigationBottom"
                >
                    <ul
                        className = {styles['navigation__bottom-list-left']}
                        data-testid = "Container__DesktopNavigationBottomLeft"
                    >
                        { (IS_REDIRECT_TO_RP1_ENABLED ? bottomLinksHybrid : bottomLinks).map((link, index) => (
                            <li
                                className = {classnames(
                                    styles['navigation__bottom-list-item'],
                                    {
                                        [styles['navigation__bottom-list-item--active']]:
                                        route.includes(link.path),
                                        [styles[`navigation__bottom-list-item--active-${link.text}`]]:
                                        route.includes(link.path),
                                    },
                                )}
                                key = {index}
                            >
                                <HybridLink
                                    hybridUrl = {formatHybridNavigationItemWithPrefTab(link.path)}
                                    url = {link.path}
                                >
                                    <span
                                        className = {styles.navigation__link}
                                        data-testid = {`Link__${convertToPascalCase(link.text)}`}
                                    >
                                        {link.text}
                                    </span>
                                </HybridLink>
                            </li>
                        ))}
                    </ul>
                    <ul
                        className = {styles['navigation__bottom-list-right']}
                        data-testid = "Container__DesktopNavigationBottomRight"
                    >
                        {bottomRightLinks.map((link, index) => (
                            <li
                                className = {classnames(
                                    styles['navigation__bottom-list-right-item'],
                                )}
                                key = {index}
                            >
                                <HybridLink
                                    hybridUrl = {link.path}
                                    url = {link.path}
                                    openInNewTab = {link.openInNewTab}
                                >
                                    <span
                                        className = {classnames(
                                            styles.navigation__link,
                                            {
                                                [styles['navigation__bottom-list-item--active']]:
                                        route.includes(link.path),
                                                [styles[`navigation__bottom-list-item--active-${link.text}`]]:
                                        route.includes(link.path),
                                            },
                                        )}
                                        data-testid = {`Link__${convertToPascalCase(link.text)}`}
                                    >
                                        {link.text}
                                    </span>
                                </HybridLink>
                            </li>
                        ))}
                        <li
                            className = {classnames(
                                styles['navigation__bottom-list-right-item'],
                            )}
                        >
                            <HybridLink
                                hybridUrl = "" // temporary added because of failing tests once the more
                                url = "" // more menu is done the hybrid component will be replaced
                            >
                                <span
                                    className = {classnames(
                                        styles.navigation__link,
                                        {
                                            [styles['navigation__bottom-list-item--active']]:
                                        route.includes('more'),
                                            [styles['navigation__bottom-list-item--active-more']]:
                                        route.includes('more'),
                                        },
                                    )}
                                    data-testid = "Link__More"
                                >
                                    more
                                </span>
                                <span className = {styles['navigation__link-icon']}>
                                    <Image
                                        src = "/svgs/chevron_right_black_small.svg"
                                        width = {10}
                                        height = {6}
                                    />
                                </span>
                            </HybridLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
