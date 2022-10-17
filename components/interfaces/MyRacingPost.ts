import {
    EstimatedReturnsAndStakeInterface,
} from './Betslip';
import { BetReceiptInterface } from './BetReceipt';
import { BetHistoryItemSelectionInterface } from './BetHistory';

export interface SingleBetHistoryItemInterface {
    selectionName?: string,
    oddsFractionalNumerator: number | string,
    oddsFractionalDenominator: number | string,
    eventName?: string,
    eventDate?: string,
    isMobile?: boolean;
    betType: string;
    selectionId?: string;
    result?: string;
}

export interface MultiBetHistoryItemInterface extends
    Omit<EstimatedReturnsAndStakeInterface, 'value'> {
    betType: string,
    numberOfLines: number,
    stakePerLine: string | number,
    showReceipt: boolean,
    selections: Array<BetHistoryItemSelectionInterface>,
    isMultipleBetFromDiffRaces: boolean,
    isRaceDataShown?: boolean,
}

export interface BetHistorySelectionInterface extends SingleBetHistoryItemInterface {
    selectionId: string,
    eventTime: string,
    oddsDecimal: number,
    isEachWay: boolean,
    eachWayTermsPlaces: null | number,
    eachWayTermsNumerator: null | number,
    eachWayTermsDenominator: null | number,
    result: null | string,
}

export interface BetHistoryItemInterface extends
    Omit<EstimatedReturnsAndStakeInterface, 'value'>,
    Omit<BetReceiptInterface, 'betSelections' | 'id' |
    'potentialReturns' | 'status' | 'numberLines'
    | 'freeBetStake'> {
    bookmakerName: string,
    selections: Array<BetHistoryItemSelectionInterface>,
    totalStake: string,
    numberOfLines: number,
    date: string,
    estimatedReturns: string | null,
    isEachWay: boolean,
    time: string,
    showReceipt: boolean,
    isMultipleBetFromDiffRaces?: boolean,
}

export interface MyBetsHistoryItemInterface {
    key: string;
    betId: string;
    bookmakerName: string;
    selection?: BetHistoryItemSelectionInterface;
    totalStake: string;
    betType: string;
    currencySign: string;
    numberOfLines: number;
    stakePerLine: string;
    date: string;
    estimatedReturns: string;
    isEachWay: boolean;
    time: string;
    showReceipt?: boolean;
    breakPoint?: string;
    isMultipleBetFromDiffRaces?: boolean;
    isSettled?: boolean,
    isWinning?: boolean,
    returns?: string,
    isTablet?: boolean,
    selections?: Array<BetHistoryItemSelectionInterface>,
    freeBetStake?: string,
}
