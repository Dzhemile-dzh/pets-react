import React from 'react'
import Image from 'next/image';
import Link from 'next/link';

import { PromoArticleInterface } from '../../../../interfaces';
import ArticleHeadline from '../components/ArticleHeadline';
import PrimaryTaxonomy from '../components/PrimaryTaxonomy';

import styles from './BreakingNewsPromoArticle.module.scss';

export const BreakingNewsPromoArticle = ({
    promoDetails,
    headline,
    primaryTaxonomy,
    updatedAt,
    path,
} : PromoArticleInterface) : JSX.Element => {
    return (
        <Link href = {path || ''}>
            <a
                className = {styles['breaking-news-promo-article']}
                data-testid = "Link__BreakingNewsPromoArticle"
            >
                <div className = {styles['breaking-news-promo-article__wrapper']}>
                    <div className = {styles['breaking-news-promo-article__header']}>
                        <div className = {styles['breaking-news-promo-article__header-icon']}>
                            <Image
                                src = "/svgs/breaking_news.svg"
                                width = {20}
                                height = {20}
                                data-testid = "Icon__BreakingNews"
                            />
                        </div>
                        <span
                            className = {styles['breaking-news-promo-article__header-title']}
                            data-testid = "Text__BreakingNewsHeaderTitle"
                        >
                            Breaking News
                        </span>
                    </div>
                    <ArticleHeadline
                        promoDetails = {promoDetails}
                        headline = {headline}
                        className = {styles['breaking-news-promo-article__headline']}
                    />
                    <PrimaryTaxonomy
                        className = {styles['breaking-news-promo-article__primary-taxonomy']}
                    >
                        <PrimaryTaxonomy.Time
                            time = {updatedAt}
                            isDefaultIcon = {false}
                        />
                        <PrimaryTaxonomy.Delimiter isWhite />
                        <PrimaryTaxonomy.Name
                            name = {primaryTaxonomy.name}
                            className = {styles['breaking-news-promo-article__primary-taxonomy']}
                        />
                    </PrimaryTaxonomy>
                </div>
            </a>
        </Link>
    )
}
