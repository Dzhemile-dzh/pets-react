export interface BetHistoryItemSelectionInterface {
    selectionId: string;
    selectionName: string;
    eventName: string;
    eventTime: string;
    eventDate: string;
    oddsDecimal: number;
    isEachWay: boolean;
    oddsFractionalNumerator: number | string;
    oddsFractionalDenominator: number | string;
    eachWayTermsPlaces: number;
    eachWayTermsNumerator: number;
    eachWayTermsDenominator: number;
    result: string;
}

export interface BetHistoryItemInterface {
    bookmakerName: string;
    betId: string;
    type: string;
    stake: string;
    freeBetStake: string;
    numberOfLines: number;
    stakePerLine: string;
    totalStake: string;
    date: string;
    time: string;
    currencySign: string;
    isEachWay: boolean;
    estimatedReturns: string;
    cashOutAmount: string;
    isCashOutAvailable: boolean;
    selections: Array<BetHistoryItemSelectionInterface>;
    isMultipleBetFromDiffRaces: boolean;
}

export interface UnsettledBetHistoryInterface {
    isUnsettledBetHistoryLoading: boolean;
    unsettledBetHistoryBets: Array<BetHistoryItemInterface>;
    unsettledBetHistoryPagination: {
        pageSize: number;
        hasNext: boolean;
    };
    unsettledBetHistoryErrors: string | null;
}

export interface SettledBetHistoryInterface {
    isSettledBetHistoryLoading: boolean;
    settledBetHistoryBets: Array<BetHistoryItemInterface>;
    settledBetHistoryPagination: {
        pageSize: number;
        hasNext: boolean;
    };
    settledBetHistoryErrors: string | null;
}

export interface BookmakerBetHistoryUrlsInterface {
    isBetHistoryUrlLoading: boolean;
    error: string | null;
    bookmakers: Record<string, string>;
}

export interface BetHistoryInterface {
    unsettled: UnsettledBetHistoryInterface;
    settled: SettledBetHistoryInterface;
    urls: BookmakerBetHistoryUrlsInterface;
}
