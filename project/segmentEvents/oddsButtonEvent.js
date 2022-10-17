import { ANALYTICS_EVENTS } from '../analytics';
import { Constants } from '../constants';
import { addUTCOffsetToDateTime } from '../utils/analyticsUtils';

const { ODDS_TYPES } = Constants

export const oddsButtonEvent = (betSelection, bookmakerConfig, priceType, race, runner) => {
    const {
        countryCode,
        id,
        meetingId,
        meetingName,
        raceLocalTime,
        localTime,
    } = race;

    const {
        horseName,
        jockeyId,
        jockeyName,
        trainerId,
        trainerName,
        uid,
    } = runner;

    const {
        displayPrice: {
            decimal,
        },
        selectionDetails: {
            useBestOddsGuaranteed,
        },
    } = betSelection;

    ANALYTICS_EVENTS.trackEvent('Odds Button', {
        best_odds_guaranteed: useBestOddsGuaranteed,
        bookmaker: bookmakerConfig?.displayName,
        horse_fav: null,
        horse_id: uid,
        horse_name: horseName,
        is_fractional: (priceType === ODDS_TYPES.FRACTIONAL),
        jockey_id: jockeyId,
        jockey_name: jockeyName,
        local_race_date_time: addUTCOffsetToDateTime(raceLocalTime?.raceDateTime),
        local_race_date: raceLocalTime?.raceDate,
        local_race_time: raceLocalTime?.raceTime,
        location: null,
        odds_decimal: decimal,
        owner_id: null,
        owner_name: null,
        race_id: id,
        race_date: localTime?.raceDate,
        race_time: localTime?.raceTime,
        race_date_time: addUTCOffsetToDateTime(localTime?.raceDateTime),
        racecourse_country: countryCode,
        racecourse_id: meetingId,
        racecourse: meetingName,
        trainer_id: trainerId,
        trainer_name: trainerName,
        sport: 'horse racing',
    });
}
