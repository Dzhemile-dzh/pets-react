import { ANALYTICS_EVENTS } from '../analytics';

export const bookmakerLoginSuccessEvent = ({ location, bookmakerName, bookmakerListPosition }) => {
    ANALYTICS_EVENTS.trackEvent('Bookmaker Login Success', {
        bookmaker: bookmakerName,
        position: bookmakerListPosition,
        session_id: null,
        location,
        method: 'manual',
    })
}
