import { BetSelectionInterface } from '../shared.types';

export interface PriceDataInterface {
    decimal: {
        odd: string;
        historical: string[];
    };
    duplicateMarketId: string;
    eventId: string;
    fractional: {
        denominator: number;
        numerator: number;
        historical: string[];
        odd: string;
    }
    isFav: boolean;
    marketId: string;
    outcomeId: string;
    priceId: string;
    selectionId: string;
    status: string;
}

export interface OddInterface {
    isDiffusionLoaded: boolean;
    isInBetslip: boolean;
    priceType: string;
    showOdds: boolean;
    priceData: PriceDataInterface | null;
    betSelection: BetSelectionInterface | null;
}
