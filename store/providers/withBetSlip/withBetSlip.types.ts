import {
    GenericErrorInterface,
    UserBalanceInterface,
    FreeBetInterface,
    BetSelectionInterface,
} from '../shared.types';

export interface ReturnsInterface {
    currencySign: string;
    value: string;
}

export interface BetOptionUiInterface {
    freeBetStake: number;
    isEWSelected: boolean;
    isFbSelected: boolean;
    isSpSelected: boolean;
    stake: number;
    estimatedReturns: ReturnsInterface;
}

export interface BetOptionInterface {
    betSelections: string[];
    betType: string;
    betTypeName: string;
    error: GenericErrorInterface | null;
    id: string;
    isEditable: boolean;
    isMultipleBetFromDiffRaces: boolean;
    isOnlyViewable: boolean;
    maxStake: string | null;
    minStake: string | null;
    multipleBetSelections: Record<string, boolean>;
    numberLines: number;
    positionSwitcherActive: boolean;
    ui: BetOptionUiInterface;
    freeBetId: string | null;
}

export interface BetReceiptSelectionInterface {
    eventId: string;
    isStartingPrice: boolean;
    marketId: string;
    priceDenominator: number;
    priceNumerator: number;
    selectionId: string;
    useBestOddsGuaranteed: boolean;
}

export interface BetReceiptInterface {
    betId: string;
    betSelections: BetReceiptSelectionInterface[]
    betType: string;
    betTypeName: string;
    freeBetStake: number;
    id: string;
    isEachWay: boolean;
    isForecastOrTricastBet: boolean;
    numberLines: number;
    potentialReturns: number;
    stakePerLine: number;
    status: string;
}

export interface UserSessionInterface {
    account: {
        accountBalance: number;
        accountCurrency: string;
        bonusBalance: number;
        expiryDatetime: string;
        freeBetBalance: number;
        freeBets: FreeBetInterface[];
        totalBalance: number;
        username: string;
    }
    availableOnPhone: boolean;
    displayName: string;
    feed: string;
    isLoggedIn: boolean;
    isSupportingBetHistory: boolean;
    loginType: string;
    logoutType: string;
    name: string;
}

export interface BetslipInterface {
    betOptions: BetOptionInterface[];
    betReceipts: BetReceiptInterface[];
    betSelections: Record<string, BetSelectionInterface>;
    betSelectionsCount: number;
    betSlipError: GenericErrorInterface | null;
    canPlaceBet: boolean;
    combinedStake: ReturnsInterface;
    freeBetStrapHiddenTimeStamp: string | null;
    freeBets: FreeBetInterface[];
    isBetSlipLoading: boolean;
    isBettingAllowed: boolean;
    priceType: string;
    selectedBookmaker: string;
    singeLinesCount: number;
    totalEstimatedReturns: ReturnsInterface;
    totalFreeBetsStake: ReturnsInterface;
    totalStake: ReturnsInterface;
    userBalance: UserBalanceInterface | null;
    userSession: UserSessionInterface | null;
}
