import React, { useMemo } from 'react'
import { useSelector } from 'react-redux';

import { useBreakPoint } from '../../../../../contexts/BreakPointContext';
import { CollectionInterface, StateInterface } from '../../../../../interfaces';
import {
    TopStoryPromoDefaultArticle,
    PrimarySmallPromoArticle,
    TertiarySmallPromoArticle,
    BreakingNewsPromoArticle,
} from '../../../PromoArticle';

import styles from './TopStoriesCollection.module.scss';

export const TopStoriesCollection = (
    { collection } : { collection : CollectionInterface },
) : JSX.Element => {
    const promoArticles = useSelector((state: StateInterface) => state.glide.promoArticles)
    const { isMobile } = useBreakPoint();

    const [topStoryArticle, ...restArticles] = collection.children;

    const restArticlesComponents = useMemo(() => {
        // Showing only 3 articles of the remaining articles
        // Due to Collection type limits
        return restArticles.slice(0, 3).map((article) => {
            const data = promoArticles[article.id];

            if (data.isBreakingNews) {
                return (<BreakingNewsPromoArticle key = {article.id} {...data} />)
            }

            if (isMobile) {
                return (<TertiarySmallPromoArticle key = {article.id} {...data} />)
            }

            return (
                <PrimarySmallPromoArticle key = {article.id} {...data} />
            )
        })
    }, [isMobile, promoArticles, restArticles])

    return (
        <div
            className = {styles['top-stories-collection']}
            data-testid = {`Container__${collection.id}__TopStoriesCollection`}
        >
            <div className = {styles['top-stories-collection__container']}>
                <div
                    className = {styles['top-stories-collection__top-story-wrapper']}
                    data-testid = "Container__TopStoryHeroArticleWrapper"
                >
                    <TopStoryPromoDefaultArticle {...promoArticles[topStoryArticle.id]} />
                </div>
                <div
                    className = {styles['top-stories-collection__articles']}
                    data-testid = "Container__TopStoryArticles"
                >
                    {restArticlesComponents}
                </div>
            </div>
        </div>
    )
}
