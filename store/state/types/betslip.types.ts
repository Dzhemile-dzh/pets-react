import { GenericErrorInterface, BetSelectionInterface } from '@store/providers';

import { BookmakerFreeBetInterface } from './shared.types';

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

export interface BetReceiptItemBetSelection {
    selectionId: string;
    marketId: string;
    eventId: string;
    priceNumerator: number;
    priceDenominator: number;
    isStartingPrice: boolean;
    useBestOddsGuaranteed: boolean;
}

export interface BetReceiptItemInterface {
    id: string;
    betId: string;
    status: string;
    stakePerLine: number;
    freeBetStake: number;
    numberLines: number;
    potentialReturns: number;
    betType: string;
    isForecastOrTricastBet: boolean;
    betTypeName: string;
    isEachWay: boolean;
    betSelections: BetReceiptItemBetSelection[]
}

export interface BetslipBetInterface {
    betOptions: BetOptionInterface[],
    betReceipts: BetReceiptItemInterface[],
    freeBets: BookmakerFreeBetInterface[],
    meta: null,
    isBetSlipLoading: boolean,
    canPlaceBet: boolean,
    betSlipError: GenericErrorInterface,
    isBettingAllowed: boolean,
}

export interface BetslipInterface {
    bet: BetslipBetInterface;
    betSelections: Record<string, BetSelectionInterface>;
}
