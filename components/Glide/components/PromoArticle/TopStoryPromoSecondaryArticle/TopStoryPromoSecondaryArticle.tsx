import { FC } from 'react';
import Link from 'next/link';
import { PromoArticleInterface } from '../../../../interfaces';
import ArticleHeadline from '../components/ArticleHeadline';
import PrimaryTaxonomy from '../components/PrimaryTaxonomy';
import PromoImage from '../components/PromoImage';

import styles from './TopStoryPromoSecondaryArticle.module.scss';

export const TopStoryPromoSecondaryArticle : FC<PromoArticleInterface> = ({
    promoImageUrl,
    promoImageWithRenditionUrl,
    headline,
    promoDetails,
    updatedAt,
    primaryTaxonomy,
    path,
}: PromoArticleInterface): JSX.Element => (
    <Link href = {path || ''}>
        <a
            className = {styles['top-story-secondary-promo-article']}
            data-testid = "Link__PromoArticle"
        >
            <PromoImage
                className = {styles['top-story-secondary-promo-article__image-container']}
            >
                <PromoImage.Url
                    imageId = {promoDetails?.image_id}
                    promoImageUrl = {promoImageUrl}
                    promoImageWithRenditionUrl = {promoImageWithRenditionUrl}
                />
            </PromoImage>
            <div
                className = {styles['top-story-secondary-promo-article__content']}
                data-testid = "Container__PromoArticleContent"
            >
                <ArticleHeadline
                    promoDetails = {promoDetails}
                    headline = {headline}
                    className = {styles['top-story-secondary-promo-article__headline']}
                />
                <PrimaryTaxonomy
                    className = {styles['top-story-secondary-promo-article__taxonomy']}
                >
                    <PrimaryTaxonomy.Time time = {updatedAt} isDefaultIcon = {false} />
                    <PrimaryTaxonomy.Delimiter />
                    <PrimaryTaxonomy.Name name = {primaryTaxonomy.name} />
                </PrimaryTaxonomy>
            </div>
        </a>
    </Link>
)
