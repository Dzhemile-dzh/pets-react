import {
    FiltersInterface,
    RaceCardsObjectInterface,
    RaceCardsRaceInterface,
} from './RaceCards';
import {
    BookmakerConfigurationItemInterface,
    BookmakerInterface,
} from './Bookmaker';

import {
    CardCustomizationInterface,
    RaceOffer,
} from './Race';

import {
    FavouriteRunnersObjectInterface,
    FirstThreeWinnersObjectInterface,
} from './Runner';
import {
    BetOptionInterface,
    BetSelectionInterface,
    BetslipEstimatedReturnInterface,
    UserBalanceInterface,
    UserSessionInterface,
} from './Betslip';
import { BetReceiptInterface } from './BetReceipt';

import { Last14Days } from './HorseProfile';
import { UnsettledBetHistoryInterface } from './BetHistory';
import {
    getGlideTaxonomyCollectionInputInterface,
    GlideContentInterface,
    TemplateInterface,
    MenuInterface,
} from './Glide';

export interface NextThreeRacesProviderInterface {
    getNextThreeRaces: (countryCodes?: Array<string>) => void;
    isNextThreeRacesLoading: boolean;
    nextThreeRacesData: Array<RaceCardsRaceInterface>;
}

export interface RaceCardsProviderInterface {
    raceCardsData: RaceCardsObjectInterface;
    isRaceCardsLoading: boolean;
    raceCardsError?: string;
    getRaceCards: (date: string) => void;
    getBookmakerConfigurations: () => void;
    fetchRaceCards: (date: string, filterGBRaces?: boolean) => void;
    raceCards: Record<string, {
        raceCardsData: RaceCardsObjectInterface;
        isRaceCardsLoading: boolean;
        raceCardsError?: string;
    }>;
    setRaceAsNow: (date: string, raceId: string) => void;
}

export interface RacePageProviderInterface {
    racePageData: RaceCardsRaceInterface,
    isRacePageLoading: boolean,
    racePageError: string,
    cardCustomization: CardCustomizationInterface
}

export interface FiltersProviderInterface {
    filters: FiltersInterface;
    setRaceTypeFilter: (value: string) => void;
    setHandicapFilter: (value: string) => void;
    setRaceStatusFilter: (value: string) => void;
    setCourseFilter: (value: string) => void;
    stopFastResults: () => void;
    subscribeForFastResult: () => void;
}

export interface FirstThreeWinnersProviderInterface {
    getFirstThreeWinners: () => void;
    stopFastResults: () => void;
    subscribeForFastResult: () => void;
    firstThreeWinners: FirstThreeWinnersObjectInterface;
}

export interface FavouriteRunnerProviderInterface {
    favouriteRunners: FavouriteRunnersObjectInterface;
}

export interface BetslipProviderInterface extends BetslipEstimatedReturnInterface {
    betOptions: Array<BetOptionInterface> | [],
    betReceipts: Array<BetReceiptInterface> | [],
    betSelections: BetSelectionInterface | [],
    betSlipError: string | null,
    isBetSlipLoading: string;
    isBettingAllowed: string;
    priceType: string;
    selectedBookmaker: string;
    singeLinesCount: number;
    userBalance: UserBalanceInterface;
    userSession: UserSessionInterface;
}

export interface RaceOffersProviderInterface {
    raceOffers: Record<string, RaceOffer>;
    isRaceOffersLoading: boolean;
    raceOffersError?: string;
    getRaceOffersByDate: (date: Date) => void;
}

export interface HorseProfileOverviewProviderInterface {
    overview: {
        data: {
            horseName: string;
            horseCountry: string;
            silkUrl: string;
            horseAge: string;
            horseSex: string;
            trainerName: string;
            ownerName: string;
            trainerLast14Days: Last14Days;
            ownerLast14Days: Last14Days;
            birthDate: string;
            horseColour: string;
            horseProfileUrl: string;
        },
        isLoading: boolean;
        error: string | null;
    };
}

export interface BookmakerAccountProviderInterface {
    bookmakerConfiguration: Record<string, BookmakerConfigurationItemInterface>,
    bookmakerSessionsError: {
        message: string,
        type: string,
    },
    bookmakers: Array<BookmakerInterface>,
    isBookmakerSessionsLoading: boolean,
    selectedBookmaker: string,
    totalBalance: string,
    totalFreeBetsBalance: string,

    bookmakerUserActive: () => void,
    bookmakerUserInfo: () => void,
    clearBookmakerLoginError: () => void,
    fetchBookmakerCardInformation: () => void,
    setSelectedBookmaker: (value: string) => void,
    updateSelectedBookmaker: () => void,
    urlLoginSuccess: () => void,
    urlLogoutSuccess: () => void,
    bookmakerLogin: () => void
    bookmakerLoginError: () => void,
    bookmakerLogout: () => void,
}

export interface BetHistoryProviderInterface {
    unsettledBetHistory: UnsettledBetHistoryInterface;
}

export interface GlideProviderInterface {
    getGlideCollection: (collectionId: number) => void;
    getGlideAuthor: (authorId: number) => void;
    getGlideTaxonomyCollection: (input: getGlideTaxonomyCollectionInputInterface) => void;
    template: TemplateInterface;
    content: GlideContentInterface;
    menus: Record<string, MenuInterface>;
    isInitialized: boolean;
}

export interface FastResultsProviderInterface {
    stopFastResults: () => void;
    subscribeForFastResult: () => void;
}
