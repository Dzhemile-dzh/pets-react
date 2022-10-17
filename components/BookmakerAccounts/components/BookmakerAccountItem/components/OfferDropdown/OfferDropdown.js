import React, { memo } from 'react';
import propTypes from 'prop-types';

import styles from './OfferDropdown.module.scss';

export const OfferDropdown = memo(({
    offer,
    tsAndCs,
    linkText,
    signUpLink,
    onClick,
}) => {
    return (
        <div className = {styles['offer-dropdown']}>
            <div className = {styles['offer-dropdown__wrapper']}>
                <div className = {styles['offer-dropdown__header']}>
                    <span className = {styles['offer-dropdown__header-title']}>
                        New customer offer
                    </span>
                    <span className = {styles['offer-dropdown__header-label']}>
                        Offer
                    </span>
                </div>
                <span className = {styles['offer-dropdown__headline']}>
                    {offer}
                </span>
                <span className = {styles['offer-dropdown__text']}>
                    {tsAndCs}
                </span>
                <a
                    href = {signUpLink}
                    target = "blank"
                    className = {styles['offer-dropdown__claim-btn']}
                    onClick = {onClick}
                >
                    <span>{linkText}</span>
                </a>
            </div>
        </div>
    )
})

OfferDropdown.displayName = 'OfferDropdown';

OfferDropdown.propTypes = {
    offer: propTypes.string,
    tsAndCs: propTypes.string,
    linkText: propTypes.string,
    signUpLink: propTypes.string,
    onClick: propTypes.func,
};
