/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
import { screen } from '@testing-library/react';
import { wrapperRender } from '../../../../../../project/utils/testUtility';

import { CardRunner } from './CardRunner';

const reduxState = {
    betslip: {
        bet: {
            betOptions: [],
            betReceipts: [],
            freeBets: null,
            meta: null,
            isBetSlipLoading: false,
            canPlaceBet: true,
            betSlipError: null,
            isBettingAllowed: true,
        },
        betSelections: {},
    },
    bookmakerSessions: {
        isBookmakerSessionsLoading: false,
        bookmakerSessionsError: {
            type: '',
            message: '',
        },
        sessionBookmakersList: [],
        bookmakerLoginError: {},
        bookmakerDepositError: {},
    },
    cardCustomization: {
        priceType: 'fractional',
        numberOfRecentRaces: 3,
        showRunnerBasicInfo: true,
        showRunnerAdditionalInfo: false,
        showOdds: true,
        runnersSortedBy: 'ODDS',
        isCompactViewEnabled: false,
    },
    diffusion: {
        bookmakers: {},
    },
    project: {
        diffusionDomain: 'push-janus.racingpost.com',
    },
}

const props = {
    isMobile: false,
    race: {
        ageRestriction: '2 years',
        bettingReturns: {},
        category: ['Handicap'],
        countDown: '34 Mins',
        countryCode: 'GB',
        date: '31 August 2021',
        diffusionMeetingName: 'EPSOM',
        id: '790728',
        isResult: false,
        localTime: {
            raceDate: '2021-08-31',
            raceDateTime: '2021-08-31 13:45',
            raceTime: '13:45',
        },
        meetingId: '17',
        meetingName: 'Epsom',
        numberOfRunners: '11',
        raceClass: '5',
        raceLocalTime: {
            raceDate: '2021-08-31',
            raceDateTime: '2021-08-31 13:45',
            raceTime: '13:45',
        },
        raceTitle: 'Chantilly Nursery Handicap (Jockey Club Grassroots Nursery Series Qualifier)',
        raceType: 'Flat',
        raceUrl: '/racecards/Epsom/2021-08-31/1345/Chantilly-Nursery-Handicap',
        runners: undefined,
        startTime: '13:45',
        status: 'declared',
        surfaceType: 'Turf',
    },
    runner: {
        countryCode: '',
        draw: '11',
        horseName: 'Great Havana',
        horseProfileUrl: 'great-havana-3634774',
        jockeyId: 92728,
        jockeyName: 'Oisin Murphy',
        runnerFeed: 'GREAT HAVANA',
        saddleClothNumber: '2',
        silkUrl: 'https://www.rp-assets.com/svg/0/4/2/112240.svg',
        trainerId: 15605,
        trainerName: 'Andrew Balding',
        uid: '3634774',
    },
}

describe('CardRunners', () => {
    test('CardRunner renders', () => {
        // @ts-ignore
        wrapperRender(<CardRunner {...props} store = {reduxState} />)

        expect(screen.queryByTestId('Container__RaceCardRunner')).toBeInTheDocument();
    });

    test('CardRunner has runner', () => {
        // @ts-ignore
        wrapperRender(<CardRunner {...props} store = {reduxState} />)

        expect(screen.queryByText('Great Havana')).toBeInTheDocument();
    });

    test('CardRunner has saddleClothNumber', () => {
        // @ts-ignore
        wrapperRender(<CardRunner {...props} store = {reduxState} />)

        expect(screen.queryByText('2')).toBeInTheDocument();
    });
})
