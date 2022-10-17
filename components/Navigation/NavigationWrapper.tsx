import { memo } from 'react';
import { withNextThreeRaces } from '../../store/providers';

import { Navigation } from './Navigation';
import { DesktopNavigation } from './DesktopNavigation'
import { MobileNavigation } from './MobileNavigation';
import SecondaryNavigation from './components/SecondaryNavigation';
import { NavigationWrapperInterface, NavigationInterface } from './interfaces';

const NavigationWrapper = memo(({
    children,
    ...rest
} : NavigationWrapperInterface) : React.ReactElement => {
    return (
        <Navigation
            {...rest as NavigationInterface}
        >
            {children}
        </Navigation>
    )
})

NavigationWrapper.displayName = 'NavigationWrapper';

const NavigationWithwithNextThreeRaces = withNextThreeRaces(
    NavigationWrapper,
)

NavigationWithwithNextThreeRaces.DesktopNavigation = DesktopNavigation;
NavigationWithwithNextThreeRaces.MobileNavigation = MobileNavigation;
NavigationWithwithNextThreeRaces.SecondaryNavigation = SecondaryNavigation;

export default NavigationWithwithNextThreeRaces;
