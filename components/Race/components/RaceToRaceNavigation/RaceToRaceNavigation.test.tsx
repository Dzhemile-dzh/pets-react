/* eslint-disable max-len */
import React from 'react';

import { screen } from '@testing-library/react'

import * as redux from 'react-redux';
import { wrapperRender as render } from '../../../../project/utils/testUtility';
import { RaceToRaceNavigation, RaceToRaceNavigationInterface } from './RaceToRaceNavigation';
import { RaceCardsRaceInterface } from '../../../interfaces';

export const raceCardsData: RaceCardsRaceInterface = {
    allMeetings: [],
    allRaces: [
        {
            status: 'result',
            raceId: '788207',
            fastRaceId: '',
            isResult: true,
            isFastResult: false,
            isAbandoned: false,
            isUpcoming: false,
            raceTitle: 'Join Casumo Today EBF Novice Stakes (GBB Race)',
            startTime: '18:55',
            startDateTime: '2021-07-28 18:55',
            ukDateFormat: '2021-07-28',
            diffusionMeetingName: 'SANDOWN',
            raceUrl: '/racing-results/Sandown/2021-07-28/1855/Join-Casumo-Today-EBF-Novice-Stakes',
            meetingName: 'Sandown',
            meetingId: '54',
            venueName: 'Sandown',
            date: '28 July 2021',
            ageRestriction: '2 years',
            displayDistance: '7f',
            going: 'Heavy',
            numberOfRunners: '13',
            raceClass: '4',
            raceType: 'Flat',
            ratingBand: '',
            surfaceType: 'Turf',
            countDown: 'Now',
            countryCode: 'GB',
            bettingReturns: {
                currency: 'GBP',
                exacta: '£95.30',
                jackpot: '£0.00',
                place1: '£2.00',
                place2: '£3.60',
                place3: '£3.40',
                place4: '',
                placepot: '£13.10 to a £1 stake. Pool: £68,959.77 - 3830.42 winning units',
                quadpot: '£4.40 to a £1 stake. Pool: £11,699.54 - 1956.80 winning units',
                rule4Text: '',
                rule4Value: '',
                straightForecast: '£92.96',
                toteWin: '£7.60',
                tricast: '',
                trifecta: '£518.00',
            },
            liveOn: [
                'RTV',
            ],
            replayDetails: [
                {
                    videoId: 1949577,
                    videoProvider: 'RUK',
                    completeRaceUid: 2921278,
                    completeRaceStart: 858,
                    completeRaceEnd: 1020,
                    finishRaceUid: 2921279,
                    finishRaceStart: 915,
                    finishRaceEnd: 967,
                },
            ],
            performRaceUidATR: null,
            performRaceUidRUK: null,
            isHandicap: false,
            category: [
                'Novice',
            ],
            raceTypeDescriptionText: 'Flat Turf, Novice',
            utcTime: {
                raceTime: '17:55',
                raceDate: '2021-07-28',
                raceDateTime: '2021-07-28 17:55',
            },
            localTime: {
                raceTime: '18:55',
                raceDate: '2021-07-28',
                raceDateTime: '2021-07-28 18:55',
            },
            raceLocalTime: {
                raceTime: '18:55',
                raceDate: '2021-07-28',
                raceDateTime: '2021-07-28 18:55',
            },
        },
        {
            status: 'abandoned',
            raceId: '788205',
            fastRaceId: '',
            isResult: false,
            isFastResult: false,
            isAbandoned: true,
            isUpcoming: false,
            raceTitle: 'Casumo Best Odds Guaranteed Handicap',
            startTime: '19:25',
            startDateTime: '2021-07-28 19:25',
            ukDateFormat: '2021-07-28',
            diffusionMeetingName: 'SANDOWN',
            raceUrl: '/racecards/Sandown/2021-07-28/1925/Casumo-Best-Odds-Guaranteed-Handicap',
            meetingName: 'Sandown',
            meetingId: '54',
            venueName: 'Sandown',
            date: '28 July 2021',
            ageRestriction: '3 years',
            displayDistance: '1m 6f',
            going: 'Soft',
            numberOfRunners: '',
            raceClass: '4',
            raceType: 'Flat',
            ratingBand: '0-80',
            surfaceType: 'Turf',
            countDown: 'Now',
            countryCode: 'GB',
            bettingReturns: {},
            liveOn: [
                'RTV',
            ],
            replayDetails: null,
            performRaceUidATR: null,
            performRaceUidRUK: 1949583,
            isHandicap: true,
            category: [
                'Handicap',
            ],
            raceTypeDescriptionText: 'Flat Turf, Handicap',
            utcTime: {
                raceTime: '18:25',
                raceDate: '2021-07-28',
                raceDateTime: '2021-07-28 18:25',
            },
            localTime: {
                raceTime: '19:25',
                raceDate: '2021-07-28',
                raceDateTime: '2021-07-28 19:25',
            },
            raceLocalTime: {
                raceTime: '19:25',
                raceDate: '2021-07-28',
                raceDateTime: '2021-07-28 19:25',
            },
        },
        {
            status: 'declared',
            raceId: '792523',
            fastRaceId: '',
            isResult: false,
            isFastResult: false,
            isAbandoned: false,
            isUpcoming: true,
            raceTitle: "Follow @AtTheRaces On Twitter Training Series Conditional Jockeys' Handicap Hurdle (Div I)",
            startTime: '15:58',
            startDateTime: '2021-09-28 15:58',
            ukDateFormat: '2021-09-28',
            diffusionMeetingName: 'WORCESTER',
            raceUrl: '/racecards/Worcester/2021-09-28/1558/Follow-@AtTheRaces-On-Twitter-Training-Series-Conditional-Jockeys-Handicap-Hurdle',
            meetingId: '54',
            venueName: 'Sandown',
            date: '28 September 2021',
            ageRestriction: '4+ years',
            displayDistance: '2m 7f',
            going: 'Good',
            numberOfRunners: '10',
            raceClass: '5',
            raceType: 'Hurdle',
            ratingBand: '0-100',
            surfaceType: 'Turf',
            countDown: 'Race',
            countryCode: 'GB',
            bettingReturns: {},
            liveOn: [
                'SKY',
            ],
            replayDetails: null,
            performRaceUidATR: null,
            performRaceUidRUK: null,
            isHandicap: true,
            category: [
                'Handicap',
            ],
            raceTypeDescriptionText: 'Hurdle Turf, Handicap',
            utcTime: {
                raceTime: '14:58',
                raceDate: '2021-09-28',
                raceDateTime: '2021-09-28 14:58',
            },
            localTime: {
                raceTime: '15:58',
                raceDate: '2021-09-28',
                raceDateTime: '2021-09-28 15:58',
            },
            raceLocalTime: {
                raceTime: '15:58',
                raceDate: '2021-09-28',
                raceDateTime: '2021-09-28 15:58',
            },
        },
    ],
    meetings: [],
    races: [],
}

const props: RaceToRaceNavigationInterface = {
    raceId: '788207',
    meetingId: '54',
    meetingName: 'Sandown',
    date: '2021-09-28',
}

describe('Race To Race Navgation', () => {
    it('displays the meeting name', () => {
        jest.spyOn(redux, 'useSelector')
            .mockReturnValueOnce(raceCardsData.allRaces);

        render(<RaceToRaceNavigation
            {...props}
        />);

        screen.getByText('Sandown');
        screen.getByText('18:55');
        screen.getByText('19:25');
        screen.getByText('ABD');
    });

    it('should be clickable if result', () => {
        jest.spyOn(redux, 'useSelector')
            .mockReturnValueOnce(raceCardsData.allRaces);

        render(<RaceToRaceNavigation
            {...props}
            raceId = "788207"
        />);

        const result = screen.getByTestId('Container__788207__RaceElement').closest('a');
        expect(result.getAttribute('href')).toBe('/racing-results/Sandown/2021-07-28/1855/Join-Casumo-Today-EBF-Novice-Stakes');

        screen.getByText('Sandown');
        screen.getByText('18:55');
        screen.getByText('19:25');
        screen.getByText('ABD');
    });

    it('should be clickable if declared', () => {
        jest.spyOn(redux, 'useSelector')
            .mockReturnValueOnce(raceCardsData.allRaces);

        render(<RaceToRaceNavigation
            {...props}
        />);

        const declared = screen.getByTestId('Container__792523__RaceElement');

        expect(declared.closest('a').getAttribute('href')).toBe('/racecards/Worcester/2021-09-28/1558/Follow-@AtTheRaces-On-Twitter-Training-Series-Conditional-Jockeys-Handicap-Hurdle');

        // declared.click();
        screen.getByText('Sandown');
        screen.getByText('18:55');
        screen.getByText('19:25');
        screen.getByText('ABD');
    });

    it('shouldn\'t be clickable if declared', () => {
        jest.spyOn(redux, 'useSelector')
            .mockReturnValueOnce(raceCardsData.allRaces);

        render(<RaceToRaceNavigation
            {...props}
        />);

        const abandoned = screen.getByTestId('Container__788205__RaceElement');
        expect(abandoned.getAttribute('href')).toBeNull();

        screen.getByText('Sandown');
        screen.getByText('19:25');
        screen.getByText('ABD');
    });

    it('should display show all meetings button', () => {
        jest.spyOn(redux, 'useSelector')
            .mockReturnValueOnce(raceCardsData.allRaces);

        render(<RaceToRaceNavigation
            {...props}
        />);

        const showAllMeetings = screen.getByTestId('Container__RaceToRaceNavigationShowMoreMeetingsButton');
        expect(showAllMeetings).toBeInTheDocument;
    });
})
