import React from 'react';

interface ArticleHeadlineInterface {
    promoSubtitle: string;
    className?: string;
}

export const ArticleSubtitle = ({
    promoSubtitle,
    className,
}: ArticleHeadlineInterface): JSX.Element => {
    return (
        <p
            className = {className}
            data-testid = "Text__ArticleSubtitle"
        >
            {promoSubtitle}
        </p>
    )
}
