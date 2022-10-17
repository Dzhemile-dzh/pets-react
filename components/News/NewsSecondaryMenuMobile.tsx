import React, { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { NavigationLink } from '@components/Navigation';
import 'swiper/swiper.min.css';
import { MenuItemInterface } from '@components/interfaces';
import styles from './NewsSecondaryMenuMobile.module.scss';

interface NewsSecondaryMenuMobileInterface {
    submenuItems: MenuItemInterface[],
    defaultSelectedItemId: number,
}

export const NewsSecondaryMenuMobile: FC<NewsSecondaryMenuMobileInterface> =
    ({ submenuItems, defaultSelectedItemId }) => {
        return (
            <div
                className = {styles['news-secondary-menu-mobile']}
                data-testid = "Container__NewsSecondaryMenuMobile"
            >
                <Swiper
                    slidesPerView = "auto"
                >
                    {
                        submenuItems && (
                            submenuItems.map((item) => (
                                <SwiperSlide
                                    className = {styles['news-secondary-menu-mobile__swiper-slide']}
                                    data-testid = "SwiperSlide__NewsSecondaryMenuMobileItem"
                                    key = {item.id}
                                >
                                    <NavigationLink
                                        key = {item.id}
                                        // below href will be changed with{ item.url }
                                        href = "/horse-racing/news"
                                        label = {item.label}
                                        isActive = {item.id === defaultSelectedItemId}
                                        isNavigationLinkWithDivWrapper
                                    />
                                </SwiperSlide>
                            )))
                    }
                </Swiper>
            </div>
        );
    };
