const settledBetHistoryCommon = {
    isSettledBetHistoryLoading: false,
    settledBetHistoryPagination: {
        pageSize: 1,
        hasNext: false,
    },
    settledBetHistoryErrors: null,
}

export const emptySettledBetHistory = {
    ...settledBetHistoryCommon,
    settledBetHistoryBets: [],
}

export const settledBetHistoryMultiple = {
    ...settledBetHistoryCommon,
    settledBetHistoryBets: [
        {
            bookmakerName: 'williamhill',
            betId: 'O/11822704/0033947/F',
            type: 'Double',
            stake: '0.03',
            freeBetStake: null,
            numberOfLines: 1,
            stakePerLine: '0.03',
            totalStake: '0.03',
            date: '2021-12-17',
            time: '11:47',
            currencySign: '',
            isEachWay: false,
            isMultipleBetFromDiffRaces: true,
            returns: null,
            isWinning: false,
            selections: [
                {
                    selectionId: '3472372518',
                    selectionName: 'Brave Seasca',
                    eventName: '1:45 Ascot',
                    eventTime: '13:45',
                    eventDate: '2021-12-17',
                    oddsDecimal: 3.3333333333333335,
                    isEachWay: false,
                    oddsFractionalNumerator: 10,
                    oddsFractionalDenominator: 3,
                    eachWayTermsPlaces: null,
                    eachWayTermsNumerator: null,
                    eachWayTermsDenominator: null,
                    result: 'Won',
                },
                {
                    selectionId: '3472372561',
                    selectionName: 'Complete Unknown',
                    eventName: '1:10 Ascot',
                    eventTime: '13:10',
                    eventDate: '2021-12-17',
                    oddsDecimal: 1.75,
                    isEachWay: false,
                    oddsFractionalNumerator: 7,
                    oddsFractionalDenominator: 4,
                    eachWayTermsPlaces: null,
                    eachWayTermsNumerator: null,
                    eachWayTermsDenominator: null,
                    result: 'Lost',
                },
            ],
        },
    ],
}

export const settledBetHistoryForecast = {
    ...settledBetHistoryCommon,
    settledBetHistoryBets: [
        {
            bookmakerName: 'williamhill',
            betId: 'O/11822704/0033945/F',
            type: 'Forecast',
            stake: '0.03',
            freeBetStake: null,
            numberOfLines: 1,
            stakePerLine: '0.03',
            totalStake: '0.03',
            date: '2021-12-17',
            time: '10:32',
            currencySign: '',
            isEachWay: false,
            isMultipleBetFromDiffRaces: false,
            returns: null,
            isWinning: false,
            selections: [
                {
                    selectionId: '3472372594',
                    selectionName: 'Henri The Second',
                    eventName: '3:30 Ascot',
                    eventTime: '15:30',
                    eventDate: '2021-12-17',
                    oddsDecimal: null,
                    isEachWay: false,
                    oddsFractionalNumerator: 'SP',
                    oddsFractionalDenominator: 'SP',
                    eachWayTermsPlaces: null,
                    eachWayTermsNumerator: null,
                    eachWayTermsDenominator: null,
                    result: 'Won',
                },
                {
                    selectionId: '3472372600',
                    selectionName: 'Top Dog',
                    eventName: '3:30 Ascot',
                    eventTime: '15:30',
                    eventDate: '2021-12-17',
                    oddsDecimal: null,
                    isEachWay: false,
                    oddsFractionalNumerator: 'SP',
                    oddsFractionalDenominator: 'SP',
                    eachWayTermsPlaces: null,
                    eachWayTermsNumerator: null,
                    eachWayTermsDenominator: null,
                    result: 'Placed',
                },
            ],
        },
    ],
}

export const settledBetHistorySingleVoid = {
    ...settledBetHistoryCommon,
    settledBetHistoryBets: [
        {
            bookmakerName: 'williamhill',
            betId: 'O/11822704/0033944/F',
            type: 'Single',
            stake: '0.03',
            freeBetStake: null,
            numberOfLines: 1,
            stakePerLine: '0.03',
            totalStake: '0.03',
            date: '2021-12-17',
            time: '10:32',
            currencySign: '',
            isEachWay: false,
            isMultipleBetFromDiffRaces: false,
            returns: null,
            isWinning: false,
            selections: [
                {
                    selectionId: '3472373393',
                    selectionName: 'Greatest Star',
                    eventName: '3:10 Uttoxeter',
                    eventTime: '15:10',
                    eventDate: '2021-12-17',
                    oddsDecimal: 2.75,
                    isEachWay: false,
                    oddsFractionalNumerator: 11,
                    oddsFractionalDenominator: 4,
                    eachWayTermsPlaces: null,
                    eachWayTermsNumerator: null,
                    eachWayTermsDenominator: null,
                    result: 'Void',
                },
            ],
        },
    ],
}

export const settledBetHistorySingle = {
    ...settledBetHistoryCommon,
    settledBetHistoryBets: [
        {
            bookmakerName: 'williamhill',
            betId: 'O/11822704/0033946/F',
            type: 'Single',
            stake: '0.03',
            freeBetStake: null,
            numberOfLines: 1,
            stakePerLine: '0.03',
            totalStake: '0.03',
            date: '2021-12-17',
            time: '11:47',
            currencySign: '',
            isEachWay: false,
            isMultipleBetFromDiffRaces: false,
            returns: '0.14',
            isWinning: true,
            selections: [
                {
                    selectionId: '3472372518',
                    selectionName: 'Brave Seasca',
                    eventName: '1:45 Ascot',
                    eventTime: '13:45',
                    eventDate: '2021-12-17',
                    oddsDecimal: 3.3333333333333335,
                    isEachWay: false,
                    oddsFractionalNumerator: 10,
                    oddsFractionalDenominator: 3,
                    eachWayTermsPlaces: null,
                    eachWayTermsNumerator: null,
                    eachWayTermsDenominator: null,
                    result: 'Won',
                },
            ],
        },
    ],
};
