import React from 'react';
import classnames from 'classnames';
import Link from 'next/link';

import { PromoArticleInterface } from '../../../../interfaces';

import ArticleHeadline from '../components/ArticleHeadline';
import PrimaryTaxonomy from '../components/PrimaryTaxonomy';
import PromoImage from '../components/PromoImage';

import stylesLarge from './TipsAndNapsPromoArticleLarge.module.scss';
import stylesSmall from './TipsAndNapsPromoArticleSmall.module.scss';

interface TipsAndNapsPromoArticleInterface extends PromoArticleInterface {
    className?: string;
    size?: 'large' | 'small';
    isContentOnTheRight?: boolean;
    shouldHideImage?: boolean;
}

export const TipsAndNapsPromoArticle = ({
    promoImageUrl,
    promoImageWithRenditionUrl,
    headline,
    promoDetails,
    updatedAt,
    primaryTaxonomy,
    path,
    size = 'large',
    isContentOnTheRight = false,
    shouldHideImage = false,
}: TipsAndNapsPromoArticleInterface): JSX.Element => {
    const styles = size === 'large' ? stylesLarge : stylesSmall;

    return (
        <Link href = {path || ''}>
            <a
                className = {classnames(
                    styles['tips-and-naps-promo-article'],
                    {
                        [styles['tips-and-naps-promo-article--right']]: isContentOnTheRight,
                    },
                    {
                        [styles['tips-and-naps-promo-article--no-image']]: shouldHideImage,
                    },
                )}
                data-testid = "Link__PromoArticle"
            >
                {!shouldHideImage && (
                    <PromoImage
                        className = {styles['tips-and-naps-promo-article__image-container']}
                    >
                        <PromoImage.Url
                            imageId = {promoDetails?.image_id}
                            promoImageUrl = {promoImageUrl}
                            promoImageWithRenditionUrl = {promoImageWithRenditionUrl}
                        />
                    </PromoImage>
                )}
                <div
                    className = {classnames(
                        styles['tips-and-naps-promo-article__content'],
                        {
                            [styles['tips-and-naps-promo-article__content--right']]:
                                isContentOnTheRight,
                        },
                    )}
                    data-testid = "Container__PromoArticleContent"
                >
                    <ArticleHeadline
                        promoDetails = {promoDetails}
                        headline = {headline}
                        className = {styles['tips-and-naps-promo-article__headline']}
                    />
                    <PrimaryTaxonomy
                        className = {styles['tips-and-naps-promo-article__taxonomy']}
                    >
                        <PrimaryTaxonomy.Time
                            time = {updatedAt}
                            isDefaultIcon = {false}
                        />
                        <PrimaryTaxonomy.Delimiter isWhite />
                        <PrimaryTaxonomy.Name
                            className = {styles['tips-and-naps-promo-article__taxonomy-name']}
                            name = {primaryTaxonomy?.name}
                        />
                    </PrimaryTaxonomy>
                </div>
            </a>
        </Link>
    )
}
