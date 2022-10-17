import {
    RaceCardsProviderInterface,
    RaceOffersProviderInterface,
    FirstThreeWinnersProviderInterface,
} from './Providers';

export interface RaceIndexInterface extends Omit<RaceCardsProviderInterface, 'raceCardsData' |
'isRaceCardsLoading' | 'raceCardsError' |
'getRaceCards' | 'getBookmakerConfigurations'>,
    RaceOffersProviderInterface,
    Omit<FirstThreeWinnersProviderInterface,
    'getFirstThreeWinners' | 'stopFastResults' | 'subscribeForFastResult'> {}
