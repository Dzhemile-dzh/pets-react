import { useState, useEffect } from 'react';
import Image from 'next/image';
import classnames from 'classnames';
import { convertToPascalCase } from '../../project/utils/formatUtils';
import { BookmakerConfigurationItemInterface } from '../interfaces';
import BookmakerOfferItem from './components/BookmakerOfferItem';

import styles from './BookmakerOffers.module.scss';

const Heading = ({
    bookmakerNames,
    isMobile,
}) => (
    <div
        data-testid = "Container__BookmakerOffersHeading"
        className = {styles['bookmaker-offers__header-heading']}
    >
        <h4 data-testid = "Text__BookmakerOffersHeading">Today's Offers </h4>
        <span
            data-testid = "Text__BookmakerOffersAmount"
        >
            {bookmakerNames.length}
        </span>

        {isMobile && (
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
        )}
    </div>
)

export const BookmakerOffersAccordion = ({
    bookmakerConfiguration,
    bookmakerNames,
    isMobile,
} : {
    bookmakerConfiguration: Record<string, BookmakerConfigurationItemInterface>,
    bookmakerNames: Array<string>,
    isMobile: boolean,
}): JSX.Element => {
    const [isToggled, setIsToggled] = useState(false);
    const [toggledOffer, setToggledOffer] = useState(bookmakerNames[0]);

    useEffect(() => {
        setToggledOffer(bookmakerNames[0]);
    }, [bookmakerNames])

    const toggleOffers = () => {
        setIsToggled(!isToggled);
    }

    return (
        <>
            {isMobile && <Heading bookmakerNames = {bookmakerNames} isMobile = {isMobile} />}
            <div
                className = {styles['bookmaker-offers']}
                data-testid = "Container__BookmakerOffers"
            >
                <div
                    data-testid = "Container__BookmakerOffersHeader"
                    className = {styles['bookmaker-offers__header']}
                    onClick = {toggleOffers}
                >
                    <div data-testid = "Container__BookmakerOffersHeaderWrapper">
                        {!isMobile && (
                            <Heading bookmakerNames = {bookmakerNames} isMobile = {isMobile} />
                        )}
                        {(!isMobile || isToggled) && (
                            <p data-testid = "Text__BookmakerOfferSubheading">
                                {isMobile ?
                                    'Exclusive to new customers' :
                                    'Exclusive new customer sign up offers'}
                            </p>
                        )}
                    </div>

                    <div
                        data-testid = "Container__BookmakerOffersIcons"
                        className = {classnames(
                            styles['bookmaker-offers__header-icons'],
                            { [styles['bookmaker-offers__header-icons--toggled']]: isToggled },
                        )}
                    >
                        {!isToggled && (
                            bookmakerNames.map((name) => (
                                <Image
                                    key = {name}
                                    width = {32}
                                    height = {32}
                                    src = {`/svgs/square-bookmakers/sq-logo-${name}.svg`}
                                    data-testid =
                                        {`Image__BookmakerOffersIcon${convertToPascalCase(name)}`}
                                />
                            ))
                        )}

                        <Image
                            className = {classnames(
                                styles['bookmaker-offers__header-chevron'],
                                {
                                    [styles['bookmaker-offers__header-chevron--toggled']]:
                                        isToggled,
                                },
                            )}
                            width = {30}
                            height = {30}
                            src = "/svgs/chevron_right_black.svg"
                            data-testid = "Image__BookmakerOffersHeaderChevron"
                        />
                    </div>

                </div>
                {isToggled && (
                    <div
                        data-testid = "Container__BookmakerOffersContent"
                        className = {styles['bookmaker-offers__content']}
                    >
                        {bookmakerNames.map((name, index) => (
                            <BookmakerOfferItem
                                key = {name}
                                offer = {bookmakerConfiguration[name].desktop}
                                bookmakerName = {name}
                                isTopOffer = {index === 0}
                                isOfferToggled = {toggledOffer === name}
                                setToggledOffer = {setToggledOffer}
                                isMobile = {isMobile}
                            />
                        ))}
                        <p
                            data-testid = "Text__BookmakerOffersTCApply"
                            className = {styles['bookmaker-offers__content-tc-apply']}
                        >
                            T&C apply. 18+ Gamebleaware
                        </p>
                    </div>
                )}
            </div>
        </>
    )
}
