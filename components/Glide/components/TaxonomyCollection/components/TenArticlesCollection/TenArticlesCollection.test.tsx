import React from 'react';
import { screen, render } from '@testing-library/react';
import * as redux from 'react-redux';
import * as glideContext from '../../../../../contexts/GlideContext';

import { articles, images } from '../../TaxonomyCollection.testData';

import { TenArticlesCollection } from './TenArticlesCollection';

const props = {
    items: Object.keys(articles).map((key) => articles[key].data),
    headerText: 'test',
    headerLinkText: 'test',
    minimumArticleCount: 10,
    maximumArticleCount: 10,
    purpose: 'LatestNews',
};

describe('TenArticlesCollection', () => {
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

    it('should render correctly TenArticlesCollection', () => {
        jest.spyOn(redux, 'useSelector')
            .mockReturnValueOnce(images)
            .mockReturnValueOnce(images)
            .mockReturnValueOnce(images)
            .mockReturnValueOnce(images)
            .mockReturnValueOnce(images)
            .mockReturnValueOnce(images)
            .mockReturnValueOnce(images)
            .mockReturnValueOnce(images)
            .mockReturnValueOnce(images)
            .mockReturnValueOnce(images);

        render(<TenArticlesCollection {...props} />)

        expect(screen.queryByTestId('Container__TenArticlesCollection')).toBeInTheDocument();
    });
})
