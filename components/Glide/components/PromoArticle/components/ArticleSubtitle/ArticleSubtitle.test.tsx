import React from 'react';
import { screen, render } from '@testing-library/react';
import { ArticleSubtitle } from './ArticleSubtitle';

describe('ArticleSubtitle', () => {
    it('should show promoSubtitle', () => {
        render(<ArticleSubtitle promoSubtitle = "promo subtitle" />);

        expect(screen.queryByText('promo subtitle')).toBeInTheDocument();
    });
})
