import Image from 'next/image';
import classnames from 'classnames';
import { useBreakPoint } from '../../../contexts/BreakPointContext';
import BookmakerIcon from '../../../base/BookmakerIcon';
import { BookmakerConfigurationItemDataInterface } from '../../../interfaces';
import { convertToPascalCase } from '../../../../project/utils/formatUtils';
import { Constants } from '../../../../project/constants';

import styles from './BookmakerOfferItem.module.scss';

interface BookmakerOfferItemInterface {
    bookmakerName: string;
    offer: BookmakerConfigurationItemDataInterface;
    isTopOffer: boolean;
    isOfferToggled: boolean;
    setToggledOffer: (value: string) => void;
    isMobile?: boolean;
}

export const BookmakerOfferItem = ({
    bookmakerName,
    offer,
    isTopOffer,
    isOfferToggled,
    setToggledOffer,
    isMobile,
}: BookmakerOfferItemInterface) : JSX.Element => {
    const { isDesktop } = useBreakPoint();
    const { BETFAIR } = Constants.BOOKMAKER_NAMES;
    const chevronPath = isOfferToggled ? (bookmakerName === BETFAIR ?
        '/svgs/chevron_right_black.svg' : '/svgs/chevron_right_white.svg') :
        '/svgs/chevron_right_black.svg';

    const toggleOffer = () => {
        setToggledOffer(isOfferToggled ? null : bookmakerName);
    }

    return (
        <div
            data-testid = {`Container__BookmakerOfferItem${convertToPascalCase(bookmakerName)}`}
            className = {styles['bookmaker-offer-item']}
        >
            <div
                data-testid = "Container__BookmakerOfferItemHeader"
                className = {classnames(
                    styles['bookmaker-offer-item__header'],
                    {
                        [styles[`bookmaker-offer-item--${bookmakerName}`]]: isOfferToggled,
                        [styles['bookmaker-offer-item__header--toggled']]: isOfferToggled,
                    },
                )}
                onClick = {toggleOffer}
            >
                <div
                    data-testid = "Container__BookmakerOfferItemDetails"
                    className = {styles['bookmaker-offer-item__header-details']}
                >
                    <div className = {styles['bookmaker-offer-item__header-icon-wrapper']}>
                        <div
                            data-testid = "Container__BookmakerOfferItemOffer"
                            className = {classnames(
                                styles['bookmaker-offer-item__header-bookmaker-icon'],
                                styles[`bookmaker-offer-item--${bookmakerName}`],
                            )}
                        >
                            <BookmakerIcon
                                data-testid = "Icon__BookmakerOfferItemBookie"
                                size = {isOfferToggled ? 'offer-toggled' : 'offer'}
                                name = {bookmakerName}
                            />
                        </div>
                    </div>
                    <div className = {styles['bookmaker-offer-item__header-offer']}>
                        {!isOfferToggled && (
                            <>
                                <h5 data-testid = "Text__BookmakerOfferItemOffer">{offer.offer}</h5>
                                {isDesktop && (
                                    <p
                                        data-testid = "Text__BookmakerOfferItemTCApply"
                                        className = {styles['bookmaker-offer-item__header-tc-apply']}
                                    >
                                        T&C apply. 18+ BeGambleAware
                                    </p>
                                )}
                            </>
                        )}
                    </div>
                </div>

                <div
                    data-testid = "Container__BookmakerOfferItemTopOfferContainer"
                    className = {styles['bookmaker-offer-item__header-top-offer-container']}
                >
                    {isOfferToggled && isTopOffer && !isMobile && (
                        <span
                            data-testid = "Text__BookmakerOfferItemTopOffer"
                            className = {classnames(
                                styles['bookmaker-offer-item__header-top-offer'],
                                styles[`bookmaker-offer-item--${bookmakerName}`],
                            )}
                        >
                            TOP OFFER
                        </span>
                    )}
                    {!isDesktop && (!isMobile || (!isOfferToggled)) && (
                        <div className = {styles['bookmaker-offer-item__header-chevron-wrapper']}>
                            <Image
                                className = {classnames(
                                    styles['bookmaker-offer-item__header-chevron'],
                                    {
                                        [styles['bookmaker-offer-item__header-chevron--toggled']]:
                                            isOfferToggled,
                                    },
                                )}
                                width = {22}
                                height = {22}
                                src = {chevronPath}
                                data-testid = "Image__BookmakerOffersHeaderChevron"
                            />
                        </div>
                    )}
                </div>
            </div>

            {isOfferToggled && (
                <div
                    data-testid = "Container__BookmakerOfferItemToggledContent"
                    className = {styles['bookmaker-offer-item__content']}
                >
                    {isMobile && isTopOffer && (
                        <span
                            data-testid = "Text__BookmakerOfferItemTopOffer"
                            className = {styles['bookmaker-offer-item__content-top-offer']}
                        >
                            TOP OFFER
                        </span>
                    )}
                    <h5 data-testid = {`Text__BookmakerOfferItem${offer.altOffer && 'Alt'}Offer`}>{offer.altOffer || offer.offer}</h5>
                    <p data-testid = "Text__BookmakerOfferItemTCApply">{offer.tsAndCs}</p>
                    <a
                        data-testid = "Link__BookmakerOfferItemOffer"
                        target = "_blank"
                        href = {offer.signUpLink4}
                        rel = "noreferrer"
                    >
                        {offer.linkText}
                    </a>
                </div>
            )}
        </div>
    )
}
