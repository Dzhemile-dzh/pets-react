import React from 'react';
import { screen, render } from '@testing-library/react';
import * as redux from 'react-redux';
import * as glideContext from '../../../../../contexts/GlideContext';

import { articles, races } from '../../TaxonomyCollection.testData';

import { RacePreviewsCollection } from './RacePreviewsCollection';

const props = {
    items: Object.keys(articles).map((key) => articles[key].data),
    getRace: jest.fn(),
    races,
    headerText: 'Previews',
    headerLinkText: 'All previews',
    minimumArticleCount: 2,
    maximumArticleCount: 3,
};

describe('RacePreviewsCollection', () => {
    const getGlideCollection = jest.fn();
    const getGlideAuthor = jest.fn();
    const getGlideTaxonomyCollection = jest.fn();

    const content = {
        collections: {},
        authors: {},
        layouts: {},
        widgets: {},
        promoArticles: {},
        images: {},
        articles: {},
        taxonomyCollections: {},
    }
    const isInitialized = true;

    const defaultUseGlideContextReturnValue = {
        getGlideCollection,
        content,
        isInitialized,
        getGlideAuthor,
        getGlideTaxonomyCollection,
    }
    const updatedContent = {
        ...content,
        collections: {},
        promoArticles: {},
        images: {
            image_url: {
                id: 'image_url',
                key: '/dev/image_url',
            },
        },
    }

    const useGlideContextReturnValue = {
        ...defaultUseGlideContextReturnValue,
        content: updatedContent,
    }

    jest.spyOn(glideContext, 'useGlideContext').mockImplementation(
        // @ts-ignore we don't need full state
        () => useGlideContextReturnValue,
    );

    it('should render correctly RacePreviewsCollection', () => {
        jest.spyOn(redux, 'useSelector')
        // Mock for PromoImage
            .mockReturnValueOnce(races)
            .mockReturnValueOnce(races)
            .mockReturnValueOnce(races)

        const useDispatchSpy = jest.spyOn(redux, 'useDispatch');
        const mockDispatchFn = jest.fn()
        useDispatchSpy.mockReturnValue(mockDispatchFn);

        render(<RacePreviewsCollection {...props} />)

        expect(screen.getByTestId('Container__RacePreviewsCollection')).toBeInTheDocument();
    });
})
