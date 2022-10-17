import React, { useMemo } from 'react';
import { makeStyles } from '@material-ui/styles';

import {
    TaxonomyCollectionBodyInterface,
    HeaderInterface,
} from '../../../../../interfaces';
import { useBreakPoint } from '../../../../../contexts/BreakPointContext';

import { ChevronLink, Header, Title } from '../../../../../Layouts/Header';
import {
    SecondaryMediumPromoArticle,
    SecondaryMediumPromoWatchArticle,
    TertiarySmallPromoArticle,
} from '../../../PromoArticle';

import styles from './FourArticlesCollection.module.scss';

const useStyles = makeStyles({
    content: {
        color: styles.white,
        border: `1px solid ${styles.midgrey}`,
        borderTop: 'none',
    },
    headline: {
        fontFamily: styles.fontutopiasemibold,
        fontSize: '24px',
        lineHeight: '28px',
    },
});

const DesktopArticles = ({ items }) => {
    const classes = useStyles();

    return (
        items.map((item) => (
            item.isVideoArticle ? (
                <SecondaryMediumPromoWatchArticle
                    key = {item.id}
                    {...item}
                />
            ) : (
                <SecondaryMediumPromoArticle
                    key = {item.id}
                    classes = {classes}
                    {...item}
                />
            )
        ))
    )
}

const MobileArticles = ({ items }) => (
    items.map((item) => (
        <TertiarySmallPromoArticle key = {item.id} {...item} />
    ))
)

interface FourArticlesCollectionInterface extends
    HeaderInterface, TaxonomyCollectionBodyInterface
{}

export const FourArticlesCollection = ({
    items,
    headerText,
    headerLinkText,
    minimumArticleCount,
    maximumArticleCount,
} : FourArticlesCollectionInterface): JSX.Element => {
    const { isMobile } = useBreakPoint();

    const articles = useMemo(() => (
        items.slice(0, maximumArticleCount)
    ), [items, maximumArticleCount]);

    return items.length >= minimumArticleCount && (
        <div
            className = {styles['four-articles-collection']}
            data-testid = "Container__FourArticlesCollection"
        >
            <div className = {styles['four-articles-collection__container']}>
                <div className = {styles['four-articles-collection__header']}>
                    <Header
                        purpose = "FourArticles"
                        paddingTop
                        paddingBottom
                        paddingLeft = {isMobile}
                        paddingRight = {isMobile}
                        borderBottom = {isMobile}
                    >
                        <Title text = {headerText} />
                        <ChevronLink url = "" text = {headerLinkText} />
                    </Header>
                </div>
                <div
                    className = {styles['four-articles-collection__body']}
                    data-testid = "Container__FourArticlesCollectionArticles"
                >
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
