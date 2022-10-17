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
export interface RecentRaceFormObjectInterface {
    data: Array<RecentRaceFormInterface> | null;
    error: string;
    isLoading: boolean;
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

export interface FavouriteRunnerInterface extends Omit<RunnerInterface,
'trainerId' | 'jockeyId' | 'horseAge' | 'gear' | 'horseId' | 'originCountryCode' |
'isNonRunner' | 'rpr' | 'weightAllowance' | 'weightExtra' | 'recentRaceForm' | 'moreData' |
'spotlightComment' | 'numberTips' | 'tipsters' | 'windOp' | 'daysSinceLastRun' |
'expectedWeight' | 'feed' | 'lastResults' | 'isReserve'
>{
    trainerId: number;
    jockeyId: number;
    countryCode: string;
    runnerFeed: string;
}

export interface FavouriteRunnerObjectInterface {
    data: FavouriteRunnerInterface;
    error: string;
    isLoading: boolean;
}

export interface FavouriteRunnersObjectInterface {
    key?: FavouriteRunnerObjectInterface;
}

export interface FirstThreeWinnersRunnerInterface extends Omit<RunnerInterface,
'uid' | 'draw' | 'horseAge' | 'horseId' | 'gear' | 'originCountryCode' |
'isNonRunner' | 'jockeyId' | 'rpr' | 'trainerId' | 'weightAllowance' | 'weightExtra' |
'recentRaceForm' | 'moreData' | 'spotlightComment' | 'numberTips' | 'tipsters' | 'windOp' |
'daysSinceLastRun' | 'expectedWeight' | 'feed' | 'lastResults' | 'isReserve'
>{
    horseId: number;
    officialPosition: string;
    countryCode: string;
    isFavourite: boolean;
    startingPrice: string;
    deadheat: boolean;
}

export interface FirstThreeRaceWinnersObjectInterface {
    isLoading: boolean;
    error: string;
    data: Array<FirstThreeWinnersRunnerInterface>;
}

export interface FirstThreeWinnersObjectInterface {
    key?: FirstThreeRaceWinnersObjectInterface;
}

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
