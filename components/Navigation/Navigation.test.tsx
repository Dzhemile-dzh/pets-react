// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from 'react';
import { useRouter } from 'next/router';

import { render, screen } from '@testing-library/react'
import * as redux from 'react-redux';
import * as Auth0Hooks from '@auth0/nextjs-auth0';
import { IS_REDIRECT_TO_RP1_ENABLED } from '@project/featureFlags';
import { Navigation } from './Navigation';
import { nextThreeRacesTestData } from './components/NextThreeRaces/NextThreeRaces.test';
import { DesktopNavigation } from './DesktopNavigation';
import { MobileNavigation } from './MobileNavigation';
import SecondaryNavigation from './components/SecondaryNavigation';
import * as hooks from '../contexts/BreakPointContext';

const navigationChildrenMobile = (props) => (
    <MobileNavigation
        {...props}
    />
)

const navigationChildrenDesktop = (props) => (
    <>
        <DesktopNavigation
            {...props}
        />
        <SecondaryNavigation
            {...props}
        />
    </>
)

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));

const push = jest.fn();

describe('Navigation', () => {
    test('To show today\'s racing tab as active on desktop', () => {
        useRouter.mockImplementation(() => ({
            route: '/today',
            asPath: '/today',
            push,
        }));

        jest.spyOn(hooks, 'useBreakPoint').mockImplementation(() => ({
            isDesktop: true,
        }));

        const useDispatchSpy = jest.spyOn(redux, 'useDispatch');
        const mockDispatchFn = jest.fn()
        useDispatchSpy.mockReturnValue(mockDispatchFn);

        jest.spyOn(Auth0Hooks, 'useUser').mockImplementation(() => ({
            user: undefined,
        }))

        jest.spyOn(redux, 'useSelector')
        // bet selections count
            .mockReturnValueOnce(1)
            .mockReturnValueOnce()

        const { container } = render(
            <Navigation
                nextThreeRacesData = {nextThreeRacesTestData}
            >
                {navigationChildrenDesktop}
            </Navigation>,
        )
        !IS_REDIRECT_TO_RP1_ENABLED && expect(container.getElementsByClassName('navigation__bottom-list-item--active')
            .length).toBe(1);
    });

    test('To show today\'s racing tab as active on mobile', () => {
        useRouter.mockImplementation(() => ({
            route: '/today',
            asPath: '/today',
            push,
        }));

        jest.spyOn(hooks, 'useBreakPoint').mockImplementation(() => ({
            isMobile: true,
        }));

        const useDispatchSpy = jest.spyOn(redux, 'useDispatch');
        const mockDispatchFn = jest.fn()
        useDispatchSpy.mockReturnValue(mockDispatchFn);

        jest.spyOn(redux, 'useSelector')
        // bet selections count
            .mockReturnValueOnce(1)
            .mockReturnValueOnce()

        const { container } = render(
            <Navigation
                nextThreeRacesData = {nextThreeRacesTestData}
            >
                {navigationChildrenMobile}
            </Navigation>,
        )
        if (!IS_REDIRECT_TO_RP1_ENABLED) {
            expect(container.getElementsByClassName('navigation__bottom-list-item--active')
                .length).toBe(1);
        }
    });
    test('To display navigation links on mobile', () => {
        useRouter.mockImplementation(() => ({
            route: '/today',
            asPath: '/today',
            push,
        }));

        jest.spyOn(hooks, 'useBreakPoint').mockImplementation(() => ({
            isMobile: true,
        }));

        const useDispatchSpy = jest.spyOn(redux, 'useDispatch');
        const mockDispatchFn = jest.fn()
        useDispatchSpy.mockReturnValue(mockDispatchFn);

        jest.spyOn(Auth0Hooks, 'useUser').mockImplementation(() => ({
            user: undefined,
        }))

        jest.spyOn(redux, 'useSelector')
        // bet selections count
            .mockReturnValueOnce(1)
            .mockReturnValueOnce()

        render(
            <Navigation
                betSelectionsCount = {1}
                getNextThreeRaces = {jest.fn(() => ({}))}
                nextThreeRacesData = {nextThreeRacesTestData}
            >
                {navigationChildrenMobile}
            </Navigation>,
        )
        expect(screen.getByText('Racecards')).toBeInTheDocument()
        expect(screen.getByText('Results')).toBeInTheDocument()
        expect(screen.getByText('News')).toBeInTheDocument()
        if (!IS_REDIRECT_TO_RP1_ENABLED) {
            expect(screen.getByText('Today\'s racing')).toBeInTheDocument()
        }
    });
    test('To display navigation links on desktop', () => {
        useRouter.mockImplementation(() => ({
            route: '/today',
            asPath: '/today',
            push,
        }));

        jest.spyOn(hooks, 'useBreakPoint').mockImplementation(() => ({
            isDesktop: true,
        }));

        const useDispatchSpy = jest.spyOn(redux, 'useDispatch');
        const mockDispatchFn = jest.fn()
        useDispatchSpy.mockReturnValue(mockDispatchFn);

        jest.spyOn(Auth0Hooks, 'useUser').mockImplementation(() => ({
            user: undefined,
        }))

        jest.spyOn(redux, 'useSelector')
        // bet selections count
            .mockReturnValueOnce(1)
            .mockReturnValueOnce()

        render(
            <Navigation
                getNextThreeRaces = {jest.fn(() => ({}))}
                nextThreeRacesData = {nextThreeRacesTestData}
            >
                {navigationChildrenDesktop}
            </Navigation>,
        )
        expect(screen.getByText('My Bookmakers')).toBeInTheDocument()
        expect(screen.getByText('FREE BETS & OFFERS')).toBeInTheDocument()
        expect(screen.getByText('DIGITAL NEWSPAPER')).toBeInTheDocument()
        expect(screen.getByText('SHOP')).toBeInTheDocument()
        if (!IS_REDIRECT_TO_RP1_ENABLED) {
            expect(screen.getByText('My Racing Post')).toBeInTheDocument()
            expect(screen.getByText('JOIN members’ club')).toBeInTheDocument()
            expect(screen.getByText('Today\'s racing')).toBeInTheDocument()
        }
        if (IS_REDIRECT_TO_RP1_ENABLED) {
            expect(screen.getByText('Subscribe')).toBeInTheDocument()
        }
        expect(screen.getByText('Login')).toBeInTheDocument()
        expect(screen.getByText('bloodstock')).toBeInTheDocument()
        expect(screen.getByText('greyhounds')).toBeInTheDocument()
        expect(screen.getByText('more')).toBeInTheDocument()
    });
});
