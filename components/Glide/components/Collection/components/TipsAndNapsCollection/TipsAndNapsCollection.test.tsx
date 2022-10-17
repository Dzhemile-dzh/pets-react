/* eslint-disable max-len */
import React from 'react';
import { screen, render } from '@testing-library/react'
import * as redux from 'react-redux';
import { TipsAndNapsCollection } from './TipsAndNapsCollection';
import * as breakPointContext from '../../../../../contexts/BreakPointContext';

describe('TipsAndNapsCollection', () => {
    const getGlideCollection = jest.fn();
    const getGlideAuthor = jest.fn();

    const collectionData = {
        collectionDesktopLayoutType: 'Standart',
        id: 409,
        name: 'Tips and Naps collection',
        children: [
            {
                id: 193,
                type: 'promoArticles',
            },
            {
                id: 482,
                type: 'promoArticles',
            },
            {
                id: 483,
                type: 'promoArticles',
            },
            {
                id: 3679,
                type: 'promoArticles',
            },
            {
                id: 499416,
                type: 'promoArticles',
            },
            {
                id: 499416,
                type: 'promoArticles',
            },
        ],
    }

    const useGlideContextReturnValue = {
        getGlideCollection,
        isInitialized: true,
        getGlideAuthor,
        content: {
            authors: {},
            layouts: {},
            widgets: {},
            collections: {
                1: {
                    isLoading: false,
                    data: collectionData,
                },
            },
            promoArticles: {
                499416: {
                    id: 499416,
                    type: 'article',
                    position: 0,
                    promoImageUrl: 'promoImageUrl',
                    promoImageWithRenditionUrl: null,
                    headline: 'First Article',
                    promoDetails: {
                        image_id: 'image_id1',
                        promo_title: 'Promo Title is what appears on the section page',
                    },
                    updatedAt: '3w',
                    primaryTaxonomy: {
                        name: 'Horse racing tips',
                    },
                    customTypeData: {
                        meta_data: {},
                    },
                },
                482: {
                    id: 482,
                    type: 'article',
                    position: 10,
                    promoImageUrl: 'promoImageUrl',
                    promoImageWithRenditionUrl: null,
                    headline: 'Banker Test',
                    promoDetails: {
                        image_id: 'image_id2',
                        promo_title: 'Banker Test',
                    },
                    updatedAt: '2d',
                    primaryTaxonomy: {
                        name: 'Banker',
                    },
                    customTypeData: {
                        meta_data: {},
                    },
                },
                3679: {
                    id: 3679,
                    type: 'article',
                    position: 2,
                    promoImageUrl: 'promoImageUrl',
                    promoImageWithRenditionUrl: null,
                    headline: 'Set time to publish in 2 collections',
                    promoDetails: {
                        image_id: 'image_id3',
                        promo_title: 'Set time to publish in 2 collections',
                    },
                    updatedAt: '1d',
                    primaryTaxonomy: {
                        name: 'Horse racing tips',
                    },
                    customTypeData: {
                        meta_data: {},
                    },
                },
                193: {
                    id: 193,
                    type: 'article',
                    position: 3,
                    promoImageUrl: 'promoImageUrl',
                    promoImageWithRenditionUrl: null,
                    headline: 'Tom Collins: read his free horse racing tip on Tuesday afternoon',
                    promoDetails: {
                        image_id: 'image_id4',
                        promo_title:
                        'The Punt Daily: Tom Collins\' free horse racing tip on Tuesday afternoon',
                    },
                    updatedAt: '2w',
                    primaryTaxonomy: {
                        name: 'The Punt daily',
                    },
                    customTypeData: {
                        meta_data: {},
                    },
                },
                483: {
                    id: 483,
                    type: 'article',
                    position: 4,
                    promoImageUrl: 'promoImageUrl',
                    promoImageWithRenditionUrl: null,
                    headline: 'Today\'s Top Tips',
                    promoDetails: {
                        image_id: 'image_i5',
                        promo_title: 'Today\'s Top Tips',
                    },
                    updatedAt: '1mth',
                    primaryTaxonomy: {
                        name: 'Today\'s Top Tips',
                    },
                    customTypeData: {
                        meta_data: {},
                    },
                },
            },
            images: {
                image_id1: {
                    id: 'image_id1',
                    key: '/dev/key1',
                },
                image_id2: {
                    id: 'image_id2',
                    key: '/dev/key2',
                },
                image_id3: {
                    id: 'image_id3',
                    key: '/dev/key3',
                },
                image_id4: {
                    id: 'image_id4',
                    key: '/dev/key4',
                },
                image_id5: {
                    id: 'image_id5',
                    key: '/dev/key5',
                },
                image_id6: {
                    id: 'image_id6',
                    key: '/dev/key6',
                },
                image_id7: {
                    id: 'image_id7',
                    key: '/dev/key7',
                },
            },
        },
    }

    const useGlideContextReturnValueWithSoftUnpublishedArticles = (softUnpublishedCount) => ({
        ...useGlideContextReturnValue,
        content: {
            ...useGlideContextReturnValue.content,
            promoArticles: {
                ...Object.keys(useGlideContextReturnValue.content.promoArticles)
                    .reduce((acc, key, index) => {
                        const metaData = index < softUnpublishedCount ?
                            { article_soft_unpublish: '2020-12-21T16:30' } :
                            {};

                        return {
                            ...acc,
                            [key]: {
                                ...useGlideContextReturnValue.content.promoArticles[key],
                                customTypeData: {
                                    meta_data: metaData,
                                },
                            },
                        }
                    }, {}),
            },
        },
    })

    it('should render correct the collection and show 5 articles', () => {
        jest.spyOn(redux, 'useSelector')
            .mockReturnValueOnce(useGlideContextReturnValue.content.promoArticles)
            .mockReturnValueOnce(useGlideContextReturnValue.content.images)
            .mockReturnValueOnce(useGlideContextReturnValue.content.images)
            .mockReturnValueOnce(useGlideContextReturnValue.content.images)
            .mockReturnValueOnce(useGlideContextReturnValue.content.images)
            .mockReturnValueOnce(useGlideContextReturnValue.content.images)

        // @ts-ignore we don't need full collection's data
        render(<TipsAndNapsCollection collection = {collectionData} />)

        expect(screen.getByTestId('Container__409__TipsAndNapsCollection')).toBeInTheDocument();
        expect(screen.getAllByTestId('Link__PromoArticle').length).toEqual(5);
    })

    it('should render advertisment placeholder on desktop breakpoint', () => {
        jest.spyOn(redux, 'useSelector')
            .mockReturnValueOnce(useGlideContextReturnValue.content.promoArticles)
            .mockReturnValueOnce(useGlideContextReturnValue.content.images)
            .mockReturnValueOnce(useGlideContextReturnValue.content.images)
            .mockReturnValueOnce(useGlideContextReturnValue.content.images)
            .mockReturnValueOnce(useGlideContextReturnValue.content.images)
            .mockReturnValueOnce(useGlideContextReturnValue.content.images)

        jest.spyOn(breakPointContext, 'useBreakPoint').mockImplementation(
            () => ({ isDesktop: true }),
        );

        // @ts-ignore we don't need full collection's data
        render(<TipsAndNapsCollection collection = {collectionData} />)

        expect(screen.getByTestId('Conainer__AdvertisementPlaceholder')).toBeInTheDocument();
    })

    it('should filter out children that do not have a corresponding promo article', () => {
        jest.spyOn(redux, 'useSelector')
            .mockReturnValueOnce(useGlideContextReturnValue.content.promoArticles)
            .mockReturnValueOnce(useGlideContextReturnValue.content.images)
        jest.spyOn(breakPointContext, 'useBreakPoint').mockImplementation(
            () => ({ isDesktop: true }),
        );
        render(
            <TipsAndNapsCollection
                // @ts-ignore we don't need full state
                collection = {{
                    ...collectionData,
                    children: [
                        ...collectionData.children.slice(0, 3),
                        {
                            id: 1,
                            type: 'promoArticles',
                        },
                    ],
                }}
            />,
        )

        expect(screen.getAllByTestId('Link__PromoArticle').length).toEqual(3);
    })

    const testData = [
        // less than 5 children in collection
        { articles: 5, softUnpublishedArticles: 0, expectedRenderedArticles: 5 },
        { articles: 4, softUnpublishedArticles: 0, expectedRenderedArticles: 4 },
        { articles: 3, softUnpublishedArticles: 0, expectedRenderedArticles: 3 },
        { articles: 2, softUnpublishedArticles: 0, expectedRenderedArticles: 2 },
        { articles: 1, softUnpublishedArticles: 0, expectedRenderedArticles: 1 },
        // soft unpublished articles
        { articles: 5, softUnpublishedArticles: 1, expectedRenderedArticles: 4 },
        { articles: 5, softUnpublishedArticles: 2, expectedRenderedArticles: 3 },
        { articles: 5, softUnpublishedArticles: 3, expectedRenderedArticles: 2 },
        { articles: 5, softUnpublishedArticles: 2, expectedRenderedArticles: 3 },
        { articles: 5, softUnpublishedArticles: 1, expectedRenderedArticles: 4 },
        { articles: 5, softUnpublishedArticles: 0, expectedRenderedArticles: 5 },
        // less than 5 children in collection AND soft unpublished articles
        { articles: 4, softUnpublishedArticles: 1, expectedRenderedArticles: 3 },
        { articles: 4, softUnpublishedArticles: 2, expectedRenderedArticles: 2 },
        { articles: 4, softUnpublishedArticles: 3, expectedRenderedArticles: 1 },
        { articles: 3, softUnpublishedArticles: 1, expectedRenderedArticles: 2 },
        { articles: 3, softUnpublishedArticles: 2, expectedRenderedArticles: 1 },
        { articles: 2, softUnpublishedArticles: 1, expectedRenderedArticles: 1 },
    ]

    const testDataHideCollection = [
        // less than 5 children in collection
        { articles: 0, softUnpublishedArticles: 0 },
        // soft unpublished articles
        { articles: 5, softUnpublishedArticles: 5 },
        // less than 5 children in collection AND soft unpublished articles
        { articles: 4, softUnpublishedArticles: 4 },
        { articles: 3, softUnpublishedArticles: 3 },
        { articles: 2, softUnpublishedArticles: 2 },
        { articles: 1, softUnpublishedArticles: 1 },

    ]

    testData.forEach(({ articles, softUnpublishedArticles, expectedRenderedArticles }) => {
        it(`should render ${expectedRenderedArticles} articles if all articles are ${articles} and ${softUnpublishedArticles} are soft unpublished`, () => {
            jest.spyOn(breakPointContext, 'useBreakPoint').mockImplementation(
                () => ({ isDesktop: true }),
            );
            jest.spyOn(redux, 'useSelector')
                .mockReturnValueOnce(useGlideContextReturnValueWithSoftUnpublishedArticles(softUnpublishedArticles).content.promoArticles)
                .mockReturnValueOnce(useGlideContextReturnValue.content.images)
                .mockReturnValueOnce(useGlideContextReturnValue.content.images)
                .mockReturnValueOnce(useGlideContextReturnValue.content.images)
                .mockReturnValueOnce(useGlideContextReturnValue.content.images)

            render(
                <TipsAndNapsCollection
                    // @ts-ignore we don't need full collection's data
                    collection = {{
                        ...collectionData,
                        children: collectionData.children.slice(0, articles),
                    }}
                />,
            )

            expect(screen.getByTestId('Container__409__TipsAndNapsCollection')).toBeInTheDocument();
            expect(screen.getAllByTestId('Link__PromoArticle').length).toEqual(expectedRenderedArticles);
        })
    })

    testDataHideCollection.forEach(({ articles, softUnpublishedArticles }) => {
        it(`should not render collection if all articles are ${articles} and soft unpublished articles are ${softUnpublishedArticles}`, () => {
            jest.spyOn(breakPointContext, 'useBreakPoint').mockImplementation(
                () => ({ isDesktop: true }),
            );
            jest.spyOn(redux, 'useSelector')
                .mockReturnValueOnce(useGlideContextReturnValueWithSoftUnpublishedArticles(softUnpublishedArticles).content.promoArticles)
            render(
                <TipsAndNapsCollection
                    // @ts-ignore we don't need full collection's data
                    collection = {{
                        ...collectionData,
                        children: collectionData.children.slice(0, articles),
                    }}
                />,
            )

            expect(screen.queryByTestId('Container__409__TipsAndNapsCollection')).not.toBeInTheDocument();
        })
    })
})
