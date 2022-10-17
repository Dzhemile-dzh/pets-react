import React from 'react';
import { fireEvent, screen } from '@testing-library/react'
import { useRouter } from 'next/router';
import { wrapperRender } from '../../../../project/utils/testUtility';
import { SecondaryNavigation } from './SecondaryNavigation';
import * as datesUtilities from '../../../../project/utils/generateNavigationDates';
import { compareDates } from '../../../../project/utils';
import NavigationLink from './components/NavigationLink';
import CalendarLink from './components/CalendarLink';
import { newsSubmenuLinksMock } from '../../../../tests/mocks/news';

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));

const resultsLinks = [
    {
        href: '/racing-result/2021-08-12',
        date: '2021-08-12',
        label: 'today',
    },
    {
        href: '/racing-result/2021-08-11',
        date: '2021-08-11',
        label: 'yesterday',
    },
    {
        href: '/racing-result/2021-08-10',
        date: '2021-08-10',
        label: 'Tue Aug 10',
    },
    {
        href: '/racing-result/2021-08-09',
        date: '2021-08-09',
        label: 'Mon Aug 9',
    },
    {
        href: '/racing-result/2021-08-08',
        date: '2021-08-08',
        label: 'Sun Aug 8',
    },
    {
        href: '/racing-result/2021-08-07',
        date: '2021-08-07',
        label: 'Sat Aug 7',
    },
    {
        href: '/racing-result/2021-08-06',
        date: '2021-08-06',
        label: 'Fri Aug 6',
    },
];

const racecardsLinks = [
    {
        href: '/racecards/2021-08-12',
        date: '2021-08-12',
        label: 'today',
    },
    {
        href: '/racecards/2021-08-13',
        date: '2021-08-13',
        label: 'tomorrow',
    },
    {
        href: '/racecards/2021-08-14',
        date: '2021-08-14',
        label: 'Sat Aug 14',
    },
    {
        href: '/racecards/2021-08-15',
        date: '2021-08-15',
        label: 'Sun Aug 15',
    },
    {
        href: '/racecards/2021-08-16',
        date: '2021-08-16',
        label: 'Mon Aug 16',
    },
    {
        href: '/racecards/2021-08-17',
        date: '2021-08-17',
        label: 'Tue Aug 17',
    },
    {
        href: '/racecards/2021-08-18',
        date: '2021-08-18',
        label: 'Wed Aug 18',
    },
];

// Testing NavigationLink with results data
let date = '2021-08-12';
const childrenResultsNavigationLinks = resultsLinks.map((link, index) => (
    <NavigationLink
        {...link}
        key = {index}
        isActive = {compareDates(date, link.date) === 0}
    />
));

// Testing NavigationLink with racecards data
date = '2021-08-14';
const childrenRaceCardsNavigationLinks = racecardsLinks.map((link, index) => (
    <NavigationLink
        {...link}
        key = {index}
        isActive = {compareDates(date, link.date) === 0}
    />
));

// Testing News Submenu Links
const newsSubmenuNavigationLinks = () => {
    const publishedItems = newsSubmenuLinksMock.filter((item) => item.published);
    const firstPublishedItemId = publishedItems[0]?.id;

    return publishedItems.map((link, index) => {
        return (
            <NavigationLink
                {...link}
                href = {link.url}
                key = {index}
                isActive = {link.id === firstPublishedItemId}
            />
        );
    });
}

describe('SecondaryNavigation', () => {
    const push = jest.fn();
    test('should show results links', () => {
        (useRouter as jest.Mock).mockImplementation(() => ({
            push,
        }));

        const { container } = wrapperRender(
            <SecondaryNavigation>
                {childrenResultsNavigationLinks}
            </SecondaryNavigation>,
        );

        expect(container.getElementsByClassName('secondary-navigation__list-item-active-tab')
            .length).toBe(1);

        expect(screen.getByText('today')).toBeInTheDocument();
        expect(screen.getByText('yesterday')).toBeInTheDocument();
        expect(screen.getByText('Tue Aug 10')).toBeInTheDocument();
        expect(screen.getByText('Mon Aug 9')).toBeInTheDocument();
        expect(screen.getByText('Sun Aug 8')).toBeInTheDocument();
        expect(screen.getByText('Sat Aug 7')).toBeInTheDocument();
        expect(screen.getByText('Fri Aug 6')).toBeInTheDocument();
    });

    test('should show active on /racecards and list with links', () => {
        (useRouter as jest.Mock).mockImplementation(() => ({
            push,
        }));

        const { container } = wrapperRender(
            <SecondaryNavigation>
                {childrenRaceCardsNavigationLinks}
            </SecondaryNavigation>,
        );

        expect(container.getElementsByClassName('secondary-navigation__list-item-active')
            .length).toBe(1);

        expect(screen.getByText('today')).toBeInTheDocument();
        expect(screen.getByText('tomorrow')).toBeInTheDocument();
        expect(screen.getByText('Sat Aug 14')).toBeInTheDocument();
        expect(screen.getByText('Sun Aug 15')).toBeInTheDocument();
        expect(screen.getByText('Mon Aug 16')).toBeInTheDocument();
        expect(screen.getByText('Tue Aug 17')).toBeInTheDocument();
        expect(screen.getByText('Wed Aug 18')).toBeInTheDocument();
    })

    test('should be able to open and close the calendar', () => {
        (useRouter as jest.Mock).mockImplementation(() => ({
            push,
        }));
        jest.spyOn(datesUtilities, 'generateNavigationDates').mockReturnValue(racecardsLinks);

        const { getByText } = wrapperRender(
            <SecondaryNavigation>
                <CalendarLink />
            </SecondaryNavigation>,
        );

        fireEvent.click(getByText('choose date'))

        expect(screen.getByTestId('Container__SecondaryNavigationCalendar')).toBeInTheDocument();

        fireEvent.click(screen.getByTestId('Icon__CloseCalendar'))

        // queryByTestId doesn't fail if it doesn't find it, but getByTestId fails
        expect(screen.queryByTestId('Container__SecondaryNavigationCalendar')).toBeNull();
    });

    test('should show News Page submenu ONLY with PUBLISHED items AND in correct order', () => {
        (useRouter as jest.Mock).mockImplementation(() => ({
            push,
        }));

        const { container } = wrapperRender(
            <SecondaryNavigation>
                {newsSubmenuNavigationLinks()}
            </SecondaryNavigation>,
        );

        const activeLinkElements =
            container.getElementsByClassName('secondary-navigation__list-item-active');

        expect(activeLinkElements.length).toBe(1);

        expect(activeLinkElements[0]).toHaveTextContent('News');

        expect(container.getElementsByClassName('secondary-navigation__list-item').length)
            .toBe(2);

        expect(container.getElementsByClassName('secondary-navigation__list-item')[0])
            .toHaveTextContent('News');
    })
    test('should render Secondary Navigation with full-width and correct HTML tag for the navigation list', () => {
        (useRouter as jest.Mock).mockImplementation(() => ({
            push,
        }));

        const { container } = wrapperRender(
            <SecondaryNavigation
                isWrapperFullWidth
                isNavigationListADiv
            >
                {newsSubmenuNavigationLinks()}
            </SecondaryNavigation>,
        );

        const secondaryNavigationWrapper =
            container.getElementsByClassName('secondary-navigation__wrapper--full-width');
        const secondaryNavigationNavigationListWrapper =
            container.getElementsByClassName('secondary-navigation__list');

        expect(secondaryNavigationWrapper.length).toBe(1);
        expect(secondaryNavigationNavigationListWrapper.length).toBe(1);
        expect(secondaryNavigationNavigationListWrapper[0].tagName).toEqual('DIV');
    })
});
