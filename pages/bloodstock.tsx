import React, { ReactElement } from 'react';

import { Constants } from '../project/constants';
import { usePageTracker } from '../components/custom-hooks/usePageTracker';

import Betslip from '../components/Betslip';
import { Navigation, NavigationLink } from '../components/Navigation';
import { NavigationRenderPropsInterface } from '../components/Navigation/interfaces';
import RaceIndexHeader from '../components/RaceCards/components/RaceIndexHeader';

const {
    PAGE_NAMES: {
        BLOODSTOCK_INDEX,
    },
} = Constants;

const BloodstockPage = () : ReactElement => {
    usePageTracker(BLOODSTOCK_INDEX);

    const secondaryNavigationLinks = [
        {
            label: 'news',
            path: '/bloodstock',
            active: true,
        },
        {
            label: 'sales',
            path: '/bloodstock',
            active: false,
        },
        {
            label: 'stallion book',
            path: '/bloodstock',
            active: false,
        },
    ]

    return (
        <div data-testid = "Container__Bloodstock">
            <Betslip />
            <Navigation>
                {
                    (props : NavigationRenderPropsInterface) => (
                        <>
                            <Navigation.MobileNavigation {...props} />
                            <Navigation.DesktopNavigation {...props} />
                            <Navigation.SecondaryNavigation {...props}>
                                {secondaryNavigationLinks.map((link, index) => (
                                    <NavigationLink
                                        key = {index}
                                        href = {link.path}
                                        label = {link.label}
                                        isActive = {link.active}
                                    />

                                ))}
                            </Navigation.SecondaryNavigation>
                        </>
                    )
                }
            </Navigation>
            <RaceIndexHeader
                headerTitle = "Bloodstock"
            />
        </div>
    )
}

export default BloodstockPage;
BloodstockPage.displayName = 'BloodstockPage';
BloodstockPage.isHavingSSR = false;
