import React, { useMemo } from 'react'
import classnames from 'classnames';

import { useSelector } from 'react-redux';
import { useBreakPoint } from '../../../../../contexts/BreakPointContext';
import { CollectionInterface, StateInterface } from '../../../../../interfaces';
import { ChevronIcon } from '../../../../../base/Icons/ChevronIcon';
import { dateFormatter, compareDates } from '../../../../../../project/utils';

import { TipsAndNapsPromoArticle } from '../../../PromoArticle';
import AdvertisementPlaceholder from '../../../atoms/AdvertisementPlaceholder';
import { Header, LeftSideContent, RightSideContent } from '../../../../../Layouts/Header';

import styles from './TipsAndNapsCollection.module.scss';

const SingleChildArticle = ({ child, size, isContentOnTheRight }) => (
    <TipsAndNapsPromoArticle
        isContentOnTheRight = {isContentOnTheRight}
        size = {size}
        {...child}
    />
)

const GroupedChildArticles = ({ type, childArticles, shouldHideImage }) => (
    <div className = {classnames(
        styles['tips-and-naps-collection__grouped-articles'],
        styles[`tips-and-naps-collection__grouped-articles--${type}`],
    )}
    >
        {childArticles.map((child) => (
            <TipsAndNapsPromoArticle
                key = {child.id}
                shouldHideImage = {shouldHideImage}
                size = "small"
                {...child}
            />
        ))}
    </div>
)

export const TipsAndNapsCollection = (
    { collection }: {collection: CollectionInterface},
): JSX.Element => {
    const promoArticles = useSelector((state: StateInterface) => state.glide.promoArticles)

    const { isMobile, isDesktop } = useBreakPoint();

    const children = useMemo(() => (
        collection.children
            ?.slice(0, 5)
            .map((child) => promoArticles[child.id])
            .filter((child) => {
                if (!child) {
                    return;
                }

                const currentUkTime = dateFormatter().ukISODateTimeFormat;
                const softUnpublishDate = child.customTypeData.meta_data?.article_soft_unpublish;
                return !softUnpublishDate || compareDates(softUnpublishDate, currentUkTime) > 0;
            })
    ), [collection.children, promoArticles]);

    if (children.length === 0) {
        return null;
    }

    const { length } = children;

    const splitChildren = (splitStart) => (
        <>
            {children.slice(0, splitStart).map((child, index) => (
                <SingleChildArticle
                    key = {child.id}
                    isContentOnTheRight = {length === 1 || length === 4}
                    size = {index === 0 ? 'large' : 'small'}
                    child = {child}
                />
            ))}
            {splitStart < 5 && (
                <GroupedChildArticles
                    type = {length === 3 || isMobile ? 'vertical' : 'horizontal'}
                    shouldHideImage = {!isMobile && length === 3}
                    childArticles = {children.slice(splitStart, length)}
                />
            )}
        </>
    );

    let splitIndex = 5;
    if (!isMobile && length === 5) {
        splitIndex = 2;
    } else if (isMobile || length === 4 || length === 3) {
        splitIndex = 1;
    }

    return (
        <div
            className = {styles['tips-and-naps-collection']}
            data-testid = {`Container__${collection.id}__TipsAndNapsCollection`}
        >
            <div className = {styles['tips-and-naps-collection__container']}>
                <div
                    className = {styles['tips-and-naps-collection__header']}
                    data-testid = "Container__TipsAndNapsCollectionHeader"
                >
                    <Header
                        purpose = "TipsAndNaps"
                        flexAlignCenterVertically
                        paddingTop
                        paddingBottom
                    >
                        <LeftSideContent>
                            <span
                                className = {styles['tips-and-naps-collection__header-title']}
                                data-testid = "Text__TipsAndNapsCollectionHeaderTitle"
                            >
                                {collection.headerText}
                            </span>
                        </LeftSideContent>
                        <RightSideContent>
                            <div className = {styles['tips-and-naps-collection__header-link']}>
                                <span
                                    className = {
                                        styles['tips-and-naps-collection__header-link-text']
                                    }
                                    data-testid = "Text__TipsAndNapsCollectionHeaderLinkText"
                                >
                                    {collection.headerLinkText}
                                </span>
                                <div
                                    className = {
                                        styles['tips-and-naps-collection__header-link-icon']
                                    }
                                    data-testid = "Icon__TipsAndNapsCollectionHeader"
                                >
                                    <ChevronIcon size = "small" color = "primary" />
                                </div>
                            </div>
                        </RightSideContent>
                    </Header>
                </div>
                <div
                    className = {styles['tips-and-naps-collection__body']}
                    data-testid = "Container__TipsAndNapsBody"
                >
                    <div
                        className = {styles['tips-and-naps-collection__articles']}
                        data-testid = "Container__TipsAndNapsArticles"
                    >
                        {splitChildren(splitIndex)}
                    </div>
                    {isDesktop && (
                        <AdvertisementPlaceholder
                            className = {styles['tips-and-naps-collection__ad-placeholder']}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}
