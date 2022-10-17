/* eslint-disable max-len */
import { UserBalanceInterface } from './Betslip';

export interface BetReceiptInterface {
    betId: string,
    betSelections: BetSelectionsInterface,
    betType: string,
    freeBetStake: number,
    id: string,
    numberLines: number,
    potentialReturns: number | string,
    stakePerLine: number,
    status: string,
    betSelectionsCount?: number,
    selectedBookmaker?: string,
    betReceipts?: Array<BetReceiptItemInterface>,
    isBetSlipLoading?: boolean,
    toggleBetslip?: () => void,
    toggleBetReceipt?: () => void,
    clearBetslip?: () => void,
    error?: string,
    userBalance?: UserBalanceInterface,
    priceType?: string;
    clearBetOptions?: () => void,
    buildBet?: () => void;
}

export interface BetReceiptItemInterface {
    id: string,
    betId: string,
    status: string
    stakePerLine: number,
    freeBetStake: number,
    numberLines: number,
    potentialReturns: number,
    betType: string,
    isForecastOrTricastBet: boolean,
    betTypeName: string,
    betSelections: Array<BetReceiptSelectionItemInterface>
}

export interface BetReceiptSelectionItemInterface {
    selectionId: string,
    marketId: string,
    eventId: string
    priceNumerator: number,
    priceDenominator: number,
    isStartingPrice: boolean,
    useBestOddsGuaranteed: boolean,
    displayPrice: string,
}

export interface BetSelectionsInterface {
    displayPrice: {
        decimal: string,
        fractional: string,
    },
    runnerInfo: {
        horseName: string,
        id: string,
        jockeyId: number,
        jockeyName: string,
        ownerId: undefined | number,
        ownerName: undefined | string,
        startPosition: string,
        trainerId: number,
    },
    selectionDetails: {
        selectionId: string,
        useBestOddsGuaranteed: boolean,
    },
    raceInfo: {
        date: string,
        startTime: string,
        meetingName: string,
        eachWayData: {
            places: string,
            payOut: string,
        },
    },
    error: string,
}

export interface MultipleSelectionInterface {
    horseName: string,
    runnerNumber: string,
    date: string,
    startTime: string,
    meetingName: string,
    useBestOddsGuaranteed: boolean,
    isStartingPrice: boolean,
    displayPrice: string,
}

export interface SingleReceiptItemInterface extends BetReceiptInterface, MultipleSelectionInterface {
    currency: string,
    places: string,
    payOut: string,
    startPosition: string,
    isEachWay: boolean,
    stake: string,
}

export interface MultipleReceiptItemInterface {
    betId: string,
    betType: string,
    currency: string,
    numberLines: number,
    freeBetStake: number,
    stake: string,
    potentialReturns: string,
    multipleSelections: MultipleSelectionInterface[],
}
