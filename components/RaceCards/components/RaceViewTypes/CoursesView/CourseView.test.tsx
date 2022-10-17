/* eslint-disable no-undef, max-len */
import React from 'react';
import { render, screen } from '@testing-library/react'

import { CoursesView } from './CoursesView';

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

const propsWithoutRunners = {
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
            weather: 'rainy',
            numberNonRunners: '0',
            goingDetails: 'Going good to soft',
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
            weather: 'cloudy',
            numberNonRunners: '0',
            goingDetails: 'Going great',
        },
    ],
    races: [
        racePrixGastonBranere,
        raceWithefordBarrierTrials,
    ],
    firstThreeWinners: {},
    breakPoint: 'desktop',
    favouriteRunners: {},
}

const propsWithRunners = {
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
            weather: 'rainy',
            numberNonRunners: '4',
            goingDetails: 'Going good to soft',
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
            weather: 'cloudy',
            numberNonRunners: '10',
            goingDetails: 'Going great',
        },
    ],
    races: [
        racePrixGastonBranere,
        raceWithefordBarrierTrials,
    ],
    firstThreeWinners: {},
    breakPoint: 'desktop',
    favouriteRunners: {},
}

describe('Meetings', () => {
    test('renders meetings details in course view', () => {
        render(
            <CoursesView {...propsWithoutRunners} />,
        );

        expect(screen.queryByText('Punchestown')).toBeInTheDocument();
        expect(screen.queryByText('Jumps | 8 races | 15:40 - 19:35')).toBeInTheDocument();
        expect(screen.queryByText('rainy')).toBeInTheDocument();

        expect(screen.queryByText('Chelmsford (A.W)')).toBeInTheDocument();
        expect(screen.queryByText('Flat | 7 races | 17:10 - 20:15')).toBeInTheDocument();
        expect(screen.queryByText('cloudy')).toBeInTheDocument();
    });

    test('Doesn\'t render non-runners', () => {
        render(
            <CoursesView {...propsWithoutRunners} />,
        );

        expect(screen.queryByTestId('Text__CourseViewMeetingNonRunners')).not.toBeInTheDocument;
    });

    test('render non-runners', () => {
        render(
            <CoursesView {...propsWithRunners} />,
        );

        expect(screen.queryByTestId('Text__CourseViewMeetingNonRunners')).toBeInTheDocument;
        expect(screen.queryByText('non-runners')).toBeInTheDocument;
    });
})
