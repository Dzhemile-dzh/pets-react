import { Dispatch } from 'react';
import { BetOptionInterface } from '@store/providers/withBetSlip';
import { UserBalanceInterface, BetSelectionInterface } from '@store/providers/shared.types';
import { BookmakerDetailsInterface } from '@components/interfaces/Store.types';

export interface SinglesInterface {
    singeLinesCount: number;
    priceType: string;
    singleBetOptions: BetOptionInterface[];
    betSelections: Record<string, BetSelectionInterface>;
    setSelectedOption: Dispatch<string | null>;
    selectedOption: string | null,
    userBalance: UserBalanceInterface | null,
    bookmakerConfig: BookmakerDetailsInterface,
    betSelectionsCount: number,
    areFreeBetsAvailable: boolean,
    areAllFreeBetsSelected: boolean,
    openModalForSpecificOption: (optionId: string) => void,
    toggleBetslip: () => void,
}
