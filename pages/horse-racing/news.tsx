import React from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import { Constants } from '@project/constants';

import { usePageTracker } from '@components/custom-hooks/usePageTracker';
import { NavigationRenderPropsInterface } from '@components/Navigation/interfaces';

import GlideContent from '@components/Glide';
import { StateInterface } from '@store/state/types';
import { MenuItemInterface, MenusType } from '@components/interfaces';

import Container from '@components/Layouts/Container';
import { Navigation, NavigationLink } from '@components/Navigation';
import { useBreakPoint } from '@components/contexts/BreakPointContext';
import NewsSecondaryMenuMobile from '@components/News';

const {
    PAGE_NAMES: {
        NEWS_INDEX,
    },
    MENU_NAMES: {
        NEWS_SUB_MENU,
    },
} = Constants;

const newsSubmenuItems = (menus: MenusType) => {
    if (!menus || !menus[NEWS_SUB_MENU]) {
        return {};
    }

    const publishedItems = menus[NEWS_SUB_MENU]
        .filter((item: MenuItemInterface) => item.published);
    const firstPublishedItemId = publishedItems[0]?.id;

    return {
        submenuItems: publishedItems,
        defaultSelectedItemId: firstPublishedItemId,
    }
}

const NewsPage = () => {
    const menus = useSelector((state: StateInterface) => state.glide.menus);
    const { isMobile } = useBreakPoint();

    usePageTracker(NEWS_INDEX);

    const { asPath } = useRouter();
    const { submenuItems, defaultSelectedItemId } = newsSubmenuItems(menus);

    return (
        <>
            <Navigation type = "news">
                {
                    (props : NavigationRenderPropsInterface) => (
                        <>
                            <Navigation.MobileNavigation {...props} />
                            <Navigation.DesktopNavigation {...props} />
                            <Navigation.SecondaryNavigation
                                {...props}
                                isWrapperFullWidth = {isMobile}
                                isNavigationListADiv = {isMobile}
                            >
                                {
                                    isMobile ? (
                                        <NewsSecondaryMenuMobile
                                            submenuItems = {submenuItems}
                                            defaultSelectedItemId = {defaultSelectedItemId}
                                        />
                                    ) :
                                        submenuItems && (
                                            submenuItems.map((item) => (
                                                <NavigationLink
                                                    key = {item.id}
                                                    // below href will be changed with{ item.url }
                                                    href = "/horse-racing/news"
                                                    label = {item.label}
                                                    isActive = {item.id === defaultSelectedItemId}
                                                />
                                            ))
                                        )
                                }
                            </Navigation.SecondaryNavigation>
                        </>
                    )
                }
            </Navigation>
            <Container paddingLeft paddingRight>
                <GlideContent path = {asPath} />
            </Container>
        </>
    )
};

export default NewsPage;
NewsPage.displayName = 'NewsPage';
NewsPage.isHavingSSR = false;
