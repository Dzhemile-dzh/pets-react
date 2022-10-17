import { ReactElement } from 'react';
import { useRouter } from 'next/router';

import { Constants } from '@project/constants';

import GlideContent from '@components/Glide';
import Container from '@components/Layouts/Container';
import Betslip from '@components/Betslip';
import { usePageTracker } from '@components/custom-hooks/usePageTracker';
import { Navigation, NavigationLink } from '@components/Navigation';
import { NavigationRenderPropsInterface } from '@components/Navigation/interfaces';
import RaceIndexHeader from '@components/RaceCards/components/RaceIndexHeader';

const {
    PAGE_NAMES: {
        TIPPING_INDEX,
    },
} = Constants;

const secondaryNavigationLinks = [
    {
        label: 'tips centre',
        path: '/betting-tips',
        active: true,
    },
    {
        label: 'racing tips',
        path: '/betting-tips',
        active: false,
    },
    {
        label: 'naps table',
        path: '/betting-tips',
        active: false,
    },
    {
        label: 'football tips',
        path: '/betting-tips',
        active: false,
    },
]

const BettingTipsPage = () : ReactElement => {
    const { asPath } = useRouter();

    usePageTracker(TIPPING_INDEX);

    return (
        <div data-testid = "Container__BettingTips">
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
            <RaceIndexHeader headerTitle = "Tips Centre" />
            <Container paddingLeft paddingRight>
                <GlideContent path = {asPath} />
            </Container>
        </div>
    )
}

export default BettingTipsPage;
BettingTipsPage.displayName = 'BettingTipsPage';
BettingTipsPage.isHavingSSR = false;
