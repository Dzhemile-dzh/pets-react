import {
    GenericErrorInterface,
    BookmakerConfigurationInterface,
    FreeBetInterface,
} from '../shared.types';

export interface BookmakerInterface {
    name: string,
    displayName: string,
    feed: string,
    loginType: string,
    logoutType: string,
    isRecent: boolean,
    lastLoggedInDate: string,
    isLogged: boolean,
    username: string,
    balance: string,
    rawBalance: number,
    loginUrl: string,
    logoutUrl: string,
    freeBets: Array<FreeBetInterface>,
    freeBetBalance: string,
    freeBetExpiryDatetime: string,
    depositDetails: Record<string, unknown>
}

export interface BookmakerAccountsInterface {
    bookmakerConfiguration: Record<string, BookmakerConfigurationInterface>,
    bookmakerSessionsError: GenericErrorInterface,
    bookmakers: Array<BookmakerInterface>,
    isBookmakerSessionsLoading: boolean,
    selectedBookmaker: string,
    totalBalance: string,
    totalFreeBetsBalance: string,
}
