import React from 'react';
import { PromoDetailsInterface } from '../../../../../interfaces';

interface ArticleHeadlineInterface {
    promoDetails?: PromoDetailsInterface;
    headline?: string;
    className?: string;
}

export const ArticleHeadline = ({
    promoDetails,
    headline,
    className,
} : ArticleHeadlineInterface) : JSX.Element => {
    const articleHeadline = promoDetails?.promo_title?.length > 0 ?
        promoDetails.promo_title :
        headline;

    return (
        <span
            className = {className}
            data-testid = "Text__ArticleHeadline"
        >
            {articleHeadline}
        </span>
    )
}
