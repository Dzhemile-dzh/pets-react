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

export interface RaceOffer {
    hasOffers: boolean;
    offers: Array<BookmakerOffer>;
}
