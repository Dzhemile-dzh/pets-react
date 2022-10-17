import { RaceCardsObjectInterface } from '@components/interfaces';

interface RaceCardsInterface {
    raceCardsData: RaceCardsObjectInterface;
    isRaceCardsLoading: boolean;
    raceCardsError?: string;
}

export const isRaceCardsLoaded = (raceCards : RaceCardsInterface) : boolean => {
    return typeof raceCards?.isRaceCardsLoading !== 'undefined' && (
        !raceCards?.isRaceCardsLoading)
}
