import { ANALYTICS_EVENTS } from '../analytics';

export const bookmakerLoginOpenTapEvent = ({ location, bookmakerName, bookmakerListPosition }) => {
    ANALYTICS_EVENTS.trackEvent('Bookmaker Login Open Tap', {
        bookmaker: bookmakerName,
        position: bookmakerListPosition,
        session_id: null,
        location,
    })
}
