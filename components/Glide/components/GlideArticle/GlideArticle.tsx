import { FC } from 'react';

import { ArticleInterface } from '@store/state/types';
import { useBreakPoint } from '@components/contexts/BreakPointContext';

import ContainerFactory from '../atoms/ContainerFactory';
import PromoImage from '../PromoArticle/components/PromoImage';
import AdvertisementPlaceholder from '../atoms/AdvertisementPlaceholder';

import styles from './GlideArticle.module.scss';

export const GlideArticle: FC<Partial<ArticleInterface>> = ({
    standfirst,
    body,
    headline,
    updatedAtFullDate,
    publishedAtDate,
}) => {
    const { isDesktop, isMobile } = useBreakPoint();
    const { leadImage, items } = body;

    return (
        <div
            className = {styles['glide-article']}
            data-testid = "Container__GlideArticle"
        >
            <div
                className = {styles['glide-article__main-body']}
                data-testid = "Container__GlideArticleMainBody"
            >
                {headline && (
                    <span
                        className = {styles['glide-article__headline']}
                        data-testid = "Text__GlideArticleHeadline"
                    >
                        {headline}
                    </span>
                )}
                {standfirst && (
                    <span
                        className = {styles['glide-article__standfirst']}
                        data-testid = "Text__GlideArticleStandfirst"
                    >
                        {standfirst}
                    </span>
                )}
                {leadImage && (
                    <PromoImage className = {styles['glide-article__promo-image']}>
                        <PromoImage.Url
                            imageId = {leadImage.id}
                            promoImageUrl = {leadImage.promoImageUrl}
                        />
                        {(leadImage.caption || leadImage.credit?.length > 0) && (
                            <PromoImage.CaptionAndCredit
                                isOnTopOfImage
                                caption = {leadImage.caption}
                                credit = {isMobile ? [] : leadImage.credit}
                            />
                        )}
                    </PromoImage>
                )}
                <div
                    className = {styles['glide-article__content']}
                    data-testid = "Container__GlideArticleContent"
                >
                    <div className = {styles['glide-article__content-details']}>
                        {items?.map((element, index) => (
                            <ContainerFactory
                                key = {element.id}
                                index = {index}
                                {...element}
                            />
                        ))}
                    </div>
                    <div className = {styles['glide-article__content-additions']}>
                        <span
                            className = {styles['glide-article__content-additions-date']}
                            data-testid = "Text__GlideArticleContentAdditionsPublishedDate"
                        >
                            Published on {publishedAtDate}
                        </span>
                        <span
                            className = {styles['glide-article__content-additions-date']}
                            data-testid = "Text__GlideArticleContentAdditionsUpdatedDate"
                        >
                            Last updated {updatedAtFullDate}
                        </span>
                    </div>
                </div>
            </div>
            {isDesktop && (
                <div data-testid = "Container__GlideArticleAside">
                    <AdvertisementPlaceholder
                        className = {styles['glide-article__ad-placeholder']}
                    />
                </div>
            )}
        </div>
    )
}
