import React from 'react';
import { screen, render } from '@testing-library/react';
import { ArticleQuote } from './ArticleQuote';

const props = {
    attribution: 'attribution',
    role: 'role',
}

const children = (
    <div data-testid = "children-test">this is test children</div>
)

describe('ArticleQuote', () => {
    test('renders correctly ', () => {
        render(<ArticleQuote {...props}>{children}</ArticleQuote>);

        expect(screen.queryByTestId('children-test')).toBeInTheDocument();
        expect(screen.queryByText('attribution')).toBeInTheDocument();
        expect(screen.queryByText('role')).toBeInTheDocument();
    });
})
