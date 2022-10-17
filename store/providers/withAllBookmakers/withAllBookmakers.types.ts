import {
    GenericErrorInterface,
    UserBalanceInterface,
    FreeBetInterface,
    BookmakerConfigurationInterface,
} from '../shared.types';

export interface AllBookmakersItemInterface {
    feed: string;
    freeBetBalance: number;
    freeBets: FreeBetInterface[];
    isLoggedIn: boolean;
    loginUrl: string | null;
    logoutUrl: string | null;
    userBalance: UserBalanceInterface | undefined
}

export interface RecentBookmakerInterface {
    bookmaker: string;
    date: string;
}

export interface AllBookmakersInterface {
    allBookmakers: AllBookmakersItemInterface[];
    bookmakerConfiguration: Record<string, BookmakerConfigurationInterface>;
    bookmakerDepositError: Record<string, never> | GenericErrorInterface;
    bookmakerLoginError: Record<string, never> | GenericErrorInterface;
    bookmakerSessionsError: GenericErrorInterface | null
    bookmakersLoading: boolean;
    isBookmakerDepositLoading: boolean;
    isBookmakerSessionsLoading: boolean;
    recentBookmakers: RecentBookmakerInterface[];
}
