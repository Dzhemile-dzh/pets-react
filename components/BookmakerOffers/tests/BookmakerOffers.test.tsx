/* eslint-disable max-len */
import { render, screen } from '@testing-library/react';
import preloadAll from 'jest-next-dynamic';
import { BookmakerOffersList } from '../BookmakerOffersList';
import { BookmakerOffersAccordion } from '../BookmakerOffersAccordion';
import { bookmakerConfiguration, bookmakerNames } from './BookmakerOffers.testData'

beforeAll(async () => {
    await preloadAll();
});

describe('Bookmaker Offers', () => {
    describe('Bookmaker Offers (Tablet)', () => {
        test('Bookmaker Offers Header is displayed', () => {
            render(
                <BookmakerOffersAccordion
                    bookmakerConfiguration = {bookmakerConfiguration}
                    bookmakerNames = {bookmakerNames}
                    isMobile = {false}
                />,
            );
            const headerElement = screen.getByText('Today\'s Offers')
            expect(headerElement).toBeInTheDocument();
        })
        test('Bookmaker Offers SubHeader is displayed', () => {
            render(
                <BookmakerOffersAccordion
                    bookmakerConfiguration = {bookmakerConfiguration}
                    bookmakerNames = {bookmakerNames}
                    isMobile = {false}
                />,
            );
            const subHeadingElement = screen.getByText('Exclusive new customer sign up offers')
            expect(subHeadingElement).toBeInTheDocument();
        })

        test('Bookmaker Offers icons are displayed', () => {
            render(
                <BookmakerOffersAccordion
                    bookmakerConfiguration = {bookmakerConfiguration}
                    bookmakerNames = {bookmakerNames}
                    isMobile = {false}
                />,
            );
            expect(screen.getByTestId('Image__BookmakerOffersIconSkybet')).toBeInTheDocument();
            expect(screen.getByTestId('Image__BookmakerOffersIconBetfair')).toBeInTheDocument();
            expect(screen.getByTestId('Image__BookmakerOffersIconPaddypower')).toBeInTheDocument();
            expect(screen.getByTestId('Image__BookmakerOffersIconWilliamhill')).toBeInTheDocument();
            expect(screen.getByTestId('Image__BookmakerOffersIconLadbrokes')).toBeInTheDocument();
            expect(screen.getByTestId('Image__BookmakerOffersIconBet365')).toBeInTheDocument();
            expect(screen.getByTestId('Image__BookmakerOffersIconCoral')).toBeInTheDocument();
        })
    })

    describe('Bookmaker Offers (Desktop)', () => {
        test('Bookmaker Offers Header is displayed', () => {
            render(
                <BookmakerOffersList
                    bookmakerConfiguration = {bookmakerConfiguration}
                    bookmakerNames = {bookmakerNames}
                />,
            );
            const headerElement = screen.getByText('Today\'s Offers')
            expect(headerElement).toBeInTheDocument();
        })
        test('Bookmaker Offers SubHeader is displayed', () => {
            render(
                <BookmakerOffersList
                    bookmakerConfiguration = {bookmakerConfiguration}
                    bookmakerNames = {bookmakerNames}
                />,
            );
            const subHeadingElement = screen.getByText('Exclusive new customer offers')
            expect(subHeadingElement).toBeInTheDocument();
        })

        test('Bookmaker Offers are displayed', () => {
            render(
                <BookmakerOffersList
                    bookmakerConfiguration = {bookmakerConfiguration}
                    bookmakerNames = {bookmakerNames}
                />,
            );
            expect(screen.getByTestId('Container__BookmakerOfferItemSkybet')).toBeInTheDocument();
            expect(screen.getByTestId('Container__BookmakerOfferItemBetfair')).toBeInTheDocument();
            expect(screen.getByTestId('Container__BookmakerOfferItemPaddypower')).toBeInTheDocument();
            expect(screen.getByTestId('Container__BookmakerOfferItemWilliamhill')).toBeInTheDocument();
            expect(screen.getByTestId('Container__BookmakerOfferItemLadbrokes')).toBeInTheDocument();
            expect(screen.getByTestId('Container__BookmakerOfferItemBet365')).toBeInTheDocument();
            expect(screen.getByTestId('Container__BookmakerOfferItemCoral')).toBeInTheDocument();
        })

        test('Alt offer is displayed', () => {
            render(
                <BookmakerOffersList
                    bookmakerConfiguration = {bookmakerConfiguration}
                    bookmakerNames = {bookmakerNames}
                />,
            );
            expect(screen.getByTestId('Text__BookmakerOfferItemAltOffer')).toBeInTheDocument();
        })

        test('Non-alt offers are displayed', () => {
            render(
                <BookmakerOffersList
                    bookmakerConfiguration = {bookmakerConfiguration}
                    bookmakerNames = {bookmakerNames}
                />,
            );
            expect(screen.getAllByTestId('Text__BookmakerOfferItemOffer')).toHaveLength(6);
        })
    })
})
