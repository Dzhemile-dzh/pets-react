import { ANALYTICS_EVENTS } from '../analytics';

export const betslipErrorBuildBetEvent = ({ bookmakerName, betslipError, betSelectionsCount }) => {
    ANALYTICS_EVENTS.trackEvent('Betslip Error - Build Bet', {
        bookmaker: bookmakerName,
        api_bookmaker_error_code: betslipError?.type,
        api_error_detail: betslipError?.message,
        error_code: '400',
        selections_count: betSelectionsCount,
        session_id: null,
    })
};
