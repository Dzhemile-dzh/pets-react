import React, { memo } from 'react';

import Popover from '../../../../../base/Popover';

import styles from './OfferPopover.module.scss';

interface OfferPopoverInterface {
    offer?: string;
    tsAndCs?: string;
    linkText?: string;
    signUpLink?: string;
    setIsPopoverOpen?: (value: boolean) => void;
}

export const OfferPopover = memo(({
    offer,
    tsAndCs,
    linkText,
    signUpLink,
    setIsPopoverOpen,
}: OfferPopoverInterface) => (
    <Popover
        setShouldShowPopover = {setIsPopoverOpen}
        className = {styles['offer-popover']}
        position = "right"
        purpose = "Offer"
    >
        <div
            className = {styles['offer-popover__wrapper']}
            data-testid = "Container__BookmakerAccountItemOfferPopoverWrapper"
        >
            <span
                className = {styles['offer-popover__headline']}
                data-testid = "Text__BookmakerAccountItemOfferPopoverHeadline"
            >
                {offer}
            </span>
            <span
                className = {styles['offer-popover__text']}
                data-testid = "Text__BookmakerAccountItemOfferPopover"
            >
                {tsAndCs}
            </span>
            <a
                href = {signUpLink}
                target = "blank"
                className = {styles['offer-popover__claim-btn']}
                onClick = {() => setIsPopoverOpen(false)}
                data-testid = "Link__BookmakerAccountItemOfferPopoverClaim"
            >
                <span
                    data-testid = "Text__BookmakerAccountItemOfferPopoverClaim"
                >
                    {linkText}
                </span>
            </a>
        </div>
    </Popover>
))

OfferPopover.displayName = 'OfferPopover';
