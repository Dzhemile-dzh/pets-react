/* eslint-disable no-undef, max-len */
import React from 'react';
import { render, screen } from '@testing-library/react'
import * as redux from 'react-redux';
import { useRouter } from 'next/router';
import { Actions } from '../../project/common';
import { RaceCards } from './RaceCards.tsx';

// NOTE: because on one line the length of the url is > 100 symbols
const raceUrlPartOne = '/results/Lingfield/2021-04-29/1300/';
const raceUrlPartTwo = 'Witheford-Barrier-Trials-13th-May-At-Lingfield-Novice-Auction-Stakes';
const racePrixGastonBranere = {
    status: 'result',
    raceId: '784172',
    fastRaceId: '',
    isResult: true,
    isFastResult: false,
    isAbandoned: false,
    isUpcoming: false,
    raceTitle: 'Prix Gaston Branere (Hurdle) (Listed Handicap) (4yo) (Turf)',
    startTime: '12:50',
    startDateTime: '2021-04-29 12:50',
    ukDateFormat: '2021-04-29',
    diffusionMeetingName: 'COMPIEGNE',
    raceUrl: '/results/Compiegne/2021-04-29/1250/Prix-Gaston-Branere',
    meetingName: 'Compiegne',
    meetingId: '291',
    venueName: 'Compiegne',
    date: '29 April 2021',
    ageRestriction: '4 years',
    displayDistance: '2m 2f',
    going: 'Very soft',
    numberOfRunners: '16',
    raceClass: '',
    raceType: 'Hurdle',
    ratingBand: '',
    surfaceType: 'Turf',
    countDown: 'Now',
    countryCode: 'FR',
    bettingReturns: {
        currency: '0.00',
        exacta: '',
        jackpot: '',
        place1: '',
        place2: '',
        place3: '',
        place4: '',
        placepot: '',
        quadpot: '',
        rule4Text: '',
        rule4Value: '',
        straightForecast: '',
        toteWin: '',
        tricast: '',
        trifecta: '',
    },
    liveOn: [],
    isHandicap: false,
    raceTypeDescriptionText: 'Hurdle Turf, Listed Handicap',
    utcTime: {
        raceTime: '11:50',
        raceDate: '2021-04-29',
        raceDateTime: '2021-04-29 11:50',
    },
    localTime: {
        raceTime: '12:50',
        raceDate: '2021-04-29',
        raceDateTime: '2021-04-29 12:50',
    },
    raceLocalTime: {
        raceTime: '13:50',
        raceDate: '2021-04-29',
        raceDateTime: '2021-04-29 13:50',
    },
};
const raceWithefordBarrierTrials = {
    status: 'result',
    raceId: '781711',
    fastRaceId: '272129',
    isResult: true,
    isFastResult: false,
    isAbandoned: false,
    isUpcoming: false,
    raceTitle: 'Witheford Barrier Trials 13th May At Lingfield Novice Auction Stakes',
    startTime: '13:00',
    startDateTime: '2021-04-29 13:00',
    ukDateFormat: '2021-04-29',
    diffusionMeetingName: 'LINGFIELD',
    raceUrl: `${raceUrlPartOne}${raceUrlPartTwo}`,
    meetingName: 'Lingfield (A.W)',
    meetingId: '393',
    venueName: 'Lingfield',
    date: '29 April 2021',
    ageRestriction: '3 years',
    displayDistance: '1m 2f',
    going: 'Standard',
    numberOfRunners: '4',
    raceClass: '6',
    raceType: 'Flat',
    ratingBand: '',
    surfaceType: 'Polytrack',
    countDown: 'Now',
    countryCode: 'GB',
    bettingReturns: {
        currency: 'GBP',
        exacta: '£11.00',
        jackpot: '£0.00',
        place1: '',
        place2: '',
        place3: '',
        place4: '',
        placepot: '£243.60 to a £1 stake. Pool: £49,848.17 - 149.34 winning units',
        quadpot: '£42.60 to a £1 stake. Pool: £7,021.32 - 121.88 winning units',
        rule4Text: '',
        rule4Value: '',
        straightForecast: '£11.13',
        toteWin: '£4.30',
        tricast: '',
        trifecta: '£28.40',
    },
    liveOn: [
        'SKY',
    ],
    isHandicap: false,
    raceTypeDescriptionText: 'Flat Polytrack, Auction',
    utcTime: {
        raceTime: '12:00',
        raceDate: '2021-04-29',
        raceDateTime: '2021-04-29 12:00',
    },
    localTime: {
        raceTime: '13:00',
        raceDate: '2021-04-29',
        raceDateTime: '2021-04-29 13:00',
    },
    raceLocalTime: {
        raceTime: '13:00',
        raceDate: '2021-04-29',
        raceDateTime: '2021-04-29 13:00',
    },
};
const raceWithHandicap = {
    ...racePrixGastonBranere,
    isHandicap: true,
}
const raceCardsProps = {
    filters: {
        date: '2021-04-29',
        raceStatus: 'RESULTS',
        courses: [],
        raceType: 'ALL',
        isHandicap: false,
    },
    raceCardsData: {
        meetings: [
            {
                meetingId: '195',
                meetingStartTime: '15:40',
                meetingEndTime: '19:35',
                name: 'Punchestown',
                races: [
                    '783334',
                    '783335',
                    '783336',
                    '782338',
                    '783337',
                    '782339',
                    '783338',
                    '783339',
                ],
                diffusionMeetingName: 'PUNCHESTOWN',
                numberOfRaces: '8',
                countryCode: 'IRE',
                rpMeetingOrder: 1,
                isMeetingAbandoned: false,
                meetingType: 'Jumps',
            },
            {
                meetingId: '1083',
                meetingStartTime: '17:10',
                meetingEndTime: '20:15',
                name: 'Chelmsford (A.W)',
                races: [
                    '781702',
                    '781700',
                    '781703',
                    '781698',
                    '781699',
                    '781704',
                    '781701',
                ],
                diffusionMeetingName: 'CHELMSFORD',
                numberOfRaces: '7',
                countryCode: 'GB',
                rpMeetingOrder: 2,
                isMeetingAbandoned: false,
                meetingType: 'Flat',
            },
        ],
        races: [
            racePrixGastonBranere,
            raceWithefordBarrierTrials,
        ],
        headerTitle: 'Today\'s Races & Fast Results',
    },
    isRaceCardsLoading: false,
    raceCardsError: null,
    breakPoint: 'desktop',
    date: '2021-04-29',
    firstThreeWinners: {},
    favouriteRunners: {},
    shouldDisplayTimeline: false,
    setRaceTypeFilter: () => {},
    setHandicapFilter: jest.fn(),
    setRaceStatusFilter: () => {},
    setCourseFilter: () => {},
    cardCustomization: {
        showOdds: true,
    },
};

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));

describe('RaceCards', () => {
    test('does not render WarningMessage when there are races for date', () => {
        useRouter.mockImplementation(() => ({
            query: '',
        }));

        jest.spyOn(redux, 'useSelector')
        // races and meetings
            .mockReturnValueOnce({
                races: raceCardsProps.raceCardsData.races,
                meetings: raceCardsProps.raceCardsData.meetings,
                isLoading: false,
                error: null,
            })
        // firstThreeWinners
            .mockReturnValueOnce({})
        // favouriteRunners
            .mockReturnValueOnce({})
        // cardCustomization
            .mockReturnValueOnce({
                showOdds: true,
            })

        const useDispatchSpy = jest.spyOn(redux, 'useDispatch');
        const mockDispatchFn = jest.fn()
        useDispatchSpy.mockReturnValue(mockDispatchFn);

        render(
            <RaceCards {...raceCardsProps} />,
        );

        const warningMessageElement = screen.queryByText('Races not scheduled for this day');
        expect(warningMessageElement).toBeNull();
    });

    test('renders WarningMessage when there are no races for date', () => {
        useRouter.mockImplementation(() => ({
            query: '',
        }));

        jest.spyOn(redux, 'useSelector')
        // races and meetings
            .mockReturnValueOnce({
                races: [],
                meetings: raceCardsProps.raceCardsData.meetings,
                isLoading: false,
                error: null,
            })
        // firstThreeWinners
            .mockReturnValueOnce({})
        // favouriteRunners
            .mockReturnValueOnce({})
        // cardCustomization
            .mockReturnValueOnce({
                showOdds: true,
            })

        const useDispatchSpy = jest.spyOn(redux, 'useDispatch');
        const mockDispatchFn = jest.fn()
        useDispatchSpy.mockReturnValue(mockDispatchFn);

        render(
            <RaceCards {...raceCardsProps} />,
        );

        const warningMessage = screen.getByText('Races not scheduled for this day');
        expect(warningMessage).toBeInTheDocument();
    });

    describe('Handicap Filter', () => {
        const dataWithoutHandicap = {
            ...raceCardsProps,
            filters: {
                ...raceCardsProps.filters,
                shouldShowHandicapFilter: false,
            },
        };
        const dataWithHandicap = {
            ...raceCardsProps,
            filters: {
                ...raceCardsProps.filters,
                shouldShowHandicapFilter: true,
            },
            raceCardsData: {
                ...raceCardsProps.raceCardsData,
                races: [raceWithHandicap, racePrixGastonBranere],
            },
        };

        beforeEach(() => {
            raceCardsProps.setHandicapFilter.mockReset();
        });

        test('Desktop - does not render Handicap Only filter if there\'s no race with handicap flag', () => {
            useRouter.mockImplementation(() => ({
                query: '',
            }));

            jest.spyOn(redux, 'useSelector')
            // races and meetings
                .mockReturnValueOnce({
                    races: raceCardsProps.raceCardsData.races,
                    meetings: raceCardsProps.raceCardsData.meetings,
                    isLoading: false,
                    error: null,
                })
            // firstThreeWinners
                .mockReturnValueOnce({})
            // favouriteRunners
                .mockReturnValueOnce({})
            // cardCustomization
                .mockReturnValueOnce({
                    showOdds: true,
                })

            const useDispatchSpy = jest.spyOn(redux, 'useDispatch');
            const mockDispatchFn = jest.fn()
            useDispatchSpy.mockReturnValue(mockDispatchFn);

            // WHEN
            render(
                <RaceCards {...dataWithoutHandicap} />,
            );

            // THEN
            const handicapFilter = screen.queryByText('Handicap only');
            expect(handicapFilter).not.toBeInTheDocument();
        });

        test('Desktop - renders Handicap Only filter if there\'s at least one race with handicap flag', () => {
            useRouter.mockImplementation(() => ({
                query: '',
            }));

            jest.spyOn(redux, 'useSelector')
            // races and meetings
                .mockReturnValueOnce({
                    races: [raceWithHandicap, racePrixGastonBranere],
                    meetings: raceCardsProps.raceCardsData.meetings,
                    isLoading: false,
                    error: null,
                })
            // firstThreeWinners
                .mockReturnValueOnce({})
            // favouriteRunners
                .mockReturnValueOnce({})
            // cardCustomization
                .mockReturnValueOnce({
                    showOdds: true,
                })

            const useDispatchSpy = jest.spyOn(redux, 'useDispatch');
            const mockDispatchFn = jest.fn()
            useDispatchSpy.mockReturnValue(mockDispatchFn);

            // WHEN
            render(
                <RaceCards {...dataWithHandicap} />,
            );

            // THEN
            const handicapFilter = screen.queryByText('Handicap only');
            expect(handicapFilter).toBeInTheDocument();
            const handicapFilterToggledOff = screen.queryByTitle('toggle off');
            handicapFilterToggledOff.click()
            expect(mockDispatchFn).toHaveBeenCalledWith(Actions.setHandicapFilter(true));
            const handicapFilterToggledOn = screen.queryByTitle('toggle on');
            expect(handicapFilterToggledOn).toBeInTheDocument();
        });

        test('Desktop - should be toggled on by default', () => {
            useRouter.mockImplementation(() => ({
                query: '',
            }));

            jest.spyOn(redux, 'useSelector')
            // races and meetings
                .mockReturnValueOnce({
                    races: [raceWithHandicap, racePrixGastonBranere],
                    meetings: raceCardsProps.raceCardsData.meetings,
                    isLoading: false,
                    error: null,
                })
            // firstThreeWinners
                .mockReturnValueOnce({})
            // favouriteRunners
                .mockReturnValueOnce({})
            // cardCustomization
                .mockReturnValueOnce({
                    showOdds: true,
                })

            const useDispatchSpy = jest.spyOn(redux, 'useDispatch');
            const mockDispatchFn = jest.fn()
            useDispatchSpy.mockReturnValue(mockDispatchFn);

            // WHEN
            render(
                <RaceCards {...{ ...dataWithHandicap, filters: { ...dataWithHandicap.filters, isHandicap: true } }} />,
            );

            // THEN
            const handicapToggle = screen.queryByTitle('toggle on');
            expect(handicapToggle).toBeInTheDocument();
        });

        test('Tablet - does not render Handicap filter toggle if there\'s no race with handicap flag', () => {
            useRouter.mockImplementation(() => ({
                query: '',
            }));

            jest.spyOn(redux, 'useSelector')
            // races and meetings
                .mockReturnValueOnce({
                    races: raceCardsProps.raceCardsData.races,
                    meetings: raceCardsProps.raceCardsData.meetings,
                    isLoading: false,
                    error: null,
                })
            // firstThreeWinners
                .mockReturnValueOnce({})
            // favouriteRunners
                .mockReturnValueOnce({})
            // cardCustomization
                .mockReturnValueOnce({
                    showOdds: true,
                })

            const useDispatchSpy = jest.spyOn(redux, 'useDispatch');
            const mockDispatchFn = jest.fn()
            useDispatchSpy.mockReturnValue(mockDispatchFn);

            // WHEN
            render(
                <RaceCards {...{ ...dataWithoutHandicap, breakPoint: 'tablet' }} />,
            );

            // THEN
            const more = screen.queryByText('Handicap only');
            expect(more).not.toBeInTheDocument();
        });

        test('Tablet - renders Handicap filter toggle if there\'s at least one race with handicap flag', () => {
            useRouter.mockImplementation(() => ({
                query: '',
            }));

            jest.spyOn(redux, 'useSelector')
            // races and meetings
                .mockReturnValueOnce({
                    races: [raceWithHandicap, racePrixGastonBranere],
                    meetings: raceCardsProps.raceCardsData.meetings,
                    isLoading: false,
                    error: null,
                })
            // firstThreeWinners
                .mockReturnValueOnce({})
            // favouriteRunners
                .mockReturnValueOnce({})
            // cardCustomization
                .mockReturnValueOnce({
                    showOdds: true,
                })

            const useDispatchSpy = jest.spyOn(redux, 'useDispatch');
            const mockDispatchFn = jest.fn()
            useDispatchSpy.mockReturnValue(mockDispatchFn);

            // WHEN
            render(
                <RaceCards {...{ ...dataWithHandicap, breakPoint: 'tablet' }} />,
            );

            // THEN
            const more = screen.queryByText('Handicap only');
            expect(more).toBeInTheDocument();
        });

        test('Tablet - should filter and toggle on when clicking on the toggle', () => {
            useRouter.mockImplementation(() => ({
                query: '',
            }));

            jest.spyOn(redux, 'useSelector')
            // races and meetings
                .mockReturnValueOnce({
                    races: [raceWithHandicap, racePrixGastonBranere],
                    meetings: raceCardsProps.raceCardsData.meetings,
                    isLoading: false,
                    error: null,
                })
            // firstThreeWinners
                .mockReturnValueOnce({})
            // favouriteRunners
                .mockReturnValueOnce({})
            // cardCustomization
                .mockReturnValueOnce({
                    showOdds: true,
                })

            const useDispatchSpy = jest.spyOn(redux, 'useDispatch');
            const mockDispatchFn = jest.fn()
            useDispatchSpy.mockReturnValue(mockDispatchFn);

            // WHEN
            render(
                <RaceCards {...{ ...dataWithHandicap, breakPoint: 'tablet' }} />,
            );

            // THEN
            const handicapToggleOff = screen.queryByTitle('toggle off');
            handicapToggleOff.click()
            expect(mockDispatchFn).toHaveBeenCalledWith(Actions.setHandicapFilter(true));

            const handicapToggleOn = screen.queryByTitle('toggle on');
            expect(handicapToggleOn).toBeInTheDocument();
        });

        test('Tablet - should be toggled on by default', () => {
            useRouter.mockImplementation(() => ({
                query: '',
            }));

            jest.spyOn(redux, 'useSelector')
            // races and meetings
                .mockReturnValueOnce({
                    races: [raceWithHandicap, racePrixGastonBranere],
                    meetings: raceCardsProps.raceCardsData.meetings,
                    isLoading: false,
                    error: null,
                })
            // firstThreeWinners
                .mockReturnValueOnce({})
            // favouriteRunners
                .mockReturnValueOnce({})
            // cardCustomization
                .mockReturnValueOnce({
                    showOdds: true,
                })

            const useDispatchSpy = jest.spyOn(redux, 'useDispatch');
            const mockDispatchFn = jest.fn()
            useDispatchSpy.mockReturnValue(mockDispatchFn);

            // WHEN
            render(
                <RaceCards {...{ ...dataWithHandicap, breakPoint: 'tablet', filters: { ...dataWithHandicap.filters, isHandicap: true } }} />,
            );

            // THEN
            const handicapToggle = screen.queryByTitle('toggle on');
            expect(handicapToggle).toBeInTheDocument();
        });
    });
});
