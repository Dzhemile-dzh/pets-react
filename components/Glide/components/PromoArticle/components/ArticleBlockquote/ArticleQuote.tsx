import { FC } from 'react';

import styles from './ArticleQuote.module.scss';

interface ArticleQuoteInterface {
    attribution?: string;
    role?: string;
    children: React.ReactChildren | React.ReactChild | JSX.Element[] | JSX.Element;
}

export const ArticleQuote: FC<ArticleQuoteInterface> = ({
    attribution,
    role,
    children,
}) => (
    <div
        className = {styles['article-quote']}
        data-testid = "Container__ArticleQuote"
    >
        {children}
        <span
            className = {styles['article-quote__attribution']}
            data-testid = "Text__ArticleQuoteAttribution"
        >
            {attribution}
        </span>
        <span
            className = {styles['article-quote__role']}
            data-testid = "Text__ArticleQuoteRole"
        >
            {role}
        </span>
    </div>
)
