import React from 'react';
import Link from 'next/link';

import { PromoArticleInterface } from '../../../../interfaces';
import ArticleHeadline from '../components/ArticleHeadline';
import PrimaryTaxonomy from '../components/PrimaryTaxonomy';
import PromoImage from '../components/PromoImage';

import styles from './TertiarySmallPromoArticle.module.scss';

export const TertiarySmallPromoArticle = ({
    promoImageUrl,
    promoImageWithRenditionUrl,
    promoDetails,
    headline,
    updatedAt,
    primaryTaxonomy,
    path,
} : PromoArticleInterface) : JSX.Element => (
    <Link href = {path || ''}>
        <a
            className = {styles['tertiary-small-promo-article']}
            data-testid = "Link__PromoArticle"
        >
            <PromoImage
                className = {styles['tertiary-small-promo-article__image-container']}
            >
                <PromoImage.Url
                    imageId = {promoDetails?.image_id}
                    promoImageUrl = {promoImageUrl}
                    promoImageWithRenditionUrl = {promoImageWithRenditionUrl}
                />
            </PromoImage>
            <div className = {styles['tertiary-small-promo-article__content']}>
                <ArticleHeadline
                    promoDetails = {promoDetails}
                    headline = {headline}
                    className = {styles['tertiary-small-promo-article__headline']}
                />
                <PrimaryTaxonomy>
                    <PrimaryTaxonomy.Time time = {updatedAt} />
                    <PrimaryTaxonomy.Delimiter />
                    <PrimaryTaxonomy.Name name = {primaryTaxonomy.name} />
                </PrimaryTaxonomy>
            </div>
        </a>
    </Link>
)
