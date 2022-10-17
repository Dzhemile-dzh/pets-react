import { GlideInterface } from './glide.types';
import { FiltersInterface } from './filters.types';
import { BookmakerSessionsInterface } from './bookmakerSessions.types';
import { CardCustomizationInterface } from './cardCustomization.types';
import { RecentBookmakerInterface } from './recentBookmakers.types';
import { BetslipInterface } from './betslip.types';
import { BookmakerDetailsInterface } from './bookmakersDetails.types';
import { RaceObjectInterface } from './races.types';
import { RaceCardsInterface } from './raceCards.types';
import { FirstThreeRaceWinnersObjectInterface } from './firstThreeWinners.types';
import { FavouriteRunnerObjectInterface } from './favouriteRunners.types';
import { RaceOffer } from './bookmakerOffers.types';
import { BetHistoryInterface } from './betHistory.types';
import { HorseProfileInterface } from './horseProfile.types';
import { BookmakerConfigurationInterface } from './bookmakerConfiguration.types';

// TODO:
// Update this according to the redux store
export interface StateInterface {
    bookmakerSessions: BookmakerSessionsInterface;
    cardCustomization: CardCustomizationInterface;
    recentBookmakers: RecentBookmakerInterface[];
    selectedBookmaker: string;
    betslip: BetslipInterface;
    glide: GlideInterface;
    bookmakersDetails: BookmakerDetailsInterface[];
    races: Record<number, RaceObjectInterface> | { key?: never };
    raceCards: Record<string, RaceCardsInterface>;
    firstThreeWinners: Record<string, FirstThreeRaceWinnersObjectInterface>;
    favouriteRunners: Record<string, FavouriteRunnerObjectInterface>;
    bookmakerOffers: Record<string, RaceOffer>;
    betHistory: BetHistoryInterface;
    horseProfile: Record<string, HorseProfileInterface>;
    bookmakerConfiguration: BookmakerConfigurationInterface;
    filters: FiltersInterface;
}
