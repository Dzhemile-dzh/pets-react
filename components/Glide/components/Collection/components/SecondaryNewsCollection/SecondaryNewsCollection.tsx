import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';

import { CollectionInterface, StateInterface } from '@components/interfaces';
import { useBreakPoint } from '@components/contexts/BreakPointContext';
import {
    SecondaryMediumPromoArticle,
    SecondaryMediumPromoWatchArticle,
    FeatureModuleSmallPromoArticle,
    TertiarySmallPromoArticle,
} from '../../../PromoArticle';

import styles from './SecondaryNewsCollection.module.scss';

const rootStyle = {
    root: {
        backgroundColor: styles.lightgrey,
    },
}

const SecondaryArticlesStyles = makeStyles({
    ...rootStyle,
    headline: {
        fontFamily: styles.fontutopiasemibold,
        fontSize: '24px',
        lineHeight: '28px',
    },
});

const FeatureArticlesStyles = makeStyles({
    ...rootStyle,
})

export const SecondaryNewsCollection = (
    { collection } : { collection : CollectionInterface },
): JSX.Element => {
    const promoArticles = useSelector((state: StateInterface) => state.glide.promoArticles)
    const secondaryMediumArticlesStyles = SecondaryArticlesStyles();
    const featureModuleArticlesStyles = FeatureArticlesStyles();

    const { isMobile } = useBreakPoint();

    return collection.children.length > 6 && (
        <div
            className = {styles['secondary-news-collection']}
            data-testid = {`Container__${collection.id}__SecondaryNewsCollection`}
        >
            <div className = {styles['secondary-news-collection__container']}>
                {isMobile ? (
                    collection.children.slice(0, 7).map((article) => (
                        <TertiarySmallPromoArticle
                            key = {article.id}
                            {...promoArticles[article.id]}
                        />
                    ))
                ) : (
                    <>
                        <div
                            className = {styles['secondary-news-collection__row']}
                            data-testid = "Container__SecondaryNewsCollectionRow"
                        >
                            {collection.children.slice(0, 4).map((article) => (
                                promoArticles[article.id].isVideoArticle ? (
                                    <SecondaryMediumPromoWatchArticle
                                        key = {article.id}
                                        {...promoArticles[article.id]}
                                    />
                                ) : (
                                    <SecondaryMediumPromoArticle
                                        key = {article.id}
                                        {...promoArticles[article.id]}
                                        classes = {secondaryMediumArticlesStyles}
                                    />
                                )
                            ))}
                        </div>
                        <div
                            className = {styles['secondary-news-collection__row']}
                            data-testid = "Container__SecondaryNewsCollectionRow"
                        >
                            {collection.children.slice(4, 7).map((article) => (
                                <FeatureModuleSmallPromoArticle
                                    key = {article.id}
                                    {...promoArticles[article.id]}
                                    classes = {featureModuleArticlesStyles}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
