import { FC } from 'react';
import classnames from 'classnames';
import Link from 'next/link';

import { PromoArticleInterface } from '../../../../interfaces';
import ArticleHeadline from '../components/ArticleHeadline';
import PrimaryTaxonomy from '../components/PrimaryTaxonomy';
import PromoImage from '../components/PromoImage';

import styles from './FeatureModuleSmallPromoArticle.module.scss';

interface FeatureModuleSmallPromoArticleInterface extends PromoArticleInterface {
    classes?: Record<string, string>;
}

export const FeatureModuleSmallPromoArticle : FC<FeatureModuleSmallPromoArticleInterface> = ({
    promoImageUrl,
    promoImageWithRenditionUrl,
    headline,
    promoDetails,
    updatedAt,
    primaryTaxonomy,
    isBigRace,
    path,
    classes = {},
}) => (
    <Link href = {path || ''}>
        <a
            className = {classnames(
                styles['feature-module-small-promo-article'],
                classes.root,
            )}
            data-testid = "Link__PromoArticle"
        >
            <PromoImage
                className = {styles['feature-module-small-promo-article__image-container']}
            >
                <PromoImage.Url
                    imageId = {promoDetails?.image_id}
                    promoImageUrl = {promoImageUrl}
                    promoImageWithRenditionUrl = {promoImageWithRenditionUrl}
                />
                {isBigRace && (
                    <PromoImage.Title
                        className = {styles['feature-module-small-promo-article__big-race']}
                        title = "the big race"
                    />
                )}
            </PromoImage>
            <div
                className = {styles['feature-module-small-promo-article__content']}
                data-testid = "Container__PromoArticleContent"
            >
                <ArticleHeadline
                    promoDetails = {promoDetails}
                    headline = {headline}
                    className = {classnames(
                        styles['feature-module-small-promo-article__headline'],
                        classes.headline,
                    )}
                />
                <PrimaryTaxonomy
                    className = {styles['feature-module-small-promo-article__taxonomy']}
                >
                    <PrimaryTaxonomy.Time time = {updatedAt} />
                    <PrimaryTaxonomy.Delimiter />
                    <PrimaryTaxonomy.Name name = {primaryTaxonomy.name} />
                </PrimaryTaxonomy>
            </div>
        </a>
    </Link>
)
