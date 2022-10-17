import { wrapperRender } from '@project/utils/testUtility';
import { NewsSecondaryMenuMobile } from '@components/News/NewsSecondaryMenuMobile';
import { newsSubmenuLinksMock } from '../../tests/mocks/news';

const newsSecondaryMenuMobileProps = () => {
    const submenuItems = newsSubmenuLinksMock.filter((item) => item.published);
    const defaultSelectedItemId = submenuItems[0]?.id;

    return {
        submenuItems,
        defaultSelectedItemId,
    };
}

describe('NewsSecondaryMenuMobile tests', () => {
    it('should render news secondary menu mobile component', () => {
        const { submenuItems, defaultSelectedItemId } = newsSecondaryMenuMobileProps();

        const { container } = wrapperRender(
            <NewsSecondaryMenuMobile
                submenuItems = {submenuItems}
                defaultSelectedItemId = {defaultSelectedItemId}
            />,
        );

        const newsSecondaryMenuMobileWrapper =
            container.getElementsByClassName('news-secondary-menu-mobile');

        expect(newsSecondaryMenuMobileWrapper.length).toBe(1);
    });
    it('should render news secondary menu mobile component with swiper', () => {
        const { submenuItems, defaultSelectedItemId } = newsSecondaryMenuMobileProps();

        const { container } = wrapperRender(
            <NewsSecondaryMenuMobile
                submenuItems = {submenuItems}
                defaultSelectedItemId = {defaultSelectedItemId}
            />,
        );

        const swiperContainer =
            container.getElementsByClassName('swiper-container');
        const swiperWrapper =
            container.getElementsByClassName('swiper-wrapper');

        expect(swiperContainer.length).toBe(1);
        expect(swiperWrapper.length).toBe(1);
    });

    it('should render correct count of swiper slides on news secondary menu mobile ', () => {
        const { submenuItems, defaultSelectedItemId } = newsSecondaryMenuMobileProps();

        const { container } = wrapperRender(
            <NewsSecondaryMenuMobile
                submenuItems = {submenuItems}
                defaultSelectedItemId = {defaultSelectedItemId}
            />,
        );

        const swiperSlides =
            container.getElementsByClassName('swiper-slide');

        expect(swiperSlides.length).toBe(2);
    });
});
