import classnames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IS_REDIRECT_TO_RP1_ENABLED } from '@project/featureFlags';
import {
    mobileBottomLinksHybrid,
    mobileBottomLinks,
} from '@project/NavigationMenus';
import HybridLink from '@components/base/HybridLink';
import { NavigationRenderPropsInterface } from './interfaces';
import { useBetslip } from '../contexts/BetslipContext';
import { SearchIcon } from '../base/Icons/SearchIcon';
import BetslipIcon from '../Betslip/components/BetslipIcon';
import NavigationMenu from './components/NavigationMenu';
import RacingPostLogo from '../base/RacingPostLogo';
import { convertToPascalCase, formatHybridNavigationItemWithPrefTab } from '../../project/utils/formatUtils';

import styles from './Navigation.module.scss';

export const MobileNavigation = ({
    betSelectionsCount,
    isMobile,
    nextRace,
}: NavigationRenderPropsInterface) => {
    const { toggleBetslip } = useBetslip();

    const { asPath, route } = useRouter();
    if (!isMobile) {
        return null;
    }

    return (
        <div
            className = {styles.navigation__container}
            data-testid = "Container__MobileNavigation"
        >
            <div
                className = {styles.navigation__upper}
                data-testid = "Container__MobileNavigationUpper"
            >
                <div className = {styles['navigation__upper-rp-logo']}>
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
                </div>
                <SearchIcon
                    className = {styles['search-bar__btn-icon']}
                />
                <div className = {styles['navigation__upper-betslip-icon']}>
                    <BetslipIcon
                        type = "counter"
                        count = {betSelectionsCount}
                        clickHandler = {toggleBetslip}
                    />
                </div>
                <NavigationMenu asPath = {asPath} nextRace = {nextRace} />
            </div>
            <div
                className = {styles.navigation__bottom}
                data-testid = "Container__MobileNavigationBottom"
            >
                <ul className = {styles['navigation__bottom-list']}>
                    {(IS_REDIRECT_TO_RP1_ENABLED ?
                        mobileBottomLinksHybrid : mobileBottomLinks).map((link, index) => (
                        <li
                            className = {classnames(
                                styles['navigation__bottom-list-item'],
                                {
                                    [styles['navigation__bottom-list-item--active']]:
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
            </div>
        </div>
    )
}
