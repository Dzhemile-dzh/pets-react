import React from 'react';
import { makeStyles } from '@material-ui/styles';

import {
    TaxonomyCollectionBodyInterface,
    HeaderInterface,
} from '../../../../../interfaces';
import { useBreakPoint } from '../../../../../contexts/BreakPointContext';
import { theme } from '../../../../../../styles/breakpoints-theme';

import { ChevronLink, Header, Title } from '../../../../../Layouts/Header';
import AdvertisementPlaceholder from '../../../atoms/AdvertisementPlaceholder';
import { TertiarySmallPromoArticle, SecondaryMediumPromoArticle } from '../../../PromoArticle';

import styles from './ReportsPreviewsBase.module.scss';

const useStyles = makeStyles({
    content: {
        paddingLeft: 0,
    },
    headline: {
        [theme.breakpoints.between('tablet', 'largeDesktop')]: {
            fontSize: '18px',
            lineHeight: '22px',
        },
        [theme.breakpoints.up('largeDesktop')]: {
            fontSize: '22px',
            lineHeight: '26px',
        },
    },
});

const DesktopArticles = ({ items, shouldHaveAdPlaceholders }) => {
    const classes = useStyles();

    return (
        <>
            {items.map((item) => (
                <SecondaryMediumPromoArticle
                    key = {item.id}
                    {...item}
                    classes = {classes}
                    shouldShowSubtitle = {false}
                />
            ))}
            {shouldHaveAdPlaceholders && (
                <AdvertisementPlaceholder
                    className = {styles['reports-previews-base__ad-placeholder']}
                />
            )}
        </>
    )
};

const MobileArticles = ({ items }) => (
    items.map((item) => (
        <TertiarySmallPromoArticle key = {item.id} {...item} />
    ))
);

export interface ReportsPreviewsBaseInterface extends
    HeaderInterface, TaxonomyCollectionBodyInterface
{}

export const ReportsPreviewsBase = ({
    items,
    headerText,
    headerLinkText,
    purpose,
    shouldHaveAdPlaceholders = false,
} : ReportsPreviewsBaseInterface) : JSX.Element => {
    const { isMobile } = useBreakPoint();

    return (
        <div
            className = {styles['reports-previews-base']}
            data-testid = {`Container__${purpose}Collection`}
        >
            <div className = {styles['reports-previews-base__container']}>
                <div className = {styles['reports-previews-base__header']}>
                    <Header
                        purpose = {purpose}
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
                    className = {styles['reports-previews-base__body']}
                    data-testid = {`Container__${purpose}CollectionArticles`}
                >
                    {isMobile ? (
                        <MobileArticles items = {items} />
                    ) : (
                        <DesktopArticles
                            items = {items}
                            shouldHaveAdPlaceholders = {shouldHaveAdPlaceholders}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}
