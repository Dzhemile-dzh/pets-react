/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable max-len */
import React from 'react';
import { render, screen } from '@testing-library/react'
import { ResultRaceInformation } from './ResultRaceInformation';
import * as hooks from '../../../contexts/BreakPointContext';

const props = {
    ageRestriction: '4+ years',
    bettingReturns: {
        currency: 'GBP',
        exacta: '£12.70',
        jackpot: '£0.00',
        place1: '£1.30',
        place2: '£1.60',
        place3: '£5.00',
        place4: '',
        placepot: '£33.40 to a £1 stake. Pool: £66,328.86 - 1447.14 winning units',
        quadpot: '£11.70 to a £1 stake. Pool: £7,657.13 - 481.87 winning units',
        rule4Text: '',
        rule4Value: '',
        straightForecast: '£13.42',
        toteWin: '£2.70',
        tricast: '£313.51',
        trifecta: '£225.80',
    },
    category: ['Handicap'],
    countDown: 'Now',
    countryCode: 'GB',
    date: '13 September 2021',
    diffusionMeetingName: 'WORCESTER',
    displayDistance: '2m 7f',
    fastRaceId: '278110',
    going: 'Good',
    isAbandoned: false,
    isFastResult: false,
    isHandicap: true,
    isResult: true,
    isUpcoming: false,
    liveOn: ['SKY'],
    localTime: {
        raceDate: '2021-09-13',
        raceDateTime: '2021-09-13 13:15',
        raceTime: '13:15',
    },
    meetingId: '101',
    meetingName: 'Worcester',
    numberOfRunners: '10',
    performRaceUidATR: null,
    performRaceUidRUK: null,
    raceClass: '5',
    raceId: '791570',
    raceLocalTime: {
        raceDate: '2021-09-13',
        raceDateTime: '2021-09-13 13:15',
        raceTime: '13:15',
    },
    raceTitle: "MansionBet Bet £10 Get £20 Conditional Jockeys' Handicap Chase (Div I)",
    raceType: 'Chase',
    raceTypeDescriptionText: 'Chase Turf, Handicap',
    raceUrl: '/racing-results/Worcester/2021-09-13/1315/MansionBet-Bet-£10-Get-£20-Conditional-Jockeys-Handicap-Chase',
    ratingBand: '0-100',
    replayDetails: [{
        completeRaceEnd: 1,
        completeRaceStart: 0,
        completeRaceUid: 851115,
        finishRaceEnd: 1,
        finishRaceStart: 0,
        finishRaceUid: 851115,
        videoId: 851115,
        videoProvider: 'ATR',
    }],
    horsePositionResults: {
        data: [{
            countryCode: 'IRE',
            deadheat: false,
            horseId: 3335260,
            horseName: 'Head On',
            horseProfileUrl: 'head-on-3335260',
            isFavourite: true,
            jockeyName: 'Liam Harrison',
            officialPosition: '1',
            saddleClothNumber: '5',
            silkUrl: 'https://www.rp-assets.com/svg/1/0/9/206901.svg',
            startingPrice: '5/2',
            trainerName: 'Ian Williams',
        }, {
            countryCode: 'IRE',
            deadheat: false,
            horseId: 3179933,
            horseName: 'Terrafirma Lady',
            horseProfileUrl: 'terrafirma-lady-3179933',
            isFavourite: false,
            jockeyName: 'Alexander Thorne',
            officialPosition: '2',
            saddleClothNumber: '1',
            silkUrl: 'https://www.rp-assets.com/svg/3/7/7/294773.svg',
            startingPrice: '4/1',
            trainerName: 'Alan King',
        }, {
            countryCode: 'GB',
            deadheat: false,
            horseId: 2549647,
            horseName: 'Cloud Formation',
            horseProfileUrl: 'cloud-formation-2549647',
            isFavourite: false,
            jockeyName: 'Patrick Cowley',
            officialPosition: '3',
            saddleClothNumber: '3',
            silkUrl: 'https://www.rp-assets.com/svg/8/4/7/24748.svg',
            startingPrice: '40/1',
            trainerName: 'Martin Keighley',
        }, {
            countryCode: 'IRE',
            deadheat: false,
            horseId: 2926744,
            horseName: 'Dubai Guest',
            horseProfileUrl: 'dubai-guest-2926744',
            isFavourite: false,
            jockeyName: 'Lewis Stones',
            officialPosition: '4',
            saddleClothNumber: '4',
            silkUrl: 'https://www.rp-assets.com/svg/3/1/1/162113.svg',
            startingPrice: '12/1',
            trainerName: 'Olly Murphy',
        }],
        error: '',
        isLoading: false,
    },
    startDateTime: '2021-09-13 13:15',
    startTime: '13:15',
    status: 'result',
    surfaceType: 'Turf',
    ukDateFormat: '2021-09-13',
    utcTime: {
        raceDate: '2021-09-13',
        raceDateTime: '2021-09-13 12:15',
        raceTime: '12:15',
    },
    venueName: 'Worcester',
}

const deadHeatProps = {
    ageRestriction: '4+ years',
    bettingReturns: {
        currency: 'GBP',
        exacta: '£12.70',
        jackpot: '£0.00',
        place1: '£1.30',
        place2: '£1.60',
        place3: '£5.00',
        place4: '',
        placepot: '£33.40 to a £1 stake. Pool: £66,328.86 - 1447.14 winning units',
        quadpot: '£11.70 to a £1 stake. Pool: £7,657.13 - 481.87 winning units',
        rule4Text: '',
        rule4Value: '',
        straightForecast: '£13.42',
        toteWin: '£2.70',
        tricast: '£313.51',
        trifecta: '£225.80',
    },
    breakPoint: 'tablet',
    category: ['Handicap'],
    countDown: 'Now',
    countryCode: 'GB',
    date: '13 September 2021',
    diffusionMeetingName: 'WORCESTER',
    displayDistance: '2m 7f',
    fastRaceId: '278110',
    going: 'Good',
    isAbandoned: false,
    isFastResult: false,
    isHandicap: false,
    isResult: true,
    isUpcoming: false,
    liveOn: ['SKY'],
    localTime: {
        raceDate: '2021-09-13',
        raceDateTime: '2021-09-13 13:15',
        raceTime: '13:15',
    },
    meetingId: '101',
    meetingName: 'Worcester',
    numberOfRunners: '8',
    performRaceUidATR: null,
    performRaceUidRUK: null,
    raceClass: '5',
    raceId: '791570',
    raceLocalTime: {
        raceDate: '2021-09-13',
        raceDateTime: '2021-09-13 13:15',
        raceTime: '13:15',
    },
    raceTitle: "MansionBet Bet £10 Get £20 Conditional Jockeys' Handicap Chase (Div I)",
    raceType: 'Chase',
    raceTypeDescriptionText: 'Chase Turf, Handicap',
    raceUrl: '/racing-results/Worcester/2021-09-13/1315/MansionBet-Bet-£10-Get-£20-Conditional-Jockeys-Handicap-Chase',
    ratingBand: '0-100',
    replayDetails: [{
        completeRaceEnd: 1,
        completeRaceStart: 0,
        completeRaceUid: 851115,
        finishRaceEnd: 1,
        finishRaceStart: 0,
        finishRaceUid: 851115,
        videoId: 851115,
        videoProvider: 'ATR',
    }],
    horsePositionResults: {
        data: [{
            countryCode: 'IRE',
            deadheat: false,
            horseId: 3335260,
            horseName: 'Head On',
            horseProfileUrl: 'head-on-3335260',
            isFavourite: true,
            jockeyName: 'Liam Harrison',
            officialPosition: '1',
            saddleClothNumber: '5',
            silkUrl: 'https://www.rp-assets.com/svg/1/0/9/206901.svg',
            startingPrice: '5/2',
            trainerName: 'Ian Williams',
        }, {
            countryCode: 'IRE',
            deadheat: false,
            horseId: 3179933,
            horseName: 'Terrafirma Lady',
            horseProfileUrl: 'terrafirma-lady-3179933',
            isFavourite: false,
            jockeyName: 'Alexander Thorne',
            officialPosition: '2',
            saddleClothNumber: '1',
            silkUrl: 'https://www.rp-assets.com/svg/3/7/7/294773.svg',
            startingPrice: '4/1',
            trainerName: 'Alan King',
        }, {
            countryCode: 'GB',
            deadheat: true,
            horseId: 2549647,
            horseName: 'Cloud Formation',
            horseProfileUrl: 'cloud-formation-2549647',
            isFavourite: false,
            jockeyName: 'Patrick Cowley',
            officialPosition: '3',
            saddleClothNumber: '3',
            silkUrl: 'https://www.rp-assets.com/svg/8/4/7/24748.svg',
            startingPrice: '40/1',
            trainerName: 'Martin Keighley',
        }, {
            countryCode: 'IRE',
            deadheat: true,
            horseId: 2926744,
            horseName: 'Dubai Guest',
            horseProfileUrl: 'dubai-guest-2926744',
            isFavourite: false,
            jockeyName: 'Lewis Stones',
            officialPosition: '3',
            saddleClothNumber: '4',
            silkUrl: 'https://www.rp-assets.com/svg/3/1/1/162113.svg',
            startingPrice: '12/1',
            trainerName: 'Olly Murphy',
        }],
        error: '',
        isLoading: false,
    },
    startDateTime: '2021-09-13 13:15',
    startTime: '13:15',
    status: 'result',
    surfaceType: 'Turf',
    ukDateFormat: '2021-09-13',
    utcTime: {
        raceDate: '2021-09-13',
        raceDateTime: '2021-09-13 12:15',
        raceTime: '12:15',
    },
    venueName: 'Worcester',
}

describe('ResultRaceInformation', () => {
    test('ResultRaceInformation renders', () => {
        jest.spyOn(hooks, 'useBreakPoint').mockImplementation(() => ({
            isTablet: true,
        }));

        render(<ResultRaceInformation {...props} />)

        expect(screen.queryByTestId('Container__ResultRaceInformation')).toBeInTheDocument();
    });

    test('ResultRaceInformation information', () => {
        jest.spyOn(hooks, 'useBreakPoint').mockImplementation(() => ({
            isTablet: true,
        }));

        render(<ResultRaceInformation {...props} />)

        expect(screen.queryByTestId('Text__ResultRaceAbandoned')).not.toBeInTheDocument();
        expect(screen.queryByText('abandoned')).not.toBeInTheDocument();

        // horse names
        expect(screen.queryByText('Head On')).toBeInTheDocument();
        expect(screen.queryByText('Terrafirma Lady')).toBeInTheDocument();
        expect(screen.queryByText('Cloud Formation')).toBeInTheDocument();

        // horse starting prices
        expect(screen.queryByText('5/2')).toBeInTheDocument();
        expect(screen.queryByText('4/1')).toBeInTheDocument();
        expect(screen.queryByText('40/1')).toBeInTheDocument();

        // horse positions renders
        screen.queryAllByTestId('Text__ResultRaceOfficialPosition');
    });

    test('ResultRaceInformation betting returns details renders', () => {
        jest.spyOn(hooks, 'useBreakPoint').mockImplementation(() => ({
            isTablet: true,
        }));

        render(<ResultRaceInformation {...props} />)

        expect(screen.queryByText('TOTE RETURNS')).toBeInTheDocument();
        expect(screen.queryByText('Win:')).toBeInTheDocument();
        expect(screen.queryByText('£2.70')).toBeInTheDocument();
        expect(screen.queryByText('Place:')).toBeInTheDocument();
        expect(screen.queryByText('£1.30, £1.60, £5.00')).toBeInTheDocument();
        expect(screen.queryByText('Exacta:')).toBeInTheDocument();
        expect(screen.queryByText('£12.70')).toBeInTheDocument();
        expect(screen.queryByText('CSF:')).toBeInTheDocument();
        expect(screen.queryByText('£13.42')).toBeInTheDocument();
        expect(screen.queryByText('Trifecta:')).toBeInTheDocument();
        expect(screen.queryByText('£225.80')).toBeInTheDocument();
    });

    test('ResultRaceInformation betting returns won\'t render on mobile', () => {
        jest.spyOn(hooks, 'useBreakPoint').mockImplementation(() => ({
            isMobile: true,
        }));

        render(<ResultRaceInformation {...props} />)

        expect(screen.queryByTestId('Container__BettingReturns')).not.toBeInTheDocument();
    });

    test('To show only three runners when the race is handicap and there are less than 16 runners total', () => {
        jest.spyOn(hooks, 'useBreakPoint').mockImplementation(() => ({
            isTablet: true,
        }));

        render(<ResultRaceInformation {...props} />)

        expect(screen.queryByText('Head On')).toBeInTheDocument();
        expect(screen.queryByText('Terrafirma Lady')).toBeInTheDocument();
        expect(screen.queryByText('Cloud Formation')).toBeInTheDocument();
        expect(screen.queryByText('Dubai Guest')).not.toBeInTheDocument();
    });

    test('To show four runners when the race is handicap and there are 16 runners total', () => {
        jest.spyOn(hooks, 'useBreakPoint').mockImplementation(() => ({
            isTablet: true,
        }));

        render(<ResultRaceInformation
            {
                ...{
                    ...props,
                    numberOfRunners: '16',
                }
            }
        />)

        expect(screen.queryByText('Head On')).toBeInTheDocument();
        expect(screen.queryByText('Terrafirma Lady')).toBeInTheDocument();
        expect(screen.queryByText('Cloud Formation')).toBeInTheDocument();
        expect(screen.queryByText('Dubai Guest')).toBeInTheDocument();
        expect(screen.queryAllByTestId('Text__ResultRaceOfficialPosition')).toHaveLength(4);
    });

    test('To show 4 runners when the race is NOT handicap and there is dead-heat with two third places', () => {
        jest.spyOn(hooks, 'useBreakPoint').mockImplementation(() => ({
            isTablet: true,
        }));

        render(<ResultRaceInformation {...deadHeatProps} />)

        expect(screen.queryByText('Head On')).toBeInTheDocument();
        expect(screen.queryByText('Terrafirma Lady')).toBeInTheDocument();
        expect(screen.queryByText('Cloud Formation')).toBeInTheDocument();
        expect(screen.queryByText('Dubai Guest')).toBeInTheDocument();
        expect(screen.queryAllByTestId('Text__ResultRaceOfficialPosition')).toHaveLength(4);
    });
});
