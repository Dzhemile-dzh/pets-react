import { useRouter } from 'next/router';
import classnames from 'classnames';
import { NavigationRenderPropsInterface } from '../../interfaces';

import styles from './SecondaryNavigation.module.scss';

interface SecondaryNavigationInterface extends Omit<
NavigationRenderPropsInterface,
'betSelectionsCount' | 'nextRace' | 'isMobile' | 'nextThreeRacesData'
> {
    isMobile? : boolean,
    isWrapperFullWidth?: boolean,
    isNavigationListADiv?: boolean,
    children: React.ReactElement[] | React.ReactElement | string,
}

export const SecondaryNavigation = ({
    children,
    isMobile,
    isWrapperFullWidth,
    isNavigationListADiv,
}: SecondaryNavigationInterface) => {
    const { route } = useRouter();
    const pagesToBeVisibleOnMobile = ['bloodstock', 'news', 'betting-tips'];

    if (isMobile && !pagesToBeVisibleOnMobile.some((page) => route.includes(page))) {
        return null;
    }

    return (
        <nav
            className = {styles['secondary-navigation']}
            data-testid = "Container__SecondaryNavigation"
        >
            <div
                className = {
                    classnames(
                        styles['secondary-navigation__wrapper'],
                        {
                            [styles['secondary-navigation__wrapper--full-width']]: isWrapperFullWidth,
                        },
                    )
                }
                data-testid = "Container__SecondaryNavigationWrapper"
            >
                {
                    isNavigationListADiv ? (
                        <div
                            className = {styles['secondary-navigation__list']}
                            data-testid = "Container__SecondaryNavigationList"
                        >
                            {children}
                        </div>
                    ) : (
                        <ul
                            className = {styles['secondary-navigation__list']}
                            data-testid = "Container__SecondaryNavigationList"
                        >
                            {children}
                        </ul>
                    )
                }
            </div>
        </nav>
    )
}
