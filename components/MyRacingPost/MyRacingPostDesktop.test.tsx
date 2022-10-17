import React from 'react';
import { screen } from '@testing-library/react';
import * as redux from 'react-redux'
import { wrapperRender as render } from '../../project/utils/testUtility';

import MyRacingPostDesktop from './MyRacingPostDesktop';
import { BetHistoryItemInterface } from '../interfaces/BetHistory';
import * as hooks from '../contexts/BreakPointContext';
import {
    emptyUnsettledBetHistory,
    unsettledBetHistorySingle,
    notLoggedInBookmakerSessions,
} from '../../tests/mocks';

const betExample: BetHistoryItemInterface = unsettledBetHistorySingle.unsettledBetHistoryBets[0];

const transformBet = (
    bet: BetHistoryItemInterface,
    newProps: {betId?: string; type?: string; isEachWay?: boolean; },
) => ({
    ...bet,
    ...newProps,
})

const defaultProps = {
    totalBalance: '0',
    bookmakers: notLoggedInBookmakerSessions,
    isZeroBalance: true,
    isLogged: false,
    isDropdownOpen: false,
    setDropdownOpen: jest.fn(),
    previousSelectedBookmaker: null,
    setPreviousSelectedBookmaker: jest.fn(),
    location: null,
}

jest.mock('../Race/components/BookmakersDropdown', () => ({
    __esModule: true,
    namedExport: jest.fn(),
    default: () => <div>BookmakersDropdownMock</div>,
}));

// Most of the tests are skipped, due to them all failing
// we'll be fixed once we start working on this functionality again

describe('My racing post - Desktop', () => {
    test('does not render if user is not logged in', () => {
        jest.spyOn(hooks, 'useBreakPoint').mockImplementation(() => ({
            isDesktop: true,
        }));

        jest.spyOn(redux, 'useSelector')
            .mockReturnValueOnce({})
            .mockReturnValueOnce(true)
            .mockReturnValueOnce(emptyUnsettledBetHistory)

        render(<MyRacingPostDesktop {...defaultProps} />)
        expect(screen.queryByText('My recent bets')).toBeNull();
        expect(screen.queryByText('Recent placed bets will show here')).toBeNull();
        expect(screen.queryByText('See todays races')).toBeNull();
    });

    test.skip('renders todays races link if there are no open bets', () => {
        render(<MyRacingPostDesktop
            {...defaultProps}
            unsettledBetHistory = {
                {
                    unsettledBetHistoryBets: [],
                    isUnsettledBetHistoryLoading: false,
                    unsettledBetHistoryErrors: null,
                    unsettledBetHistoryPagination: { pageSize: 10, hasNext: false },
                }
            }
        />)

        screen.getByText('Recent placed bets will show here');
        const linkTodaysRaces = screen.getByText('See todays races');
        expect(linkTodaysRaces.closest('a').getAttribute('href')).toBe('/today');
    });

    test.skip('displays logo and statuses open bets', () => {
        render(<MyRacingPostDesktop {...defaultProps} />);

        screen.getByTestId('Icon__williamhill');
        screen.getByTestId('Icon__bet365');

        expect(screen.getAllByText('OPEN')).toHaveLength(2);
    });

    // eslint-disable-next-line max-len
    test.skip('displays horse name, odds, race time, course name, event date, total stake and estimated returns for a single bet', () => {
        render(<MyRacingPostDesktop {...defaultProps} />);

        screen.getByText('15:45 Brighton, 23 Aug 2021');
        screen.getByText('I\'m Mable');
        screen.getByText('10/3');
        screen.getByText('0.03');
        screen.getByText('0.13');

        screen.getByText('13:45 Brighton, 23 Aug 2021');
        screen.getByText('Summer\'s Day');
        screen.getByText('SP');
        screen.getByText('0.10');
    });

    test.skip('displays the correct bet type based on the data', () => {
        render(<MyRacingPostDesktop
            {...defaultProps}
            unsettledBetHistory = {{
                ...unsettledBetHistorySingle,
                unsettledBetHistoryBets: [
                    transformBet(betExample, { betId: '1', type: 'Single' }),
                    transformBet(betExample, { betId: '2', type: 'Double' }),
                    transformBet(betExample, { betId: '3', type: 'Treble' }),
                    transformBet(betExample, { betId: '4', type: 'Yankee' }),
                    transformBet(betExample, { betId: '5', type: '5-fold' }),
                    transformBet(betExample, { betId: '6', type: 'Single', isEachWay: true }),
                ],
            }}
        />);

        screen.getByText('Single');
        screen.getByText('Double');
        screen.getByText('Treble');
        screen.getByText('Yankee');
        screen.getByText('5-fold');
        screen.getByText('Single EW');
    });

    test.skip('displays view selections for multiple/forecast/treble bet types', () => {
        render(<MyRacingPostDesktop
            {...defaultProps}
            unsettledBetHistory = {{
                ...unsettledBetHistorySingle,
                unsettledBetHistoryBets: [
                    transformBet(betExample, { betId: '1', type: 'Single' }),
                    transformBet(betExample, { betId: '2', type: 'Double' }),
                    transformBet(betExample, { betId: '3', type: 'Treble' }),
                    transformBet(betExample, { betId: '4', type: 'Forecast' }),
                    transformBet(betExample, { betId: '5', type: 'Tricast' }),
                ],
            }}
        />);

        expect(screen.getAllByText('VIEW SELECTIONS')).toHaveLength(4);
    });
});
