export interface GenericErrorInterface {
    type: string;
    message: string;
}

export interface UserBalanceInterface{
    balance: number;
    currencySign: string;
    formattedBalance: string;
}

export interface FreeBetInterface {
    id: string,
    type: string,
    amount: number,
    description: string,
    expiry: string,
    minStake: number,
    maxStake: number,
    betOptionId: string | null,
}

export interface BookmakerOffer {
    bookmakerDepositLimits: string;
    bookmakerSelfExclusion: string;
    bookmakerTermsConditions: string;
    bookmakerTimeOut: string;
    compliance: string;
    forgottenUrl: string;
    isOfferShownOnce: boolean;
    linkText: string;
    offer: string;
    signUpLink1: string;
    signUpLink2: string;
    signUpLink3: string;
    signUpLink4: string;
    signUpLink5: string;
    tsAndCs: string;
}

export interface BookmakerConfigurationInterface {
    desktop: BookmakerOffer;
    mobile: BookmakerOffer
}

export interface DisplayPriceInterface {
    decimal: string;
    fractional: string;
}

export interface TimeObjectInterface {
    raceDate: string;
    raceDateTime: string;
    raceTime: string;
}

export interface BetSelectionRaceInfoInterface {
    countryCode: string;
    date: string;
    diffusionMeetingName: string;
    eachWayData: {
        fractional: {
            denominator: number;
            numerator: number;
        };
        isWinOnly: boolean;
        payOut: string;
        places: string;
    };
    id: string;
    localTime: TimeObjectInterface;
    meetingId: string;
    meetingName: string;
    raceLocalTime: TimeObjectInterface;
    raceTitle: string;
    startTime: string;
    utcTime: TimeObjectInterface;
}

export interface BetSelectionRunnerInfoInterface {
    horseName: string;
    id: string;
    isFav: boolean;
    jockeyId: number;
    jockeyName: string;
    ownerId: number;
    ownerName: string;
    startPosition: string;
    trainerId: number;
    trainerName: string;
}

export interface SelectionDetailsInterface {
    eventId: string;
    isStartingPrice: boolean
    marketId: string;
    priceDenominator: number;
    priceNumerator: number;
    selectionId: string;
    useBestOddsGuaranteed: boolean;
}

export interface BetSelectionInterface {
    displayPrice: DisplayPriceInterface;
    raceInfo: BetSelectionRaceInfoInterface;
    runnerInfo: BetSelectionRunnerInfoInterface;
    selectionDetails: SelectionDetailsInterface;
    error: GenericErrorInterface | undefined;
}
