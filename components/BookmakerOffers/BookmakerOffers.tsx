import { memo } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { StateInterface } from '@components/interfaces/Store.types';
import { Actions } from '../../project/common';
import useEffectOnce from '../custom-hooks/useEffectOnce';
import { useBreakPoint } from '../contexts/BreakPointContext';
import { shuffleArray } from '../../project/utils/formatUtils';
import { BookmakerOffersAccordion } from './BookmakerOffersAccordion';
import { BookmakerOffersList } from './BookmakerOffersList';

export const BookmakerOffers = memo(() : JSX.Element => {
    const dispatch = useDispatch();

    const { isMobile, isDesktop } = useBreakPoint();

    useEffectOnce(() => {
        dispatch(Actions.getBookmakerConfigurations());
    })

    const bookmakerOffers = useSelector(
        (state: StateInterface) => state.bookmakerConfiguration.bookmakerConfigs,
    )

    const bookmakersWithOffers = shuffleArray(Object.keys(bookmakerOffers || [])
        .filter((bookmakerName) => bookmakerOffers[bookmakerName].desktop.offer));

    if (isDesktop && bookmakersWithOffers.length > 0) {
        return (
            <BookmakerOffersList
                bookmakerConfiguration = {bookmakerOffers}
                bookmakerNames = {bookmakersWithOffers}
            />
        )
    }

    return !isDesktop && bookmakersWithOffers.length > 0 && (
        <BookmakerOffersAccordion
            bookmakerConfiguration = {bookmakerOffers}
            bookmakerNames = {bookmakersWithOffers}
            isMobile = {isMobile}
        />
    );
})

BookmakerOffers.displayName = 'BookmakerOffers'
