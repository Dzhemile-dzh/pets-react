/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable max-len */
import React from 'react';
import { screen, render } from '@testing-library/react';
import * as redux from 'react-redux';
import { articles } from './TaxonomyCollection.testData';

import { TaxonomyCollection } from './TaxonomyCollection';

const props = {
    collection: {
        children: [
            {
                id: 1,
                type: 'articles',
            },
            {
                id: 2,
                type: 'articles',
            },
            {
                id: 3,
                type: 'articles',
            },
            {
                id: 4,
                type: 'articles',
            },
            {
                id: 5,
                type: 'articles',
            },
            {
                id: 6,
                type: 'articles',
            },
            {
                id: 7,
                type: 'articles',
            },
            {
                id: 8,
                type: 'articles',
            },
            {
                id: 9,
                type: 'articles',
            },
            {
                id: 10,
                type: 'articles',
            },
        ],
    },
    configuration: {
        article_positions: [],
        collection_header: 'Test',
        section_link: 501,
        section_link_text: 'Test link',
        source_taxonomy: 501,
        presentation_type: '4Articles',
    },
};

const content = {
    layouts: {},
    widgets: {},
    collections: {},
    promoArticles: {},
    authors: {},
    images: {},
    articles,
    taxonomyCollections: {
        Test: {
            data: {
                children: [
                    {
                        id: 1,
                    },
                    {
                        id: 2,
                    },
                    {
                        id: 3,
                    },
                    {
                        id: 4,
                    },
                    {
                        id: 5,
                    },
                    {
                        id: 6,
                    },
                    {
                        id: 7,
                    },
                    {
                        id: 8,
                    },
                    {
                        id: 9,
                    },
                    {
                        id: 10,
                    },
                ],
            },
            isLoading: false,
        },
    },
};

describe('TaxonomyCollection', () => {
    it('should display spinner if collection is not loaded', () => {
        const useDispatchSpy = jest.spyOn(redux, 'useDispatch');
        const mockDispatchFn = jest.fn()
        useDispatchSpy.mockReturnValue(mockDispatchFn);

        jest.spyOn(redux, 'useSelector')
            // articleTypes
            .mockReturnValueOnce({})
            // collections
            .mockReturnValueOnce({})
            // taxonomyCollection
            .mockReturnValueOnce({
                ...content.taxonomyCollections.Test,
                isLoading: true,
            })
            // articles
            .mockReturnValueOnce(articles)

        render(<TaxonomyCollection {...props} />)

        expect(screen.getByTestId('Container__CollectionLoader')).toBeInTheDocument();
    });
})
