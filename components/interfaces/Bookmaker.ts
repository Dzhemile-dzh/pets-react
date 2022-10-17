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

export interface BookmakerOffer {
    publish_time: string;
    bookmaker_bet_offers_uid: number;
    bookmaker_uid: number;
    bet_offer_name: string;
    bet_offer_mobile: boolean;
    bet_offer_desktop: boolean;
    default_publish_time: string;
    bet_offer_link: string;
    bet_offer_description: string;
    bet_offer_terms_link: string;
    bet_offer_terms: string;
}

export interface BookmakerConfigurationItemDataInterface {
    bookmakerDepositLimits: string,
    bookmakerSelfExclusion: string,
    bookmakerTermsConditions: string,
    bookmakerTimeOut: string,
    compliance: string,
    forgottenUrl: string,
    isOfferShownOnce: boolean,
    linkText: string,
    offer: string,
    altOffer: string,
    signUpLink1: string,
    signUpLink2: string,
    signUpLink3: string,
    signUpLink4: string,
    signUpLink5: string,
    tsAndCs: string,
}

export interface BookmakerConfigurationItemInterface {
    desktop: BookmakerConfigurationItemDataInterface,
    mobile: BookmakerConfigurationItemDataInterface,
}

export interface FreeBetInterface {
    id: string,
    type: string,
    amount: number,
    description: string,
    expiry: string,
    minStake: number,
    maxStake: number,
    betOptionId?: string,
}
