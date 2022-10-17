import React from 'react';
import propTypes from 'prop-types';
import { useBreakPoint } from '../../../contexts/BreakPointContext';
import styles from './BookmakerCompliance.module.scss';

export const BookmakerCompliance = ({ bookmakerName, bookmakerConfiguration }) => {
    const { isMobile } = useBreakPoint();
    const device = isMobile ? 'mobile' : 'desktop';

    const bookMakerComplience = bookmakerConfiguration?.[bookmakerName]?.[device]?.compliance

    return bookMakerComplience ? (
        <span
            className = {styles['bs-bookmaker-compliance']}
            data-testid = "Text__BookmakerCompliance"
        >
            {bookMakerComplience}
        </span>
    ) : null;
}

BookmakerCompliance.propTypes = {
    bookmakerConfiguration: propTypes.object,
    bookmakerName: propTypes.string,
}
