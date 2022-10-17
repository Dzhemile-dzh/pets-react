import { ANALYTICS_EVENTS } from '../analytics';
import { startBetBasketTimer } from './storageHelpers';

export const betBasketCreatedEvent = ({ bookmakerName, areOddsFractional }) => {
    ANALYTICS_EVENTS.trackEvent('Bet Basket Created', {
        bookmaker: bookmakerName,
        is_fractional: areOddsFractional,
        session_id: null,
    })

    startBetBasketTimer();
}
