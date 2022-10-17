import React from 'react'
import classnames from 'classnames';
import Link from 'next/link';

import { PromoArticleInterface } from '../../../../interfaces';
import ArticleHeadline from '../components/ArticleHeadline';
import ArticleSubtitle from '../components/ArticleSubtitle';
import PrimaryTaxonomy from '../components/PrimaryTaxonomy';
import PromoImage from '../components/PromoImage';

import styles from './SecondaryMediumPromoArticle.module.scss'

interface SecondaryMediumPromoArticleInterface extends PromoArticleInterface {
    shouldShowSubtitle?: boolean;
    classes?: Record<string, string>;
}

export const SecondaryMediumPromoArticle = ({
    promoImageUrl,
    promoImageWithRenditionUrl,
    promoDetails,
    headline,
    updatedAt,
    primaryTaxonomy,
    shouldShowSubtitle = true,
    classes = {},
    path,
}: SecondaryMediumPromoArticleInterface): JSX.Element => (
    <Link href = {path || ''}>
        <a
            className = {classnames(
                styles['secondary-medium-promo-article'],
                classes.root,
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
                className = {classnames(
                    styles['secondary-medium-promo-article__content'],
                    classes.content,
                )}
                data-testid = "Container__PromoArticleContent"
            >
                <ArticleHeadline
                    promoDetails = {promoDetails}
                    headline = {headline}
                    className = {classnames(
                        styles['secondary-medium-promo-article__headline'],
                        classes.headline,
                    )}
                />
                {promoDetails?.promo_sub_title?.length > 0 && shouldShowSubtitle && (
                    <ArticleSubtitle
                        promoSubtitle = {promoDetails.promo_sub_title}
                        className = {classnames(
                            styles['secondary-medium-promo-article__subtitle'],
                            classes.subtitle,
                        )}
                    />
                )}
                <PrimaryTaxonomy
                    className = {classnames(
                        styles['secondary-medium-promo-article__taxonomy'],
                        classes.taxonomy,
                    )}
                >
                    <PrimaryTaxonomy.Time time = {updatedAt} />
                    <PrimaryTaxonomy.Delimiter />
                    <PrimaryTaxonomy.Name name = {primaryTaxonomy.name} />
                </PrimaryTaxonomy>
            </div>
        </a>
    </Link>
)
