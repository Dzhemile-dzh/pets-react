import { RunnerInterface } from './Runner';
import { BookmakerOffer } from './Bookmaker';

export interface BettingReturnsInterface {
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
    } | Record<string, never>
}

export interface RaceInterface extends BettingReturnsInterface {
    performRaceUidRUK?: number;
    performRaceUidATR?: number;
    replayDetails?: Array<ReplayDetails> | null;
    startScheduledDatetimeUtc?: string;
    ageRestriction: string;
    category: Array<string>;
    countryCode: string;
    date: string;
    dateToClosestDay?: string;
    description?: string;
    displayDistance?: string;
    eachWayTerms?: string;
    formatedCategory?: string;
    going?: string;
    isResult: boolean;
    maxNumberOfRunners?: string;
    name?: string;
    raceTitle: string;
    numberOfRunners: string;
    raceClass: string;
    raceType: string;
    rating?: string;
    runners?: Array<RunnerInterface>;
    startTime: string;
    countDown: string;
    surfaceType: string;
    winnerPrize?: string;
    meetingName: string;
    meetingId: string;
    dateWithOrdinal?: string;
    status: string;
    raceTypeDescriptionText?: string;
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
    startDateTime?: string;
    isVoidRace?: boolean;
    weather?: string;
    liveOn?: Array<string>;
    verdict?: Array<{
        isBold: boolean;
        value: string;
    }>;
    feed?: string;
    verdictAuthor?: string;
    ratingBand?: string;
    isAbandoned?: boolean;
    isFastResult?: boolean;
    isHandicap?: boolean;
    hybridRaceUrl: string;
}

export interface RaceObjectInterface {
    raceData: RaceInterface;
    isRaceLoading: boolean;
    raceError?: string;
}

export interface CardCustomizationInterface {
    priceType: string;
    numberOfRecentRaces: number;
    showRunnerBasicInfo: boolean;
    showRunnerAdditionalInfo: boolean;
    showOdds: boolean;
    runnersSortedBy: string;
    isCompactViewEnabled: boolean;
}

export interface RaceOffer {
    hasOffers: boolean;
    offers: Array<BookmakerOffer>;
}

export interface ReplayDetails {
    videoId: number;
    videoProvider: string;
    completeRaceUid: number;
    completeRaceStart: number;
    completeRaceEnd: number;
    finishRaceUid: number;
    finishRaceStart: number;
    finishRaceEnd: number;
}

export interface NextUKOnlyRaceInterface {
    getNextUKOnlyRaceError: string,
    isNextUKOnlyRaceLoading: boolean,
    nextUKOnlyRaceData: {
        raceUrl: string;
        startTime: string;
        meetingName: string;
        utcTime: {
            raceDateTime: string
        }
    }
}
