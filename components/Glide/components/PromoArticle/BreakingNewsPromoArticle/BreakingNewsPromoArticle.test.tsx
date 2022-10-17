import React from 'react';
import { screen, render } from '@testing-library/react'
import { BreakingNewsPromoArticle } from './BreakingNewsPromoArticle';

describe('BreakingNewsPromoArticle', () => {
    const articleData = {
        id: 419,
        type: 'promoArticle',
        position: 0,
        shortStandfirst: 'shortStandfirst text',
        shortHeadline: 'shortHeadline text',
        path: 'path',
        promoImageUrl: 'promoImageUrl',
        catchline: 'catchline text',
        headline: 'headline',
        promoDetails: {
            promo_sub_title: 'promo_sub_title text',
            image_url: 'image_url',
            promo_title: 'promo_title text',
            image_id: 'image_id',
            standfirst: 'standfirst text',
        },
        primaryTaxonomy: {
            name: 'primaryTaxonomy',
        },
        seo: {
            author: 'Some author',
        },
        authors: [],
        isBreakingNews: true,
    }

    it('should render correctly BreakingNewsPromoArticle', () => {
        // @ts-ignore we don't need full collection's data
        render(<BreakingNewsPromoArticle {...articleData} />)

        expect(screen.getByTestId('Link__BreakingNewsPromoArticle')).toBeInTheDocument();
        expect(screen.getByTestId('Icon__BreakingNews')).toBeInTheDocument();
        expect(screen.getByTestId('Text__BreakingNewsHeaderTitle')).toBeInTheDocument();
        expect(screen.getByTestId('Text__ArticleHeadline')).toBeInTheDocument();
        expect(screen.getByTestId('Container__PrimaryTaxonomy')).toBeInTheDocument();
    })
})
