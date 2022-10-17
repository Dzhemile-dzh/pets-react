import { ReplayDetails } from './shared.types';

export interface TimeObjectInterface {
    raceDate: string;
    raceDateTime: string;
    raceTime: string;
}

export interface RaceCardsRaceInterface {
    status: string;
    raceId: string;
    fastRaceId: string;
    isResult: boolean;
    isFastResult: boolean;
    isAbandoned: boolean;
    isUpcoming: boolean;
    raceTitle: string;
    startTime: string;
    startDateTime: string;
    ukDateFormat: string;
    diffusionMeetingName: string;
    raceUrl: string;
    meetingName: string;
    meetingId: string;
    venueName: string;
    date: string;
    ageRestriction: string;
    displayDistance: string;
    going: string;
    numberOfRunners: string;
    raceClass: string;
    raceType: string;
    ratingBand: string;
    surfaceType: string;
    countDown: string;
    countryCode: string;
    bettingReturns: {
        currency: string;
        exacta: string;
        jackpot: string;
        place1: string;
        place2: string;
        place3: string;
        place4: string;
        placepot: string;
        quadpot: string;
        rule4Text: string;
        rule4Value: string;
        straightForecast: string;
        toteWin: string;
        tricast: string;
        trifecta: string;
    } | Record<string, never>;
    liveOn: string[];
    replayDetails: ReplayDetails[] | null;
    performRaceUidATR: number | null;
    performRaceUidRUK: number | null;
    isHandicap: boolean;
    category: string[];
    raceTypeDescriptionText: string;
    utcTime: TimeObjectInterface;
    localTime: TimeObjectInterface;
    raceLocalTime: TimeObjectInterface;
    statusFeed: string;
    hybridRaceUrl: string;
}

export interface RaceCardsMeetingInterface {
    meetingId: string;
    meetingStartTime: string;
    meetingEndTime: string;
    name: string;
    races: string[];
    diffusionMeetingName: string;
    numberOfRaces: string;
    countryCode: string;
    rpMeetingOrder: number;
    isMeetingAbandoned: boolean;
    meetingType: string;
    weather: string;
    numberNonRunners: number;
    goingDetails: string;
    courseKey: string;
}

export interface RaceCardsObjectInterface {
    allMeetings: Array<RaceCardsMeetingInterface>,
    allRaces: RaceCardsRaceInterface[],
    headerTitle: Array<string>,
}

export interface RaceCardsInterface {
    isRaceCardsLoading: boolean;
    raceCardsError: string;
    raceCardsData: RaceCardsObjectInterface;
}
