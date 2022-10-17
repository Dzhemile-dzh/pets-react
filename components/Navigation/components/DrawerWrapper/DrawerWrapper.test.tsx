import React from 'react';
import { screen } from '@testing-library/react'
import { convertToPascalCase } from '@project/utils/formatUtils';
import { wrapperRender } from '@project/utils/testUtility';
import { DrawerWrapper } from './DrawerWrapper';
import { DrawerItem } from './DrawerItem';

const drawerItems = [
    {
        id: 1,
        text: 'Log In',
        path: '/coming-soon',
        info: '',
    },
    {
        id: 2,
        text: 'Home',
        path: '/coming-soon',
        info: '',
    },
    {
        id: 3,
        text: 'Today\'s racing',
        path: '/today',
        info: '',
    },
    {
        id: 4,
        text: 'Racecards',
        path: '/coming-soon',
        info: '',
    },
    {
        id: 5,
        text: 'Results',
        path: '/coming-soon',
        info: '',
    },
    {
        id: 6,
        text: 'News',
        info: 'Award-winning racing journalism',
        path: '/coming-soon',
    },
    {
        id: 7,
        text: 'Tips',
        info: 'For Racing, football & more',
        path: '/coming-soon',
    },
    {
        id: 8,
        text: 'Bloodstock',
        path: '/coming-soon',
        info: '',
    },
    {
        id: 9,
        text: 'Greyhounds',
        path: '/coming-soon',
        info: '',
    },
    {
        id: 10,
        text: 'Free Bets & Offers',
        path: '/coming-soon',
        info: '',
    },
    {
        id: 11,
        text: 'Digital Newspaper',
        path: '/coming-soon',
        info: '',
    },
    {
        id: 12,
        text: 'Join Members Club',
        path: '/coming-soon',
        info: '',
    },
    {

        id: 13,
        text: 'My Racing Post',
        path: '/my-racing-post',
        info: '',
    },
    {
        id: 14,
        text: 'My Bookmakers',
        path: '/my-bookmakers',
        info: '',
    },
]

const getNextRace = (minutesOffset?: number, countryCode?: string) => {
    return {
        getNextUKOnlyRaceError: '',
        isNextUKOnlyRaceLoading: false,
        nextUKOnlyRaceData: {
            raceUrl: '',
            startTime: '',
            meetingName: '',
            countryCode: countryCode || '',
            utcTime: {
                raceDateTime: new Date(
                    new Date().getTime() + (minutesOffset || 0) * 60000,
                ).toUTCString(),
            },
        },
    }
}

const item = {
    id: 1,
    path: 'today',
    text: 'Today',
    info: '',
}

describe('DrawerWrapper', () => {
    test('To display navigation links on drawer when opened', () => {
        wrapperRender(<DrawerWrapper
            handleClick = {jest.fn(() => ({}))}
            isOpened
            items = {drawerItems}
            asPath = "/"
            nextRace = {getNextRace()}
        />)

        expect(screen.getByText('Log In')).toBeInTheDocument()
        expect(screen.getByText('Home')).toBeInTheDocument()
        expect(screen.getByText('Tips')).toBeInTheDocument()
        expect(screen.getByText('Today\'s racing')).toBeInTheDocument()
        expect(screen.getByText('Racecards')).toBeInTheDocument()
        expect(screen.getByText('Results')).toBeInTheDocument()
        expect(screen.getByText('News')).toBeInTheDocument()
        expect(screen.getByText('Bloodstock')).toBeInTheDocument()
        expect(screen.getByText('Greyhounds')).toBeInTheDocument()
        expect(screen.getByText('Free Bets & Offers')).toBeInTheDocument()
        expect(screen.getByText('Digital Newspaper')).toBeInTheDocument()
        expect(screen.getByText('Join Members Club')).toBeInTheDocument()
        expect(screen.getByText('My Racing Post')).toBeInTheDocument()
        expect(screen.getByText('My Bookmakers')).toBeInTheDocument()
        expect(screen.getByText('next race')).toBeInTheDocument()
    });

    test('To show today\'s racing tab as active', () => {
        const { container } = wrapperRender(<DrawerItem
            isActive
            item = {item}
            dataTestId = {`Container__${convertToPascalCase(item.text)}__DrawerItem`}
        />)
        expect(container.firstChild).toHaveClass('drawer__list-item-active')
    });
    test('To display "NOW" label for the next race countdown', () => {
        wrapperRender(<DrawerWrapper
            handleClick = {jest.fn(() => ({}))}
            isOpened
            items = {drawerItems}
            asPath = "/"
            nextRace = {getNextRace()}
        />)
        const countdownLabel = screen.getByTestId(
            'Text__DrawerHeaderRaceTime',
        )
        expect(countdownLabel).toHaveTextContent('NOW');
    });

    test('To display "1 MIN" label for the next race countdown', () => {
        wrapperRender(<DrawerWrapper
            handleClick = {jest.fn(() => ({}))}
            isOpened
            items = {drawerItems}
            asPath = "/"
            nextRace = {getNextRace(2)}
        />)
        const countdownLabel = screen.getByTestId(
            'Text__DrawerHeaderRaceTime',
        )
        expect(countdownLabel).toHaveTextContent('1 MIN');
    });

    test('To display "23 MINS" label for the next race countdown', () => {
        wrapperRender(<DrawerWrapper
            handleClick = {jest.fn(() => ({}))}
            isOpened
            items = {drawerItems}
            asPath = "/"
            nextRace = {getNextRace(23)}
        />)
        const countdownLabel = screen.getByTestId(
            'Text__DrawerHeaderRaceTime',
        )
        expect(countdownLabel).toHaveTextContent('23 MINS');
    });

    test('To display "LATER" label for the next race countdown', () => {
        wrapperRender(<DrawerWrapper
            handleClick = {jest.fn(() => ({}))}
            isOpened
            items = {drawerItems}
            asPath = "/"
            nextRace = {getNextRace(121)}
        />)
        const countdownLabel = screen.getByTestId(
            'Text__DrawerHeaderRaceTime',
        )
        expect(countdownLabel).toHaveTextContent('LATER');
    });

    test('To display "RACE" label for the next race countdown', () => {
        wrapperRender(<DrawerWrapper
            handleClick = {jest.fn(() => ({}))}
            isOpened
            items = {drawerItems}
            asPath = "/"
            nextRace = {getNextRace(10000)}
        />)
        const countdownLabel = screen.getByTestId(
            'Text__DrawerHeaderRaceTime',
        )
        expect(countdownLabel).toHaveTextContent('RACE');
    });
});
