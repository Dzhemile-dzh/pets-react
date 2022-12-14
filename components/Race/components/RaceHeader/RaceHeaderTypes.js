import propTypes from 'prop-types';

export const RaceHeaderTypes = {
    ageRestriction: propTypes.string,
    formatedCategory: propTypes.string,
    date: propTypes.string,
    dateToClosestDay: propTypes.string,
    description: propTypes.string,
    displayDistance: propTypes.string,
    eachWayTerms: propTypes.string,
    going: propTypes.string,
    liveOn: propTypes.array,
    name: propTypes.string,
    numberOfRunners: propTypes.string,
    maxNumberOfRunners: propTypes.string,
    raceClass: propTypes.string,
    raceType: propTypes.string,
    startTime: propTypes.string,
    raceTypeDescriptionText: propTypes.string,
    rating: propTypes.string,
    winnerPrize: propTypes.string,
    surfaceType: propTypes.string,
    isResult: propTypes.bool,
    winningTime: propTypes.string,
    timePerFurlong: propTypes.string,
    totalStartingPrice: propTypes.string,
    prizes: propTypes.shape({
        toteWin: propTypes.string,
        tricast: propTypes.string,
        place: propTypes.string,
        exacta: propTypes.string,
        jackpot: propTypes.string,
        straightForecast: propTypes.string,
        trifecta: propTypes.string,
        winner: propTypes.string,
        quadpot: propTypes.string,
        placepot: propTypes.string,
        placepotDetails: propTypes.string,
    }),
    raceOffTime: propTypes.string,
    countryCode: propTypes.string,
    breakPoint: propTypes.string,
    status: propTypes.string,
    countDown: propTypes.string,
};
