import { GenericErrorInterface } from '@store/providers/shared.types';

import { BookmakerFreeBetInterface } from './shared.types';

export interface BookmakerItemAccountInterface {
    username: string;
    expiryDatetime: string;
    accountCurrency: string;
    accountBalance: number;
    bonusBalance: number;
    totalBalance: number;
    freeBetBalance: number;
    freeBets: BookmakerFreeBetInterface[];
}

export interface BookmakerSessionInterface {
    name: string;
    feed: string;
    displayName: string;
    availableOnPhone: boolean;
    loginType: string;
    logoutType: string;
    isSupportingBetHistory: boolean;
    isLoggedIn: boolean;
    account: BookmakerItemAccountInterface;
}

export interface BookmakerSessionsInterface {
    isBookmakerSessionsLoading: boolean;
    bookmakerSessionsError: GenericErrorInterface | null
    sessionBookmakersList: BookmakerSessionInterface[];
    bookmakerLoginError: GenericErrorInterface;
    bookmakerDepositError: GenericErrorInterface;
    isBookmakerDepositLoading: boolean;
}
