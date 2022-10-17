import { Dispatch } from 'react';
import { BetOptionInterface } from '@store/providers/withBetSlip';
import { UserBalanceInterface, BetSelectionInterface } from '@store/providers/shared.types';
import { BookmakerDetailsInterface } from '@components/interfaces/Store.types';

export interface MultiplesInterface {
    multipleBetOptions: BetOptionInterface[];
    userBalance: UserBalanceInterface | null,
    setSelectedOption: Dispatch<string | null>;
    openModalForSpecificOption: (optionId: string) => void,
    selectedOption: string;
    betSelections: Record<string, BetSelectionInterface>;
    betOptions: BetOptionInterface[];
    bookmakerConfig: BookmakerDetailsInterface;
    areFreeBetsAvailable: boolean;
    areAllFreeBetsSelected: boolean;
}
