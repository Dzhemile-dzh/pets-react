/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useMemo } from 'react';
import { makeStyles } from '@material-ui/styles';

import {
    FeatureModuleSmallPromoArticle,
    TopStoryPromoSecondaryArticle,
} from '@components/Glide/components/PromoArticle';
import { theme } from '../../../../../../styles/breakpoints-theme';

import {
    TaxonomyCollectionBodyInterface,
    HeaderInterface,
} from '../../../../../interfaces';
import { useBreakPoint } from '../../../../../contexts/BreakPointContext';
import { Header, Title, ChevronLink } from '../../../../../Layouts/Header';
import AdvertisementPlaceholder from '../../../atoms/AdvertisementPlaceholder';

import styles from './FeaturesCollection.module.scss';

const useStyles = makeStyles({
    root: {
        backgroundColor: styles.lightgrey,
    },
    headline: {
        fontSize: '22px',
        lineHeight: '26px',
        [theme.breakpoints.between('smallDesktop', 'largeDesktop')]: {
            fontSize: '18px',
            lineHeight: '22px',
        },
    },
});

interface FeaturesCollectionInterface extends
    HeaderInterface, TaxonomyCollectionBodyInterface
{}

export const FeaturesCollection = ({
    items,
    headerText,
    headerLinkText,
    minimumArticleCount,
    maximumArticleCount,
}: FeaturesCollectionInterface): JSX.Element => {
    const classes = useStyles();
    const { isDesktop } = useBreakPoint();

    const articles = useMemo(() => (
        items.slice(0, maximumArticleCount)
    ), [items, maximumArticleCount]);

    return articles.length >= minimumArticleCount && isDesktop && (
        <div
            className = {styles['features-collection']}
            data-testid = "Container__FeaturesCollection"
        >
            <div className = {styles['features-collection__container']}>
                <div className = {styles['features-collection__header']}>
                    <Header
                        purpose = "Features"
                        paddingTop
                        paddingBottom
                    >
                        <Title text = {headerText} />
                        <ChevronLink url = "" text = {headerLinkText} />
                    </Header>
                </div>
                <div
                    className = {styles['features-collection__body']}
                    data-testid = "Container__FeaturesCollectionArticles"
                >
                    <div className = {styles['features-collection__body-primary-row']}>
                        <TopStoryPromoSecondaryArticle {...articles[0]} />
                        <AdvertisementPlaceholder className = {styles['features-collection__ad-placeholder']} />
                    </div>
                    <div className = {styles['features-collection__body-secondary-row']}>
                        {articles.slice(1, maximumArticleCount).map((article) => (
                            <FeatureModuleSmallPromoArticle
                                key = {article.id}
                                {...article}
                                classes = {classes}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
