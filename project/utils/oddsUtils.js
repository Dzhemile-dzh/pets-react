export function getOddsData(key, odds, isSubscribed, onAddSelection) {
    if (!odds || !odds[`${key}`]) {
        return {
            odds: '-',
            isFav: false,
            historicalOdds: {},
            onAddSelection,
            isSubscribed,
        };
    }

    const runnerOdds = odds[`${key}`];
    const {
        odds_fractional,
        isFav,
        hist_f1,
        hist_f2,
        hist_f3,
        hist_f4,
        hist_f5,
    } = runnerOdds;

    return {
        odds: odds_fractional || '-',
        isFav,
        historicalOdds: {
            hist_f1,
            hist_f2,
            hist_f3,
            hist_f4,
            hist_f5,
        },
        onAddSelection,
        isSubscribed,
    };
}
