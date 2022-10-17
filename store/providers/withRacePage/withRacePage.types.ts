import { CardCustomizationInterface } from '@store/state/types/cardCustomization.types';
import { RaceInterface } from '@store/state/types/races.types';

export interface RacePage {
    racePageData: RaceInterface;
    racePageError: string | null;
    isRacePageLoading: boolean;
    cardCustomization: CardCustomizationInterface;
}
