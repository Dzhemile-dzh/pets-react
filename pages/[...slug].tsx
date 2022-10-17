import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { END } from 'redux-saga';
import { useSelector } from 'react-redux';

import { StateInterface } from '@store/state/types';
import { SagaStore } from '@components/interfaces';
import { Actions } from '@project/common';
import { wrapper } from '@store/index';

import GlideArticle from '@components/Glide/components/GlideArticle';
import { Navigation } from '@components/Navigation';
import RaceIndexHeader from '@components/RaceCards/components/RaceIndexHeader';
import { NavigationRenderPropsInterface } from '@components/Navigation/interfaces';
import Loader from '@components/base/Loader';

const GlideArticlePage = () => {
    const router = useRouter();

    const {
        article, articleError, articlePageError, isArticlePageLoading,
    } = useSelector(
        (state: StateInterface) => {
            const { articles, articlePage } = state.glide;

            return {
                article: articles[articlePage.articleId]?.data,
                articleError: articlePage.articleError,
                articlePageError: articlePage.articlePageError,
                isArticlePageLoading: articlePage.isArticlePageLoading,
            }
        },
    )

    const hasError = articleError || articlePageError;

    useEffect(() => {
        if (hasError) {
            router.push('/error');
        }
    }, [hasError, router])

    const { slug } = router.query;
    const taxonomy = slug[0].toLowerCase().replace(/-/g, ' ');

    return (
        <>
            <Navigation>
                {
                    (props : NavigationRenderPropsInterface) => (
                        <>
                            <Navigation.MobileNavigation {...props} />
                            <Navigation.DesktopNavigation {...props} />
                        </>
                    )
                }
            </Navigation>
            <RaceIndexHeader headerTitle = {taxonomy} />
            {hasError || isArticlePageLoading ? (
                <Loader />
            ) : (
                <GlideArticle {...article} />
            )}
        </>
    );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ query }) => {
    store.dispatch(Actions.getGlideArticlePage(query.slug))

    store.dispatch(END);

    await (store as SagaStore).sagaTask.toPromise();

    return { props: {} };
});

export default GlideArticlePage;
GlideArticlePage.displayName = 'GlideArticlePage';
GlideArticlePage.isHavingSSR = true;
