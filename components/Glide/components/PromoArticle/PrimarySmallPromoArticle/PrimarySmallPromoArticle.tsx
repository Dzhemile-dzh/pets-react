import React from 'react'
import Link from 'next/link';

import { PromoArticleInterface } from '../../../../interfaces';
import PrimaryTaxonomy from '../components/PrimaryTaxonomy';
import ArticleHeadline from '../components/ArticleHeadline';
import ArticleAuthor from '../components/ArticleAuthor';

import styles from './PrimarySmallPromoArticle.module.scss';

export const PrimarySmallPromoArticle = ({
    promoDetails,
    headline,
    updatedAt,
    primaryTaxonomy,
    isAuthorHavingImage,
    shouldHideAuthorsImage,
    shouldHideAuthorsDetails,
    authors,
    seo,
    path,
} : PromoArticleInterface) : JSX.Element => (
    <Link href = {path || ''}>
        <a
            className = {styles['primary-small-promo-article']}
            data-testid = "Link__PromoArticle"
        >
            <div className = {styles['primary-small-promo-article__wrapper']}>
                {
                    authors.length > 0 && !shouldHideAuthorsDetails && (
                        <ArticleAuthor
                            id = {authors[0]}
                            isAuthorHavingImage = {isAuthorHavingImage}
                            shouldHideAuthorsImage = {shouldHideAuthorsImage}
                            authorName = {seo?.author}
                        />
                    )
                }
                <ArticleHeadline
                    promoDetails = {promoDetails}
                    headline = {headline}
                    className = {styles['primary-small-promo-article__headline']}
                />
                <PrimaryTaxonomy className = {styles['primary-small-promo-article__taxonomy']}>
                    <PrimaryTaxonomy.Time time = {updatedAt} />
                    <PrimaryTaxonomy.Delimiter />
                    <PrimaryTaxonomy.Name name = {primaryTaxonomy.name} />
                </PrimaryTaxonomy>
            </div>
        </a>
    </Link>
)
