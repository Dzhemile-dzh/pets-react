import React from 'react';
import { screen, render } from '@testing-library/react'
import * as redux from 'react-redux';

import { SecondaryNewsCollection } from './SecondaryNewsCollection';
import {
    promoArticles,
    secondaryNewsCollection,
    secondaryNewsCollectionId,
    imageId1Data,
} from '../../../../../../tests/mocks';

describe('SecondaryNewsCollection', () => {
    test('should render correct the collection', () => {
        jest.spyOn(redux, 'useSelector')
            // useSelector in TopStoriesCollection
            .mockReturnValueOnce(promoArticles)
            // useSelector in SecondaryMediumPromoArticle
            .mockReturnValueOnce(imageId1Data)
            // useSelector in SecondaryMediumPromoArticle
            .mockReturnValueOnce(imageId1Data)
            // useSelector in SecondaryMediumPromoArticle
            .mockReturnValueOnce(imageId1Data)
            // useSelector in SecondaryMediumPromoArticle
            .mockReturnValueOnce(imageId1Data)
            // useSelector in FeatureModuleSmallPromoArticle
            .mockReturnValueOnce(imageId1Data)
            // useSelector in FeatureModuleSmallPromoArticle
            .mockReturnValueOnce(imageId1Data)
            // useSelector in FeatureModuleSmallPromoArticle
            .mockReturnValueOnce(imageId1Data)

        // @ts-ignore we don't need full collection's data
        render(<SecondaryNewsCollection collection = {secondaryNewsCollection} />)

        expect(
            screen.getByTestId(`Container__${secondaryNewsCollectionId}__SecondaryNewsCollection`),
        ).toBeInTheDocument();
    })
})
