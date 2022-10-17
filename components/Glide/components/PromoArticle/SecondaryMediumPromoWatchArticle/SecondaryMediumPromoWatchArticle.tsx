import React from 'react';
import classnames from 'classnames';
import Link from 'next/link';

import {
    PromoArticleInterface,
} from '../../../../interfaces';
import ArticleHeadline from '../components/ArticleHeadline';
import PrimaryTaxonomy from '../components/PrimaryTaxonomy';
import PromoImage from '../components/PromoImage';

import styles from './SecondaryMediumPromoWatchArticle.module.scss';

interface SecondaryMediumPromoArticleInterface extends PromoArticleInterface {
    className?: string;
}

export const SecondaryMediumPromoWatchArticle = ({
    promoImageUrl,
    promoImageWithRenditionUrl,
    promoDetails,
    headline,
    updatedAt,
    primaryTaxonomy,
    className,
    path,
}: SecondaryMediumPromoArticleInterface): JSX.Element => (
    <Link href = {path || ''}>
        <a
            className = {classnames(
                styles['secondary-medium-promo-article'],
                className,
            )}
            data-testid = "Link__PromoArticle"
        >
            <PromoImage
                className = {styles['secondary-medium-promo-article__image-container']}
            >
                <PromoImage.Url
                    imageId = {promoDetails?.image_id}
                    promoImageUrl = {promoImageUrl}
                    promoImageWithRenditionUrl = {promoImageWithRenditionUrl}
                />
            </PromoImage>
            <div
                className = {styles['secondary-medium-promo-article__content-video-article']}
                data-testid = "Container__PromoArticleContent"
            >
                <ArticleHeadline
                    promoDetails = {promoDetails}
                    headline = {headline}
                    className = {styles['secondary-medium-promo-article__headline-video-article']}
                />
                <PrimaryTaxonomy
                    className = {styles['secondary-medium-promo-article__taxonomy-video-article']}
                >
                    <PrimaryTaxonomy.Time time = {updatedAt} isDefaultIcon = {false} />
                    <PrimaryTaxonomy.Delimiter />
                    <PrimaryTaxonomy.Name name = {primaryTaxonomy.name} />
                </PrimaryTaxonomy>
            </div>
        </a>
    </Link>
)
