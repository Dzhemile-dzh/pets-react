import { createElement } from 'react';
import { useBreakPoint } from '@components/contexts/BreakPointContext';

import PromoImage from '@components/Glide/components/PromoArticle/components/PromoImage';
import ArticleQuote from '@components/Glide/components/PromoArticle/components/ArticleBlockquote';

import { jsxTags as JSX_TAGS } from '@project/utils';
import { Constants } from '@project/constants';

const {
    GLIDE_CONTENT_PANEL_IDENTIFIERS: {
        QUOTE,
    },
} = Constants;

export const getDataTestId = (tag, index) => {
    const containerName = tag === JSX_TAGS.div ? 'Container' : 'Text';
    const containerIndex = !Number.isNaN(index) ? `__${index}` : '';

    return `${containerName}${containerIndex}__GlideArticleBody`;
}

export const getContainer = (tag) => {
    switch (tag) {
        case JSX_TAGS.img:
            return function ImageContainer({
                children,
                content,
                index,
                style,
            }) {
                const { isMobile } = useBreakPoint();

                return (
                    <PromoImage index = {index} style = {style}>
                        <PromoImage.Url
                            imageId = {content.id}
                            promoImageUrl = {content.promoImageUrl}
                            alt = {content.altText}
                        />
                        {(content.caption || content.credit?.length > 0) && (
                            <PromoImage.CaptionAndCredit
                                caption = {content.caption}
                                credit = {isMobile ? [] : content.credit}
                            />
                        )}
                        {children}
                    </PromoImage>
                )
            }
        case JSX_TAGS.section:
            return function CustomContainer({
                children,
                content,
                index,
                style,
            }) {
                if (content.identifier === QUOTE) {
                    return (
                        <ArticleQuote
                            attribution = {content.attribution}
                            role = {content.role}
                        >
                            {createElement(
                                tag,
                                { 'data-testid': getDataTestId(tag, index), style },
                                [children],
                            )}
                        </ArticleQuote>
                    )
                }

                return null
            }
        case JSX_TAGS.div:
        case JSX_TAGS.p:
        case JSX_TAGS.span:
        case JSX_TAGS.strong:
        case JSX_TAGS.em:
        case JSX_TAGS.u:
        case JSX_TAGS.h1:
        case JSX_TAGS.h2:
        case JSX_TAGS.h3:
        case JSX_TAGS.h4:
        case JSX_TAGS.h5:
        case JSX_TAGS.ul:
        case JSX_TAGS.ol:
        case JSX_TAGS.li:
        case JSX_TAGS.sup:
        case JSX_TAGS.sub:
            return function CustomContainer({
                children,
                content,
                index,
                style,
            }) {
                return (
                    createElement(
                        tag,
                        { 'data-testid': getDataTestId(tag, index), style },
                        [...content, children],
                    )
                )
            }
        default:
            return null;
    }
}
