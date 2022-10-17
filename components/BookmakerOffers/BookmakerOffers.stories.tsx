import React from 'react';
import { BookmakerOffersList } from './BookmakerOffersList';
import { BookmakerOffersAccordion } from './BookmakerOffersAccordion';
import { bookmakerConfiguration, bookmakerNames } from './tests/BookmakerOffers.testData';

// NOTE:
// Styles are applied based on breakpoint
// When you want to view tablet/mobile offers click "tablet" OR "mobile" in storybook and
// resize the canvas

export default {
    component: BookmakerOffersList,
    title: 'BookmakerOffers/BookmakerOffers',
}

export const Desktop = () => (
    <BookmakerOffersList
        bookmakerConfiguration = {bookmakerConfiguration}
        bookmakerNames = {bookmakerNames}
    />
)

export const Tablet = () => (
    <BookmakerOffersAccordion
        bookmakerConfiguration = {bookmakerConfiguration}
        bookmakerNames = {bookmakerNames}
        isMobile = {false}
    />
)

export const Mobile = () => (
    <BookmakerOffersAccordion
        bookmakerConfiguration = {bookmakerConfiguration}
        bookmakerNames = {bookmakerNames}
        isMobile
    />
)
