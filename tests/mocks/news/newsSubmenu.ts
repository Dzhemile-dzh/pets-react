import { MenuItemInterface } from '@components/interfaces';

export const newsSubmenuLinksMock: MenuItemInterface[] = [
    {
        id: 231,
        label: 'Business ',
        position: 0,
        published: false,
        url: '/horse-racing/news/',
        menuId: 1,
        menuItemId: '1',
        children: [],
    },
    {
        id: 235,
        label: 'News',
        position: 1,
        published: true,
        url: '/horse-racing/news/business/',
        menuId: 1,
        menuItemId: '1',
        children: [],
    },
    {
        id: 232,
        label: 'UK ',
        position: 2,
        published: true,
        url: '/horse-racing/news/uk/',
        menuId: 1,
        menuItemId: '1',
        children: [],
    },
];
