import { ANALYTICS_EVENTS } from '../analytics';

export const pageEvent = (pageName, deviceType) => {
    ANALYTICS_EVENTS.trackPage({
        name: pageName,
        bet_slip_id: null,
        bookmaker_logged_in_status: null,
        logged_in_status: null,
        session_id: null,
        device_type: deviceType,
    });
}
