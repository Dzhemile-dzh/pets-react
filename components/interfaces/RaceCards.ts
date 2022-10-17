import { RaceInterface, BettingReturnsInterface } from './Race';
import { OddsRaceInterface } from './Odds';
import {
    FavouriteRunnerInterface,
    FirstThreeWinnersObjectInterface,
} from './Runner';

export interface RaceCardsMeetingInterface {
    meetingId: string;
    meetingStartTime: string;
    meetingEndTime: string;
    name: string;
    diffusionMeetingName: string;
    numberOfRaces: string;
    countryCode: string;
    rpMeetingOrder: number;
    isMeetingAbandoned: boolean;
    meetingType: string;
    races: string[];
    weather?: string,
    numberNonRunners?: number;
    goingDetails?: string;
}

export interface FiltersInterface {
    isHandicap: boolean;
    raceType: string;
    courses: string[];
    date: string;
    raceStatus: string;
    shouldShowRaceTypeFilter: boolean;
    shouldShowHandicapFilter: boolean;
    shouldShowRaceStatusFilter: boolean;
}

export interface RaceCardsRaceInterface extends BettingReturnsInterface,
    Omit<RaceInterface,
    'startScheduledDatetimeUtc' | 'dateToClosestDay' | 'description' | 'eachWayTerms'
    | 'formatedCategory' | 'maxNumberOfRunners' | 'name' | 'rating' | 'runners'
    | 'isVoidRace' | 'weather' | 'verdict' | 'feed' | 'verdictAuthor'
    | 'winnerPrize' | 'dateWithOrdinal'
    >{
    fastRaceId: string;
    isFastResult: boolean;
    isAbandoned: boolean;
    isUpcoming: boolean;
    startDateTime: string;
    ukDateFormat: string;
    venueName: string;
    ratingBand: string;
    isHandicap: boolean;
}

export interface RaceCardsObjectInterface {
    meetings: Array<RaceCardsMeetingInterface>,
    races: Array<RaceCardsRaceInterface>,
    allMeetings: Array<RaceCardsMeetingInterface>,
    allRaces: Array<RaceCardsRaceInterface>,
    headerTitle: Array<string>,
}

export interface RaceCardsWrapperInterface {
    date: string;
    shouldDisplayTimeline?: boolean;
    route: string;
    shouldSubscribeForFastResults?: boolean;
}

export interface RaceCardInformationInterface {
    distance: string,
    mobileDistanceClass: string,
    race: Partial<OddsRaceInterface>,
    favouriteRunner: {
        data: FavouriteRunnerInterface,
        error: string,
        isLoading: boolean,
    },
}

export interface RaceCardRunnersInformationInterface {
    firstThreeWinners: FirstThreeWinnersObjectInterface,
    favouriteRunners: {
        key?: {
            data: FavouriteRunnerInterface,
            error: string,
            isLoading: boolean,
        }
    },
    breakPoint?: string,
    shouldDisplayTimeline?: boolean,
    date?: string,
}
