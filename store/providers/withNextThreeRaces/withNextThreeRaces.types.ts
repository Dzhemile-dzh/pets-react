import { RaceCardsRaceInterface } from '@store/state/types/raceCards.types';

export interface NextThreeRaces {
    isNextThreeRacesLoading: boolean;
    nextThreeRacesData: RaceCardsRaceInterface[];
}
