/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable max-len */
import React from 'react';
import { screen } from '@testing-library/react'
import { wrapperRender } from '../../../../project/utils/testUtility';
import { RaceCardInformation } from './RaceCardInformation';

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
    breakPoint: 'tablet',
    going: 'Good to firm',
    raceClass: '5',
    distance: '1m',
    numberOfRunners: '10',
    liveOn: ['RTV'],
    favouriteRunner: {
        data: {
            countryCode: '',
            draw: '5',
            horseName: 'Rectory Road',
            horseProfileUrl: 'rectory-road-1860332',
            jockeyId: 97993,
            jockeyName: 'Alice Bond',
            runnerFeed: 'RECTORY ROAD',
            saddleClothNumber: '1',
            silkUrl: 'https://www.rp-assets.com/svg/3/9/9/303993.svg',
            trainerId: 36672,
            trainerName: 'James Ferguson',
            uid: '1860332',
        },
        error: '',
        isLoading: false,
    },
    race: {
        ageRestriction: '3+ years',
        bettingReturns: {},
        category: ['Handicap'],
        countDown: '46 Mins',
        countryCode: 'GB',
        date: '02 September 2021',
        diffusionMeetingName: 'SALISBURY',
        id: '790763',
        isResult: false,
        localTime: {
            raceDate: '2021-09-02',
            raceDateTime: '2021-09-02 13:00',
            raceTime: '13:00',
        },
        meetingId: '52',
        meetingName: 'Salisbury',
        numberOfRunners: '10',
        raceClass: '5',
        raceLocalTime: {
            raceDate: '2021-09-02',
            raceDateTime: '2021-09-02 13:00',
            raceTime: '13:00',
        },
        raceTitle: 'Byerley Stud Racing Excellence Apprentice Handicap (Whips Shall Be Carried But Not Used)',
        raceType: 'Flat',
        raceUrl: '/racecards/Salisbury/2021-09-02/1300/Byerley-Stud-Racing-Excellence-Apprentice-Handicap',
        runners: undefined,
        startTime: '13:00',
        status: 'next-off',
        surfaceType: 'Turf',
        utcTime: {
            raceDate: '2021-09-02',
            raceDateTime: '2021-09-02 12:00',
            raceTime: '12:00',
        },
    },
    raceUrl: '/racecards/Salisbury/2021-09-02/1300/Byerley-Stud-Racing-Excellence-Apprentice-Handicap',
    category: ['Handicap'],
    raceType: 'Flat',
    surfaceType: 'Turf',
    isAbandoned: false,
}

describe('RaceCardInformation', () => {
    test('RaceCardInformation renders', () => {
        // @ts-ignore
        wrapperRender(<RaceCardInformation {...props} store = {reduxState} />)

        expect(screen.queryByTestId('Container__RaceCardInformation')).toBeInTheDocument();
    });

    test('RaceCardInformation information renders', () => {
        // @ts-ignore
        wrapperRender(<RaceCardInformation {...props} store = {reduxState} />)

        expect(screen.queryByTestId('Text__RaceCardAbandoned')).not.toBeInTheDocument();
        expect(screen.queryByText('abandoned')).not.toBeInTheDocument();

        expect(screen.queryByText('Distance:')).toBeInTheDocument();
        expect(screen.queryByText('1m')).toBeInTheDocument();
        expect(screen.queryByText('Runners:')).toBeInTheDocument();
        expect(screen.queryByText('10')).toBeInTheDocument();
        expect(screen.queryByText('Going: Good to firm')).toBeInTheDocument();
        expect(screen.queryByText('Class:')).toBeInTheDocument();
        expect(screen.queryByText('5')).toBeInTheDocument();
    });

    test('RaceCardInformation - abandoned', () => {
        wrapperRender(
            <RaceCardInformation
                {...props}
                isAbandoned
                // @ts-ignore
                store = {reduxState}
            />,
        )

        expect(screen.queryByTestId('Text__RaceCardAbandoned')).toBeInTheDocument();
        expect(screen.queryByText('abandoned')).toBeInTheDocument();

        expect(screen.queryByText('Distance:')).not.toBeInTheDocument();
        expect(screen.queryByText('1m')).not.toBeInTheDocument();
        expect(screen.queryByText('Runners:')).not.toBeInTheDocument();
        expect(screen.queryByText('10')).not.toBeInTheDocument();
        expect(screen.queryByText('Going: Good to firm')).not.toBeInTheDocument();
        expect(screen.queryByText('Class:')).not.toBeInTheDocument();
        expect(screen.queryByText('5')).not.toBeInTheDocument();
    });
});
