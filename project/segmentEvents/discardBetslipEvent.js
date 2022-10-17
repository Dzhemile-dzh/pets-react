import { ANALYTICS_EVENTS } from '../analytics';
import {
    getBetBasketTimer,
    resetBetBasketTimer,
    clearBetslipId,
} from './storageHelpers';

export const discardBetslipEvent = async (bookmakerName) => {
    const betBasketTimer = getBetBasketTimer();

    await ANALYTICS_EVENTS.trackEvent('Discard Betslip', {
        session_id: null,
        bookmaker: bookmakerName,
        bet_basket_timer: (Date.now() - betBasketTimer) / 1000,
    });

    resetBetBasketTimer();
    clearBetslipId();
}
