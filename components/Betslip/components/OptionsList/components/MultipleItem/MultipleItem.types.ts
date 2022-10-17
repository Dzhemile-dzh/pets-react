import { GenericErrorInterface, UserBalanceInterface } from '@store/providers/shared.types';
import { BetOptionUiInterface } from '@store/providers/withBetSlip/withBetSlip.types';
import { Dispatch } from 'react';

export interface MultipleBetItemSelection {
    runnerNumber: string;
    horseName: string;
    priceNumerator: number | string;
    priceDenominator: number | string;
    isWinOnly?: boolean;
    id: string;
    optionId: string;
    eventName?: string;
    result?: string;
}

export interface MultipleItemInterface {
    selectOption: Dispatch<string | null>;
    openModalForSpecificOption: (optionId: string) => void,
    selectedOption: string;
    areFreeBetsAvailable: boolean;
    areAllFreeBetsSelected: boolean;
    error: GenericErrorInterface;
    betOptionUi: BetOptionUiInterface;
    numberLines: number;
    multipleBetItemSelections: MultipleBetItemSelection[];
    isStartingPrice: boolean;
    useBestOddsGuaranteed: boolean;
    includedInMultipleSelections: Record<string, boolean>;
    betTypeName: string;
    optionId: string;
    userBalance: UserBalanceInterface;
    isSelectionEditable: boolean;
    betTypeDesc: string;
    freeBetId: string | null;
}
