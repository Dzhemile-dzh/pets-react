import {
    GenericErrorInterface,
    UserBalanceInterface,
    BetSelectionRunnerInfoInterface,
    BetSelectionRaceInfoInterface,
    DisplayPriceInterface,
    SelectionDetailsInterface,
} from '@store/providers/shared.types';
import {
    BetOptionUiInterface,
} from '@store/providers/withBetSlip/withBetSlip.types';
import { Dispatch } from 'react';

export interface SingleItemInterface {
    optionId: string;
    runnerInfo: BetSelectionRunnerInfoInterface;
    raceInfo: BetSelectionRaceInfoInterface;
    betSelectionsCount: number;
    bookmakerName: string;
    betOptionUi: BetOptionUiInterface;
    displayPrice: DisplayPriceInterface;
    priceType: string;
    selectionDetails: SelectionDetailsInterface;
    selectionError: GenericErrorInterface;
    error: GenericErrorInterface;
    betSelectionIds: string[];
    selectOption: Dispatch<string>;
    selectedOption: string;
    userBalance: UserBalanceInterface;
    freeBetId: string | null;
    areAllFreeBetsSelected: boolean;
    areFreeBetsAvailable: boolean;
    openModalForSpecificOption: (optionId: string) => void;
}
