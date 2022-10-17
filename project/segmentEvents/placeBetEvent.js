import { ANALYTICS_EVENTS } from '../analytics';

export const placeBetEvent = ({
    bookmakerName,
    selectionsCount,
    timeToPlaceBet,
    errorProps = {},
}) => {
    ANALYTICS_EVENTS.trackEvent('Place Bet', {
        bookmaker: bookmakerName,
        selections_count: selectionsCount,
        time_to_place_bet: timeToPlaceBet,
        ...errorProps,
    });
}
