import { FreeBetInterface } from './Bookmaker';

export interface ErrorPropsInterface {
    type: string,
    message: string,
}

export interface ErrorInterface {
    error: ErrorPropsInterface | null,
}

export interface BetOptionInterface {
    id: string,
    betType: string,
    numberLines: number,
    minStake: number | null,
    maxStake: number | null,
    betSelections: Array<string>,
    betTypeName: string,
    ui: {
        stake: number,
        freeBetStake: number,
        isEWSelected: boolean,
        isSpSelected: boolean,
        isFbSelected: boolean,
        estimatedReturns: {
            currencySign: string;
            value: string;
        }
    },
    error: string | null,
    multipleBetSelections: Record<string, boolean>,
    isEditable: boolean,
    isOnlyViewable: boolean,
    freeBetId: string | null,
}

export interface BetSelectionInterface {
    displayPrice: {
        decimal: string,
        fractional: string,
    },
    raceInfo: {
        date: string,
        diffusionMeetingName: string,
        eachWayData: {
            fractional: {
                denominator: string,
                numerator: string,
            },
            isWinOnly: boolean,
            payOut: string,
            places: string,
        },
        id: string,
        localTime: {
            raceDate: string,
            raceDateTime: string,
            raceTime: string,
        },
        meetingId: string,
        meetingName: string,
        raceTitle: string,
        startTime: string,
        utcTime: {
            raceDate: string,
            raceDateTime: string,
            raceTime: string,
        },
    },
    runnerInfo: {
        horseName: string,
        id: string,
        jockeyName: string,
        startPosition: string,
        trainerName: string,
    },
    selectionDetails: {
        eventId: string,
        isStartingPrice: boolean,
        marketId: string,
        priceDenominator: number,
        priceNumerator: number,
        selectionId: string,
        useBestOddsGuaranteed: boolean,
    }
}

export interface EstimatedReturnsAndStakeInterface {
    currencySign: string,
    value: string,
}

export interface UserBalanceInterface {
    balance: number,
    currencySign: string,
    formattedBalance: string,
}

export interface UserSessionInterface {
    account: {
        accountBalance: string,
        accountCurrency: string,
        bonusBalance: number,
        expiryDatetime: string,
        freeBetBalance: number,
        freeBets: Array<string>,
        totalBalance: string,
        username: string,
    },
    availableOnPhone: boolean,
    displayName: string,
    feed: string,
    isLoggedIn: boolean,
    isSupportingBetHistory: boolean,
    loginType: string,
    logoutType: string,
    name: string,
}

export interface FreeBetSelectionInterface {
    optionId: string;
    freeBetId: string;
    freeBetStake: number;
    areFreeBetsAvailable: boolean;
    areAllFreeBetsSelected: boolean;
    isStraightLineBet?: boolean;
    openModalForSpecificOption: (betId: string) => void;
}

// SingleItem interface
export interface SingleItemInterface extends ErrorInterface {
    betSelectionIds: Array<string>,
    bookmakerName: string,
    displayPrice: string,
    eachWayData: {
        isWinOnly: boolean,
        payOut: string,
        places: string,
    },
    estimatedReturns: EstimatedReturnsAndStakeInterface,
    horseName: string,
    isEWSelected: boolean,
    isMobile: boolean,
    isSpSelected: boolean,
    isStartingPrice: boolean,
    meetingName: string,
    optionId: string,
    runnerId: string,
    selectedOption: string,
    selectOption: (optionId: string) => void,
    selectionError: ErrorPropsInterface | null,
    stake: number,
    startPosition: string,
    startTime: string,
    useBestOddsGuaranteed: boolean,
    moreSelectionData: {
        meetingName: string,
        meetingId: string,
        horseName: string,
        horseId: string,
        useBestOddsGuaranteed: boolean,
        oddsDecimal: string,
        raceId: string,
        localTime: {
            raceDate: string,
            raceDateTime: string,
            raceTime: string,
        },
        raceLocalTime: {
            raceDate: string,
            raceDateTime: string,
            raceTime: string,
        },
    },
}

export interface MultipleItemInterface extends ErrorInterface {
    betTypeName: string,
    betTypeDesc: string,
    bookmakerName: string,
    estimatedReturns: EstimatedReturnsAndStakeInterface,
    isEWSelected: boolean,
    isMobile: boolean,
    isSelectionEditable?: boolean,
    isStartingPrice: boolean,
    numberLines: number,
    optionId: string,
    selectedOption: string,
    selectOption: (optionId: string) => void,
    stake: number,
    useBestOddsGuaranteed: boolean,
    includedInMultipleSelections?: Record<string, boolean> | boolean,
}

export interface MultipleItemSelectionInterface {
    multipleBetItemSelections: {
        horseName: string,
        runnerNumber?: number,
        priceNumerator: number | string,
        priceDenominator: number | string,
        isWinOnly?: boolean,
        optionId?: string,
        id: string,
        result?: string,
        eventName?: string,
    }[],
}

export interface BetOptionsInterface {
    bookmakerName: string;
    betSelectionsCount: number;
}

export interface BetslipEstimatedReturnInterface extends BetOptionsInterface, ErrorInterface {
    combinedStake: EstimatedReturnsAndStakeInterface;
    totalEstimatedReturns: EstimatedReturnsAndStakeInterface;
    totalFreeBetsStake: EstimatedReturnsAndStakeInterface;
    totalStake: EstimatedReturnsAndStakeInterface;
    selectedOption: string;
    toggleBetReceipt: () => void;
    selectionError: ErrorPropsInterface | null;
    canPlaceBet: boolean;
    freeBets: FreeBetInterface[],
}
