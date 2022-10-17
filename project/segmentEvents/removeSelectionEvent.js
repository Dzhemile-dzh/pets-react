import { ANALYTICS_EVENTS } from '../analytics';
import { addUTCOffsetToDateTime } from '../utils/analyticsUtils';

export const removeSelectionEvent = (bookmaker, betSelection) => {
    const {
        horseId,
        horseName,
        localTime,
        meetingId,
        meetingName,
        oddsDecimal,
        raceId,
        raceLocalTime,
        useBestOddsGuaranteed,
    } = betSelection.runnerInfo ?
        getBetSelectionProperties(betSelection) :
        betSelection;

    ANALYTICS_EVENTS.trackEvent('Remove Selection', {
        best_odds_guaranteed: useBestOddsGuaranteed || false,
        bookmaker,
        horse_id: horseId,
        horse_name: horseName,
        local_race_date_time: addUTCOffsetToDateTime(raceLocalTime?.raceDateTime),
        local_race_date: raceLocalTime?.raceDate,
        local_race_time: raceLocalTime?.raceTime,
        location: null,
        odds_decimal: oddsDecimal,
        race_date_time: addUTCOffsetToDateTime(localTime?.raceDateTime),
        race_date: localTime?.raceDate,
        race_id: raceId,
        race_time: localTime?.raceTime,
        racecourse_id: meetingId,
        racecourse: meetingName,
        sport: 'horse racing',
        session_id: null,
    });
}

const getBetSelectionProperties = (betSelection) => {
    const {
        runnerInfo: {
            horseName,
            id: horseId,
        },
        raceInfo: {
            meetingId,
            meetingName,
            localTime,
            raceLocalTime,
            id: raceId,
        },
        selectionDetails: {
            useBestOddsGuaranteed,
        },
        displayPrice: {
            decimal,
        },
        isSpSelected,
    } = betSelection;

    return {
        horseId,
        horseName,
        localTime,
        meetingId,
        meetingName,
        oddsDecimal: isSpSelected ? 'SP' : decimal,
        raceId,
        raceLocalTime,
        useBestOddsGuaranteed,
    };
}
