import React from 'react';
import { screen, render } from '@testing-library/react';
import { ArticleHeadline } from './ArticleHeadline';

const propsWithTitle = {
    promoDetails: {
        promo_title: 'article title',
        image_id: 'id',
        image_url: 'string',
        promo_sub_title: 'string',
        standfirst: 'string',
    },
    headline: 'article headline',
}

const propsNoTitle = {
    promoDetails: {
        promo_title: '',
        image_id: '',
        image_url: '',
        promo_sub_title: '',
        standfirst: '',
    },
    headline: 'article headline',
}

describe('ArticleHeadline', () => {
    test('should show promo_title when both headline and promo_title have values', () => {
        render(<ArticleHeadline {...propsWithTitle} />);

        expect(screen.queryByText('article title')).toBeInTheDocument();
    });

    test('should show promo_title, headline has no value', () => {
        render(<ArticleHeadline
            {...propsWithTitle}
            headline = ""
        />);

        expect(screen.queryByText('article title')).toBeInTheDocument();
    });

    test('should show headline, promo_title has no value', () => {
        render(<ArticleHeadline {...propsNoTitle} />);

        expect(screen.queryByText('article headline')).toBeInTheDocument();
    });
})
