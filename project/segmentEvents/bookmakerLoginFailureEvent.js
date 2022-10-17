import { ANALYTICS_EVENTS } from '../analytics';

export const bookmakerLoginFailureEvent = ({
    location,
    bookmakerName,
    bookmakerListPosition,
    bookmakerLoginError,
}) => {
    ANALYTICS_EVENTS.trackEvent('Bookmaker Login Failure', {
        bookmaker: bookmakerName,
        position: bookmakerListPosition,
        session_id: null,
        location,
        api_bookmaker_error_code: bookmakerLoginError?.type,
        api_error_detail: bookmakerLoginError?.message,
        error_code: '400',
        method: 'manual',
    })
};
