/* eslint-disable max-len */
const bookmakerData = {
    bookmakerDepositLimits: 'https://responsiblegambling.bet365.com/stay-in-control/limit-your-account/#dl',
    bookmakerSelfExclusion: 'https://responsiblegambling.bet365.com/stay-in-control/self-exclusion',
    bookmakerTermsConditions: 'https://help.bet365.com/en/terms-and-conditions',
    bookmakerTimeOut: 'https://responsiblegambling.bet365.com/stay-in-control/time-out',
    compliance: 'Best Odds Guaranteed. Take a price and if the starting price is bigger',
    forgottenUrl: '',
    isOfferShownOnce: false,
    linkText: 'CLAIM THIS OFFER',
    offer: 'Up to £100 in Bet Credits',
    altOffer: '',
    signUpLink1: 'https://www.bet365.com/olp/racing-post/?affiliate=365_01021779',
    signUpLink2: 'https://www.bet365.com/olp/racing-post/?affiliate=365_01021780',
    signUpLink3: 'https://www.bet365.com/olp/racing-post/?affiliate=365_01021781',
    signUpLink4: 'https://www.bet365.com/olp/racing-post/?affiliate=365_01021782',
    signUpLink5: 'https://www.bet365.com/olp/racing-post/?affiliate=365_01021782',
    tsAndCs: 'Up to £100 in Bet Credits for new customers at bet365. Min deposit £5.',
}
const bookmakerDataWithAltOffer = {
    bookmakerDepositLimits: 'https://responsiblegambling.bet365.com/stay-in-control/limit-your-account/#dl',
    bookmakerSelfExclusion: 'https://responsiblegambling.bet365.com/stay-in-control/self-exclusion',
    bookmakerTermsConditions: 'https://help.bet365.com/en/terms-and-conditions',
    bookmakerTimeOut: 'https://responsiblegambling.bet365.com/stay-in-control/time-out',
    compliance: 'Best Odds Guaranteed. Take a price and if the starting price is bigger',
    forgottenUrl: '',
    isOfferShownOnce: false,
    linkText: 'CLAIM THIS OFFER',
    offer: 'Up to £100 in Bet Credits',
    altOffer: 'ALT offer',
    signUpLink1: 'https://www.bet365.com/olp/racing-post/?affiliate=365_01021779',
    signUpLink2: 'https://www.bet365.com/olp/racing-post/?affiliate=365_01021780',
    signUpLink3: 'https://www.bet365.com/olp/racing-post/?affiliate=365_01021781',
    signUpLink4: 'https://www.bet365.com/olp/racing-post/?affiliate=365_01021782',
    signUpLink5: 'https://www.bet365.com/olp/racing-post/?affiliate=365_01021782',
    tsAndCs: 'Up to £100 in Bet Credits for new customers at bet365. Min deposit £5.',
}

const bookmakerConfigurationItem = {
    desktop: bookmakerData,
    mobile: bookmakerData,
}

const bookmakerConfigurationItemWithAltOffer = {
    desktop: bookmakerDataWithAltOffer,
    mobile: bookmakerDataWithAltOffer,
}

export const bookmakerConfiguration = {
    bet365: bookmakerConfigurationItemWithAltOffer,
    betfair: bookmakerConfigurationItemWithAltOffer,
    betway: bookmakerConfigurationItemWithAltOffer,
    coral: bookmakerConfigurationItemWithAltOffer,
    ladbrokes: bookmakerConfigurationItem,
    paddypower: bookmakerConfigurationItem,
    skybet: bookmakerConfigurationItem,
    williamhill: bookmakerConfigurationItem,
};

export const bookmakerNames = [
    'bet365',
    'betfair',
    'coral',
    'ladbrokes',
    'paddypower',
    'skybet',
    'williamhill',
];
