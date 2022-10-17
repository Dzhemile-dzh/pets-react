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

export interface BookmakerConfigurationInterface {
    isBookmakerConfigsLoading: boolean;
    bookmakerConfigsError: string | null;
    bookmakerConfigs: Record<string, BookmakerConfigurationItemInterface>;
}
