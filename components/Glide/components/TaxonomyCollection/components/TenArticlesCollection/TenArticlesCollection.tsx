import React, { useMemo } from 'react';
import { makeStyles } from '@material-ui/styles';

import {
    TaxonomyCollectionBodyInterface,
    HeaderInterface,
} from '../../../../../interfaces';
import { useBreakPoint } from '../../../../../contexts/BreakPointContext';

import { ChevronLink, Header, Title } from '../../../../../Layouts/Header'
import { TertiarySmallPromoArticle, SecondaryMediumPromoArticle } from '../../../PromoArticle';

import styles from './TenArticlesCollection.module.scss';

const useStyles = makeStyles({
    root: {
        backgroundColor: styles.lightgrey,
    },
    headline: {
        fontFamily: styles.fontutopiasemibold,
        fontSize: '24px',
        lineHeight: '28px',
    },
});

const DesktopArticles = ({ items }) => {
    const classes = useStyles();

    const smallArticles = items.slice(0, 8);
    const largeArticles = items.slice(8);

    return (
        <div
            className = {styles['ten-articles-collection__articles']}
            data-testid = "Container__TenArticlesCollectionArticles"
        >
            <div className = {styles['ten-articles-collection__articles-column']}>
                {
                    smallArticles.map((item) => (
                        <TertiarySmallPromoArticle key = {item.id} {...item} />
                    ))
                }
            </div>
            <div className = {styles['ten-articles-collection__articles-column']}>
                {
                    largeArticles.map((item) => (
                        <SecondaryMediumPromoArticle
                            key = {item.id}
                            classes = {classes}
                            {...item}
                        />
                    ))
                }
            </div>
        </div>
    )
}

const MobileArticles = ({ items }) => (
    items.map((item) => (
        <TertiarySmallPromoArticle key = {item.id} {...item} />
    ))
)

interface TenArticlesCollectionInterface extends
    HeaderInterface, TaxonomyCollectionBodyInterface
{}

export const TenArticlesCollection = ({
    items,
    headerText,
    headerLinkText,
    minimumArticleCount,
    maximumArticleCount,
} : TenArticlesCollectionInterface) : JSX.Element => {
    const { isMobile } = useBreakPoint();

    const articles = useMemo(() => (
        items.slice(0, maximumArticleCount)
    ), [items, maximumArticleCount]);

    return items.length >= minimumArticleCount && (
        <div
            className = {styles['ten-articles-collection']}
            data-testid = "Container__TenArticlesCollection"
        >
            <div className = {styles['ten-articles-collection__container']}>
                <div className = {styles['ten-articles-collection__header']}>
                    <Header
                        purpose = "TenArticles"
                        paddingTop
                        paddingBottom
                        paddingLeft = {isMobile}
                        paddingRight = {isMobile}
                        borderBottom = {isMobile}
                    >
                        <Title text = {headerText} />
                        <ChevronLink
                            url = {headerText === 'Latest News' ? '/horse-racing/news' : ''}
                            text = {headerLinkText}
                        />
                    </Header>
                </div>
                <div className = {styles['ten-articles-collection__body']}>
                    {isMobile ? (
                        <MobileArticles items = {articles} />
                    ) : (
                        <DesktopArticles items = {articles} />
                    )}
                </div>
            </div>
        </div>
    )
}
