import { ANALYTICS_EVENTS } from '../analytics';

export const bookmakerRegistrationTapEvent = ({
    location,
    bookmakerName,
    bookmakerListPosition,
}) => {
    ANALYTICS_EVENTS.trackEvent('Bookmaker Registration Tap', {
        bookmaker: bookmakerName,
        position: bookmakerListPosition,
        session_id: null,
        location,
    })
};
