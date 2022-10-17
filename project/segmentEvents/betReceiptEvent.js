import { ANALYTICS_EVENTS } from '../analytics';
import { getCurrencyBySign } from '../utils/formatUtils';
import { addUTCOffsetToDateTime } from '../utils/analyticsUtils';

export const betReceiptEvent = (
    betReceipts,
    selectedBookmaker,
    areOddsFractional,
    betSelections,
    userBalance,
) => {
    const betSelectionsKeys = Object.keys(betSelections);
    const currency = getCurrencyBySign(userBalance?.currencySign);

    betSelectionsKeys.forEach((key) => {
        const betSelection = betSelections[key];
        const {
            raceInfo, runnerInfo, displayPrice, selectionDetails,
        } = betSelection;

        const betReceipt = betReceipts.find((receipt) => {
            return receipt.betSelections
                .find((selection) => selection.selectionId === selectionDetails.selectionId)
        });

        if (!betReceipt) {
            return;
        }

        const {
            betId,
            betType,
            numberLines,
            stakePerLine,
            isEWSelected,
        } = betReceipt;

        ANALYTICS_EVENTS.trackEvent('Bet Receipt', {
            bet_receipt_id: betId,
            stake_per_line: stakePerLine,
            total_stake: stakePerLine * numberLines,
            session_id: null,
            bookmaker: selectedBookmaker,
            bet_type: betType,
            odds_decimal_total: displayPrice.decimal,
            is_fractional: areOddsFractional,
            currency,
            win_ew: isEWSelected ? 'EW' : 'Win',
            selections_count: betSelectionsKeys.length,
            free_bet_used: null,
            selection_1_best_odds_guaranteed: null,
            selection_1_horse_fav: null,
            selection_1_horse_id: runnerInfo?.id,
            selection_1_horse_name: runnerInfo?.horseName,
            selection_1_jockey_id: runnerInfo?.jockeyId,
            selection_1_jockey_name: runnerInfo?.jockeyName,
            selection_1_local_race_date_time:
                addUTCOffsetToDateTime(raceInfo?.raceLocalTime?.raceDateTime),
            selection_1_local_race_date: raceInfo?.raceLocalTime?.raceDate,
            selection_1_local_race_time: raceInfo?.raceLocalTime?.raceTime,
            selection_1_location: null,
            selection_1_odds_decimal: displayPrice.decimal,
            selection_1_owner_id: runnerInfo?.ownerId,
            selection_1_owner_name: runnerInfo?.ownerName,
            selection_1_race_date_time: addUTCOffsetToDateTime(raceInfo?.localTime.raceDateTime),
            selection_1_race_date: raceInfo?.localTime.raceDate,
            selection_1_race_id: raceInfo?.id,
            selection_1_race_period: null,
            selection_1_race_time: raceInfo?.localTime.raceTime,
            selection_1_race_type: null,
            selection_1_racecourse_country: raceInfo?.countryCode,
            selection_1_racecourse_id: raceInfo?.meetingId,
            selection_1_racecourse: raceInfo?.meetingName,
            selection_1_sport: 'Horse Racing',
            selection_1_trainer_id: runnerInfo?.trainerId,
            selection_1_trainer_name: runnerInfo?.trainerName,
            selection_1_tv_provider: null,
        });
    });
}
