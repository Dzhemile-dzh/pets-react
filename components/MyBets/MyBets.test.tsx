/* eslint-disable max-len */
import React from 'react';
import { useRouter } from 'next/router';
import * as redux from 'react-redux'
import { screen, fireEvent } from '@testing-library/react'
import {
    bookmakerSessions,
    emptySettledBetHistory,
    emptyUnsettledBetHistory,
    unsettledBetHistorySingle,
    settledBetHistorySingle,
    unsettledBetHistoryMultiples,
} from '../../tests/mocks';
import { wrapperRender as render } from '../../project/utils/testUtility';
import { MyBets } from './MyBets';
import * as hooks from '../contexts/BreakPointContext';

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));

describe('MyBets - mobile - when user is logged in', () => {
    test('renders component', () => {
        jest.spyOn(hooks, 'useBreakPoint').mockImplementation(() => ({
            isMobile: true,
        }));

        jest.spyOn(redux, 'useSelector')
            .mockReturnValueOnce(emptyUnsettledBetHistory)
            .mockReturnValueOnce(emptySettledBetHistory)

        const push = jest.fn();

        (useRouter as jest.Mock).mockImplementation(() => ({
            push,
        }));

        render(<MyBets
            bookmakers = {bookmakerSessions}
            totalBalance = "£365"
            totalFreeBetsBalance = "£10"
        />);

        screen.getByText('MY BETS');
        screen.getByTestId('Container__Sort');

        const openFilter = screen.getByTestId('SlideToggleButton__Open');
        const settledFilter = screen.getByTestId('SlideToggleButton__Settled');
        expect(openFilter.getAttribute('class')).toContain('active');
        expect(settledFilter.getAttribute('class')).not.toContain('active');

        jest.spyOn(redux, 'useSelector')
            .mockReturnValueOnce(emptyUnsettledBetHistory)
            .mockReturnValueOnce(emptySettledBetHistory)
        fireEvent.click(settledFilter);

        expect(openFilter.getAttribute('class')).not.toContain('active');
        expect(settledFilter.getAttribute('class')).toContain('active');

        const backButton = screen.getByTestId('Header__BackButton');
        jest.spyOn(redux, 'useSelector')
            .mockReturnValueOnce(emptyUnsettledBetHistory)
            .mockReturnValueOnce(emptySettledBetHistory)

        fireEvent.click(backButton);

        expect(push).toHaveBeenCalledWith('/my-bookmakers');
    });

    test('Should display unsettled bet history at first and toggle to settled bet history', () => {
        jest.spyOn(hooks, 'useBreakPoint').mockImplementation(() => ({
            isMobile: true,
        }));

        jest.spyOn(redux, 'useSelector')
            .mockReturnValueOnce(unsettledBetHistorySingle)
            .mockReturnValueOnce(settledBetHistorySingle)

        render(<MyBets
            bookmakers = {bookmakerSessions}
            totalBalance = "£365"
            totalFreeBetsBalance = "£10"
        />);

        screen.getByText('Single');
        screen.getByText('0.86');
        screen.getAllByText('08:24, 14 Sep 2021');
        screen.getByText('1:30 Punchestown');
        screen.getByText('2/1');
        screen.getAllByText('RECEIPT NUMBER');
        screen.getAllByText('PLACED AT');
        screen.getAllByText('BET TYPE');
        screen.getAllByText('ESTIMATED RETURN');
        screen.queryAllByText('Single');
        screen.getByText('O/11822704/0032368/F');

        // Since we are going to trigger onclick event
        // it will cause the component to rerender and we need to spy
        // the useSelector hook again to return the same values
        jest.spyOn(redux, 'useSelector')
            .mockReturnValueOnce(unsettledBetHistorySingle)
            .mockReturnValueOnce(settledBetHistorySingle)

        const settledToggleButton = screen.queryByTestId('SlideToggleButton__Settled');
        fireEvent.click(settledToggleButton);

        screen.getByText('Single');
        screen.getByText('0.03');
        screen.getAllByText('11:47, 17 Dec 2021');
        screen.getByText('1:45 Ascot');
        screen.getByText('10/3');
        screen.getAllByText('RECEIPT NUMBER');
        screen.getAllByText('PLACED AT');
        screen.getAllByText('BET TYPE');
        screen.getAllByText('TOTAL STAKE');
        screen.queryAllByText('Single');
        screen.getByText('O/11822704/0033946/F');
        screen.getByText('won');
    });

    test('MOBILE - displays unsettled bets selections when click on view selections', () => {
        jest.spyOn(hooks, 'useBreakPoint').mockImplementation(() => ({
            isMobile: true,
        }));

        jest.spyOn(redux, 'useSelector')
            .mockReturnValueOnce(unsettledBetHistoryMultiples)
            .mockReturnValueOnce(emptySettledBetHistory)

        render(<MyBets
            bookmakers = {bookmakerSessions}
            totalBalance = "£365"
            totalFreeBetsBalance = "£10"
        />);

        const viewMoreSelButton = screen.getByTestId('Button__MyBetsAdditionalActions');

        expect(viewMoreSelButton).toBeInTheDocument();

        screen.getByText('view selections');

        fireEvent.click(viewMoreSelButton);

        screen.getByText('close selections');

        screen.getByText('Lord Of The Glen');
        screen.getByText('1:20 Musselburgh');
        screen.getByText('4/1');
    })
});

describe('MyBets desktop / tablet', () => {
    test('displays - logged in header texts desktop', () => {
        jest.spyOn(hooks, 'useBreakPoint').mockImplementation(() => ({
            isDesktop: true,
        }));

        jest.spyOn(redux, 'useSelector')
            .mockReturnValueOnce(unsettledBetHistorySingle)
            .mockReturnValueOnce(settledBetHistorySingle)

        render(<MyBets
            bookmakers = {bookmakerSessions}
            totalBalance = "£365"
            totalFreeBetsBalance = "£10"
        />);

        screen.getByText('All Bookmakers');
        screen.getByText('Total balance');
        screen.getByText('£365');
        screen.getByText('Total free bets');
        screen.getByText('£10');
        screen.getByText('Manage bookmakers');
        screen.getByTestId('Container__MyBetsBody');
    })

    test('displays - logged in header texts tablet', () => {
        jest.spyOn(hooks, 'useBreakPoint').mockImplementation(() => ({
            isTablet: true,
        }));

        jest.spyOn(redux, 'useSelector')
            .mockReturnValueOnce(unsettledBetHistorySingle)
            .mockReturnValueOnce(settledBetHistorySingle)

        render(<MyBets
            bookmakers = {bookmakerSessions}
            totalBalance = "£365"
            totalFreeBetsBalance = "£10"
        />);

        screen.getByText('All Bookmakers');
        screen.getByText('Total balance');
        screen.getByText('£365');
        screen.getByText('Total free bets');
        screen.getByText('£10');
        screen.getByText('Manage bookmakers');
        screen.getByTestId('Container_MyBetsBody');
    })

    test(
        'DESKTOP / TABLET - displays unsettled bets selections when click on view selections',
        () => {
            jest.spyOn(hooks, 'useBreakPoint').mockImplementation(() => ({
                isDesktop: true,
            }));

            jest.spyOn(redux, 'useSelector')
                .mockReturnValueOnce(unsettledBetHistoryMultiples)
                .mockReturnValueOnce(emptySettledBetHistory)

            render(<MyBets
                bookmakers = {bookmakerSessions}
                totalBalance = "£365"
                totalFreeBetsBalance = "£10"
            />);

            const viewMoreSelButton = screen
                .getByTestId('Button__MyBetsHistoryAdditionalActions');

            expect(viewMoreSelButton).toBeInTheDocument();

            screen.getByText('view selections');

            fireEvent.click(viewMoreSelButton);

            screen.getByText('close selections');

            screen.getByText('Lord Of The Glen');
            screen.getByText('1:20 Musselburgh');
            screen.getByText('4/1');
        },
    )
})
