/* eslint-disable no-undef */
import React from 'react';
import { screen } from '@testing-library/react'

import { wrapperRender as render } from '../../../../project/utils/testUtility';

import { NextThreeRaces } from './NextThreeRaces'

export const nextThreeRacesTestData = [
    {
        startTime: '13:00',
        raceUrl:
        '/racecards/Sedgefield/2021-05-11/1300/Download-The-Free-At-The-Races-App-Novices-Hurdle',
        meetingId: '57',
        venueName: 'Sedgefield',
        status: 'next-off',
        raceId: '787303',
        fastRaceId: '',
        isResult: false,
        isFastResult: false,
        isAbandoned: false,
        isUpcoming: true,
        raceTitle: '(A Sedgefield Park 2yo Series Qualifier) (GBB Race)',
        startDateTime: '2021-07-15 13:00',
        ukDateFormat: '2021-07-15',
        diffusionMeetingName: 'Sedgefield',
        meetingName: 'Sedgefield',
        date: '15 July 2021',
        ageRestriction: '2 years',
        displayDistance: '5f',
        going: 'Good',
        numberOfRunners: '3',
        raceClass: '4',
        raceType: 'Flat',
        ratingBand: '',
        surfaceType: 'Turf',
        countDown: 'Later',
        countryCode: 'GB',
        bettingReturns: {},
        liveOn: ['RTV'],
        isHandicap: false,
        raceTypeDescriptionText: 'Flat Turf',
        utcTime: {
            raceTime: '12:00',
            raceDate: '2021-07-15',
            raceDateTime: '2021-07-15 12:00',
        },
        localTime: {
            raceTime: '13:00',
            raceDate: '2021-07-15',
            raceDateTime: '2021-07-15 13:00',
        },
        raceLocalTime: {
            raceTime: '13:00',
            raceDate: '2021-07-15',
            raceDateTime: '2021-07-15 13:00',
        },
    }, {
        startTime: '13:30',
        raceUrl: '/racecards/Roscommon/2021-05-11/1330/Irish-EBF-Median-Sires-Series-Maiden',
        meetingId: '196',
        venueName: 'Roscommon',
        status: 'next-off',
        raceId: '787303',
        fastRaceId: '',
        isResult: false,
        isFastResult: false,
        isAbandoned: false,
        isUpcoming: true,
        raceTitle: '(A Sedgefield Park 2yo Series Qualifier) (GBB Race)',
        startDateTime: '2021-07-15 13:00',
        ukDateFormat: '2021-07-15',
        diffusionMeetingName: 'Sedgefield',
        meetingName: 'Sedgefield',
        date: '15 July 2021',
        ageRestriction: '2 years',
        displayDistance: '5f',
        going: 'Good',
        numberOfRunners: '3',
        raceClass: '4',
        raceType: 'Flat',
        ratingBand: '',
        surfaceType: 'Turf',
        countDown: 'Later',
        countryCode: 'GB',
        bettingReturns: {},
        liveOn: [],
        isHandicap: false,
        raceTypeDescriptionText: 'Flat Turf',
        utcTime: {
            raceTime: '12:00',
            raceDate: '2021-07-15',
            raceDateTime: '2021-07-15 12:00',
        },
        localTime: {
            raceTime: '13:00',
            raceDate: '2021-07-15',
            raceDateTime: '2021-07-15 13:00',
        },
        raceLocalTime: {
            raceTime: '13:00',
            raceDate: '2021-07-15',
            raceDateTime: '2021-07-15 13:00',
        },
    }, {
        startTime: '13:35',
        raceUrl:
        '/racecards/Sedgefield/2021-05-11/1335/DDC-Co.-Durham-Event-Catering-Handicap-Chase',
        meetingId: '57',
        venueName: 'Sedgefield',
        status: 'next-off',
        raceId: '787303',
        fastRaceId: '',
        isResult: false,
        isFastResult: false,
        isAbandoned: false,
        isUpcoming: true,
        raceTitle: '(A Sedgefield Park 2yo Series Qualifier) (GBB Race)',
        startDateTime: '2021-07-15 13:00',
        ukDateFormat: '2021-07-15',
        diffusionMeetingName: 'Sedgefield',
        meetingName: 'Sedgefield',
        date: '15 July 2021',
        ageRestriction: '2 years',
        displayDistance: '5f',
        going: 'Good',
        numberOfRunners: '3',
        raceClass: '4',
        raceType: 'Flat',
        ratingBand: '',
        surfaceType: 'Turf',
        countDown: 'Later',
        countryCode: 'GB',
        bettingReturns: {},
        liveOn: [],
        isHandicap: false,
        raceTypeDescriptionText: 'Flat Turf',
        utcTime: {
            raceTime: '12:00',
            raceDate: '2021-07-15',
            raceDateTime: '2021-07-15 12:00',
        },
        localTime: {
            raceTime: '13:00',
            raceDate: '2021-07-15',
            raceDateTime: '2021-07-15 13:00',
        },
        raceLocalTime: {
            raceTime: '13:00',
            raceDate: '2021-07-15',
            raceDateTime: '2021-07-15 13:00',
        },
    },
]

describe('NextThreeRaces', () => {
    test('To display the default state of the NextThreeRaces overway', () => {
        render(
            <NextThreeRaces
                nextThreeRacesData = {nextThreeRacesTestData}
            />,
        );

        expect(
            screen.getByText(
                '13:00 Sedgefield',
            ),
        ).toBeInTheDocument()

        expect(
            screen.getByText(
                '13:30 Roscommon',
            ),
        ).toBeInTheDocument()

        expect(
            screen.getByText(
                '13:35 Sedgefield',
            ),
        ).toBeInTheDocument()

        expect(
            screen.getByText(
                'TODAY\'S RACES AND RESULTS',
            ),
        ).toBeInTheDocument()

        expect(
            screen.getByText(
                'TODAY\'S BIG RACE',
            ),
        ).toBeInTheDocument()
    });

    test('To display only the static links', () => {
        render(
            <NextThreeRaces
                nextThreeRacesData = {[]}
            />,
        );

        expect(
            screen.getByText(
                'TODAY\'S RACES AND RESULTS',
            ),
        ).toBeInTheDocument()

        expect(
            screen.getByText(
                'TODAY\'S BIG RACE',
            ),
        ).toBeInTheDocument()
    });
});
