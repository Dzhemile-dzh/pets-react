import { useState, useEffect } from 'react';
import Image from 'next/image';
import { BookmakerConfigurationItemInterface } from '../interfaces';
import BookmakerOfferItem from './components/BookmakerOfferItem';

import styles from './BookmakerOffers.module.scss';

export const BookmakerOffersList = ({
    bookmakerConfiguration,
    bookmakerNames,
} : {
    bookmakerConfiguration: Record<string, BookmakerConfigurationItemInterface>,
    bookmakerNames: Array<string>,
}): JSX.Element => {
    const [toggledOffer, setToggledOffer] = useState(bookmakerNames[0]);

    useEffect(() => {
        setToggledOffer(bookmakerNames[0]);
    }, [bookmakerNames])

    return (
        <div
            data-testid = "Container__BookmakerOffers"
            className = {styles['bookmaker-offers']}
        >
            <div
                data-testid = "Container__BookmakerOffersHeader"
                className = {styles['bookmaker-offers__header']}
            >
                <h4 data-testid = "Text__BookmakerOffersHeader">Today's Offers</h4>
                <p data-testid = "Text__BookmakerOffersSubHeading">Exclusive new customer offers</p>
                <a
                    data-testid = "Link__BookmakerOffersSubHeading"
                    href = "https://racingpost.com/free-bets"
                    target = "_blank"
                    rel = "noreferrer"
                >
                    All offers {' '}
                    <Image
                        width = {9}
                        height = {9}
                        src = "/svgs/chevron_right_red.svg"
                        data-testid = "Image__BookmakerOffersHeaderChevron"
                    />
                </a>
            </div>

            <ul data-testid = "List__BookmakerOffers">
                {bookmakerNames.map((name, index) => (
                    <li key = {index} data-testid = "ListItem__BookmakerOffer">
                        <BookmakerOfferItem
                            offer = {bookmakerConfiguration[name].desktop}
                            bookmakerName = {name}
                            isTopOffer = {index === 0}
                            isOfferToggled = {toggledOffer === name}
                            setToggledOffer = {setToggledOffer}
                        />
                    </li>
                ))}
            </ul>
        </div>
    )
}
