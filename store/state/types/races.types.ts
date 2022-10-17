import { ReplayDetails } from './shared.types';

export interface RecentRaceFormInterface {
    raceId: string;
    raceUrl?: string;
    raceClass: string;
    raceTitle: string;
    going: string;
    displayDistance: string;
    meetingId?: string;
    meetingName: string;
    meetingDate: string;
    runnerId: string;
    runnerCloseUpComment?: string;
    weightCarried: string;
    topspeedRating: number | null | string;
    racingPostRating: number | null;
    officialRating: string;
    startingPrice: string;
    position: string;
    isRunnerWinner: boolean;
    winnerAndLengths: string;
    raceTypeDescription: string;
    showNote: boolean;
}

export interface RecentRaceFormObjectInterface {
    data: Array<RecentRaceFormInterface> | null,
    error: string,
    isLoading: boolean
}

export interface RunnerMoreDataInterface {
    sex: string;
    colour: string;
    sireName: string;
    sireOriginCountryCode: string;
    damName: string;
    damOriginCountryCode: string;
    ownerName: string;
    ownerId: string;
    runnersToForm: string;
    officialRating: string;
    topspeedRating: string;
}

export interface RunnerInterface {
    uid: string;
    draw: string;
    horseAge: string;
    horseName: string;
    gear: string;
    horseId: string;
    originCountryCode: string;
    isNonRunner: boolean;
    jockeyName: string;
    jockeyId: string;
    rpr: string;
    saddleClothNumber: string;
    silkUrl: string;
    trainerName: string;
    trainerId: string;
    weightAllowance: string;
    weightExtra: string;
    recentRaceForm: RecentRaceFormObjectInterface | null;
    moreData: RunnerMoreDataInterface;
    spotlightComment: string;
    numberTips: string;
    tipsters: string;
    windOp: string;
    horseProfileUrl: string;
    daysSinceLastRun: string;
    expectedWeight: string;
    feed: string;
    lastResults: Array<{
        value: string;
        isBold: boolean;
    }>;
    isReserve: boolean;
    summary?: string;
}

export interface RaceInterface {
    performRaceUidRUK: number;
    performRaceUidATR: number;
    replayDetails: Array<ReplayDetails> | null;
    startScheduledDatetimeUtc: string;
    ageRestriction: string;
    category: Array<string>;
    countryCode: string;
    date: string;
    dateToClosestDay: string;
    description: string;
    displayDistance: string;
    eachWayTerms: string;
    formatedCategory: string;
    going: string;
    isResult: boolean;
    maxNumberOfRunners: string;
    name: string;
    raceTitle: string;
    numberOfRunners: string;
    raceClass: string;
    raceType: string;
    rating: string;
    runners: Array<RunnerInterface>;
    startTime: string;
    countDown: string;
    surfaceType: string;
    winnerPrize: string;
    meetingName: string;
    meetingId: string;
    dateWithOrdinal: string;
    status: string;
    raceTypeDescriptionText: string;
    raceUrl: string;
    raceId: string;
    diffusionMeetingName: string;
    utcTime: {
        raceTime: string;
        raceDate: string;
        raceDateTime: string;
    };
    localTime: {
        raceTime: string;
        raceDate: string;
        raceDateTime: string;
    };
    raceLocalTime: {
        raceTime: string;
        raceDate: string;
        raceDateTime: string;
    };
    startDateTime: string;
    isVoidRace: boolean;
    weather: string;
    liveOn: Array<string>;
    verdict: Array<{
        isBold: boolean;
        value: string;
    }>;
    feed: string;
    verdictAuthor: string;
    ratingBand: string;
    isAbandoned: boolean;
    isFastResult: boolean;
    isHandicap: boolean;
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
}

export interface RaceObjectInterface {
    raceData: RaceInterface;
    isRaceLoading: boolean;
    raceError: string;
}
