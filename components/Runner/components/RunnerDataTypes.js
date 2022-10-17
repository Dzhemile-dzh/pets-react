import propTypes from 'prop-types';

export const RaceHistoryDataType = {
    distance: propTypes.string,
    distanceFromWinner: propTypes.string,
    going: propTypes.string,
    isRunnerWinner: propTypes.bool,
    meetingDate: propTypes.string,
    meetingId: propTypes.string,
    meetingName: propTypes.string,
    numberOfRunners: propTypes.string,
    officialRating: propTypes.string,
    position: propTypes.string,
    raceClass: propTypes.string,
    raceId: propTypes.string,
    raceType: propTypes.string,
    racingPostRating: propTypes.oneOfType([propTypes.number, propTypes.string]),
    runnerId: propTypes.string,
    sameRaceData: propTypes.array,
    startingPrice: propTypes.string,
    topspeedRating: propTypes.oneOfType([propTypes.string, propTypes.number]),
    weightCarried: propTypes.string,
    winnerName: propTypes.string,
};

export const RaceHistoryPropsType = {
    data: propTypes.arrayOf(propTypes.shape(RaceHistoryDataType)),
    error: propTypes.string,
    isLoading: propTypes.bool,
}
export const RecentRaceHistoryPropsType = {
    breakPoint: propTypes.string.isRequired,
    history: propTypes.shape(RaceHistoryPropsType),
};

export const HorseMoreDataType = {
    sex: propTypes.string,
    colour: propTypes.string,
    sireName: propTypes.string,
    damName: propTypes.string,
    ownerName: propTypes.string,
    runnersToForm: propTypes.string,
    officialRating: propTypes.string,
    topspeedRating: propTypes.oneOfType([propTypes.string, propTypes.number]),
    sireOriginCountryCode: propTypes.string,
    damOriginCountryCode: propTypes.string,
}

export const HorseDataType = {
    daysSinceLastRun: propTypes.string,
    distanceFromHorseInFront: propTypes.string,
    distanceFromNextHorse: propTypes.string,
    distanceFromWinner: propTypes.string,
    draw: propTypes.string,
    gear: propTypes.string,
    horseAge: propTypes.string,
    horseName: propTypes.string.isRequired,
    isFavourite: propTypes.bool,
    isNonRunner: propTypes.bool,
    jockeyName: propTypes.string,
    lastResults: propTypes.array,
    officialPosition: propTypes.string,
    rpr: propTypes.string,
    saddleClothNumber: propTypes.string,
    silkUrl: propTypes.string,
    startingPrice: propTypes.string,
    tips: propTypes.string,
    trainerName: propTypes.string,
    weight: propTypes.string,
    expectedWeight: propTypes.string,
    weightAllowance: propTypes.string,
    isEWPayingPosition: propTypes.bool,
    summary: propTypes.string,
    formatedOfficialPosition: propTypes.string,
    moreData: propTypes.shape(HorseMoreDataType),
    recentRaceForm: propTypes.shape(RaceHistoryPropsType),
    spotlightComment: propTypes.string,
};

export const RunnerPropsType = {
    uid: propTypes.string,
    runner: propTypes.shape(HorseDataType).isRequired,
    oddsData: propTypes.object,
    isResult: propTypes.bool.isRequired,
    shouldShowComments: propTypes.bool,
    cardCustomization: propTypes.object,
};
