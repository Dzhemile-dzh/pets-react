import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import { Actions } from '@project/common';
import { StateInterface } from '@components/interfaces/Store.types';

import useEffectOnce from '@components/custom-hooks/useEffectOnce';
import styles from './ArticleAuthor.module.scss';

interface ArticleAuthorInterface {
    id: number;
    authorName: string;
    isAuthorHavingImage: boolean;
    shouldHideAuthorsImage: boolean;
}

export const ArticleAuthor = ({
    id,
    authorName,
    isAuthorHavingImage,
    shouldHideAuthorsImage,
} : ArticleAuthorInterface) : JSX.Element => {
    const dispatch = useDispatch()

    const author = useSelector((state: StateInterface) => state.glide.authors[id])

    useEffectOnce(() => {
        isAuthorHavingImage && !author && dispatch(Actions.getGlideAuthor(id));
    });

    return (
        <div
            className = {styles['article-author']}
            data-testid = "Container__ArticleAuthor"
        >
            {
                !shouldHideAuthorsImage && (
                    <div
                        className = {styles['article-author__image-container']}
                        data-testid = "Container__AuthorImageWrapper"
                    >
                        {
                            (author?.isLoading ||
                                !author?.data?.imageUrl || !isAuthorHavingImage
                            ) ? (
                                    <div className = {styles['article-author__default-image']}>
                                        <Image
                                            src = "/svgs/article_avatar.svg"
                                            height = {50}
                                            width = {50}
                                            data-testid = "Icon__DefaultAuthorAvatar"
                                        />
                                    </div>
                                ) : (
                                    <div className = {styles['article-author__image-wrapper']}>
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src = {author.data.imageUrl}
                                            alt = "Author avatar"
                                            className = {styles['article-author__image']}
                                            data-testid = "Image__AuthorImage"
                                        />
                                    </div>
                                )
                        }
                    </div>
                )
            }
            {
                typeof author?.isLoading !== 'undefined' && !author?.isLoading &&
                    (author?.data?.name || !isAuthorHavingImage) && (
                    <span
                        className = {styles['article-author__name']}
                        data-testid = "Text_AuthorName"
                    >
                        {author?.data?.name || authorName}
                    </span>
                )
            }
        </div>
    )
}
