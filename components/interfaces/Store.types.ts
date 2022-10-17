import { Store } from 'redux';
import { Task } from 'redux-saga'
import {
    BookmakerBetHistoryUrlsInterface,
    SettledBetHistoryInterface,
    UnsettledBetHistoryInterface,
} from './BetHistory';
import { BetReceiptItemInterface } from './BetReceipt';
import { BetOptionInterface, BetSelectionInterface } from './Betslip';
import { BookmakerConfigurationItemInterface, BookmakerInterface } from './Bookmaker';
import {
    ArticleObjectInterface,
    AuthorObjectInterface,
    CollectionObjectInterface,
    GlideImagesObjectInterface,
    LayoutInterface,
    MenuItemInterface,
    PromoArticleInterface,
    TaxonomyCollectionObjectInterface,
    TemplateInterface,
    WidgetInterface,
} from './Glide';
import { Last14Days } from './HorseProfile';
import {
    CardCustomizationInterface,
    RaceObjectInterface,
    RaceOffer,
    NextUKOnlyRaceInterface,
} from './Race';
import { RaceCardsObjectInterface } from './RaceCards';
import { FirstThreeRaceWinnersObjectInterface } from './Runner';

export interface SagaStore extends Store {
    sagaTask?: Task;
}

interface GenericErrorInterface {
    type: string;
    message: string;
}

interface BookmakerSessionsInterface {
    isBookmakerSessionsLoading: boolean;
    bookmakerSessionsError: GenericErrorInterface;
    sessionBookmakersList: BookmakerInterface[];
    bookmakerLoginError: GenericErrorInterface;
    bookmakerDepositError: GenericErrorInterface;
    isBookmakerDepositLoading: boolean;
}

interface RecentBookmakerInterface {
    bookmaker: string;
    date: string;
}

interface BetslipBetInterface {
    betOptions: BetOptionInterface[],
    betReceipts: BetReceiptItemInterface[],
    freeBets: [],
    meta: null,
    isBetSlipLoading: boolean,
    canPlaceBet: boolean,
    betSlipError: GenericErrorInterface,
    isBettingAllowed: boolean,
}

interface BetslipInterface {
    bet: BetslipBetInterface;
    betSelections: Record<string, BetSelectionInterface>;
}

interface PageInterface {
    id: number;
    template_id: number;
}

interface RouteInterface {
    id: number;
}

interface GlideInterface {
    layouts: Record<string, LayoutInterface>;
    widgets: Record<string, WidgetInterface>;
    collections: Record<number, CollectionObjectInterface>;
    promoArticles: Record<number, PromoArticleInterface>;
    images: Record<string, GlideImagesObjectInterface>;
    authors: Record<number, AuthorObjectInterface>;
    taxonomyCollections: Record<string, TaxonomyCollectionObjectInterface>;
    articles: Record<number, ArticleObjectInterface>;
    articleTypes: Record<string, number>;
    isInitialized: boolean;
    pages: Record<number, PageInterface>;
    routes: Record<number, RouteInterface>;
    templates: Record<number, TemplateInterface>;
    menus: Record<string, MenuItemInterface[]>;
}

export interface BookmakerDetailsInterface {
    name: string;
    feed: string;
    displayName: string;
    availableOnPhone: boolean;
    loginType: string;
    logoutType: string;
    isSupportingBetHistory: boolean;
}

interface RaceCardsInterface {
    isRaceCardsLoading: boolean;
    raceCardsError: string;
    raceCardsData: RaceCardsObjectInterface;
}

interface BetHistoryInterface {
    unsettled: UnsettledBetHistoryInterface;
    settled: SettledBetHistoryInterface;
    urls: BookmakerBetHistoryUrlsInterface;
}

interface HorseProfileInterface {
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

interface BookmakerConfigurationInterface {
    isBookmakerConfigsLoading: boolean;
    bookmakerConfigsError: string | null;
    bookmakerConfigs: Record<string, BookmakerConfigurationItemInterface>;
}

interface FiltersInterface {
    date: string;
    raceStatus: string;
    courses: string[];
    raceType: string;
    isHandicap: boolean;
}

interface FavouriteRunnerInterface {
    uid: string;
    silkUrl: string;
    saddleClothNumber: string;
    draw: string;
    trainerName: string;
    trainerId: number;
    jockeyName: string;
    jockeyId: number;
    countryCode: string;
    horseName: string;
    runnerFeed: string;
    horseProfileUrl: string;
}

interface FavouriteRunnerObjectInterface {
    data: FavouriteRunnerInterface,
    error: string;
    isLoading: boolean;
}

export interface StateInterface {
    bookmakerSessions: BookmakerSessionsInterface;
    cardCustomization: CardCustomizationInterface;
    recentBookmakers: RecentBookmakerInterface[];
    selectedBookmaker: string;
    betslip: BetslipInterface;
    glide: GlideInterface;
    bookmakersDetails: BookmakerDetailsInterface[];
    races: Record<number, RaceObjectInterface>;
    raceCards: Record<string, RaceCardsInterface>;
    firstThreeWinners: Record<string, FirstThreeRaceWinnersObjectInterface>;
    favouriteRunners: Record<string, FavouriteRunnerObjectInterface>;
    bookmakerOffers: Record<string, RaceOffer>;
    betHistory: BetHistoryInterface;
    horseProfile: Record<string, HorseProfileInterface>;
    bookmakerConfiguration: BookmakerConfigurationInterface;
    filters: FiltersInterface;
    nextUKOnlyRace: NextUKOnlyRaceInterface;
}
