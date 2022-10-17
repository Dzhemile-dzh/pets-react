import React from 'react'
import Link from 'next/link';

import { PromoArticleInterface } from '../../../../interfaces';
import ArticleHeadline from '../components/ArticleHeadline';
import PrimaryTaxonomy from '../components/PrimaryTaxonomy';
import PromoImage from '../components/PromoImage';

import styles from './TopStoryPromoDefaultArticle.module.scss';

export const TopStoryPromoDefaultArticle = ({
    promoDetails,
    promoImageWithRenditionUrl,
    headline,
    seo,
    primaryTaxonomy,
    promoImageUrl,
    updatedAt,
    path,
} : PromoArticleInterface) : JSX.Element => (
    <Link href = {path || ''}>
        <a
            className = {styles['top-story-promo-default-article']}
            data-testid = "Link__TopStoryHeroArticle"
        >
            <div className = {styles['top-story-promo-default-article__text-container']}>
                <ArticleHeadline
                    promoDetails = {promoDetails}
                    headline = {headline}
                    className = {styles['top-story-promo-default-article__headline']}
                />
                {
                    seo.author && (
                        <span
                            className = {styles['top-story-promo-default-article__author']}
                            data-testid = "Text__ArticleAuthor"
                        >
                            {seo.author}
                        </span>
                    )
                }
                {
                    promoDetails?.promo_sub_title?.length > 0 && (
                        <span
                            className = {styles['top-story-promo-default-article__SubTitle']}
                            data-testid = "Text__ArticleSubTitle"
                        >
                            {promoDetails.promo_sub_title}
                        </span>
                    )
                }
                <PrimaryTaxonomy>
                    <PrimaryTaxonomy.Time time = {updatedAt} />
                    <PrimaryTaxonomy.Delimiter />
                    <PrimaryTaxonomy.Name name = {primaryTaxonomy.name} />
                </PrimaryTaxonomy>
            </div>
            <PromoImage
                className = {styles['top-story-promo-default-article__image-container']}
            >
                <PromoImage.Url
                    imageId = {promoDetails.image_id}
                    promoImageUrl = {promoImageUrl}
                    promoImageWithRenditionUrl = {promoImageWithRenditionUrl}
                />
            </PromoImage>
        </a>
    </Link>
)
